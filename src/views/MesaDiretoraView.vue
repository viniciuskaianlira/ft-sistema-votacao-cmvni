<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-semibold mb-6">Mesa Diretora</h1>

    <!-- Seleção de Legislatura -->
    <div class="mb-4">
      <label for="legislaturaSelect" class="block text-sm font-medium text-gray-700 mb-1">
        Selecionar Legislatura:
      </label>
      <select
        id="legislaturaSelect"
        v-model="selectedLegislaturaId"
        @change="fetchDataForLegislatura"
        class="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
      >
        <option v-if="loadingLegislaturas" value="" disabled>Carregando...</option>
        <option v-else v-for="leg in legislaturas" :key="leg.id" :value="leg.id">
          {{ leg.numero }}ª Legislatura ({{ formatDate(leg.data_inicio) }} - {{ formatDate(leg.data_fim) }})
        </option>
      </select>
    </div>

    <!-- Exibição da Composição Atual -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-4">
        Composição da {{ selectedLegislatura?.numero }}ª Legislatura
      </h2>
      <div v-if="loading">Carregando composição...</div>
      <div v-else-if="!mesaDiretora || mesaDiretora.length === 0">
        Nenhuma composição definida para a legislatura selecionada.
      </div>
      <ul v-else class="space-y-3">
        <li v-for="membro in mesaDiretora" :key="membro.id" class="p-3 border-b last:border-b-0">
          <span class="font-medium">{{ membro.Cargo?.nome || 'Cargo não definido' }}:</span>
          <span class="ml-2">{{ membro.Vereador?.nome_urna || 'Vereador não definido' }}</span>
        </li>
      </ul>
    </div>

    <!-- Formulário para Definir/Editar Composição -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-4">
        Gerenciar Composição da {{ selectedLegislatura?.numero }}ª Legislatura
      </h2>
      <p class="text-sm text-gray-600 mb-4">
        Selecione os vereadores para cada cargo da Mesa Diretora.
      </p>

      <Form
        @submit="handleCompositionSubmit"
        :validation-schema="compositionSchema"
        v-slot="{ errors, isSubmitting }"
      >
        <div v-for="cargo in cargosMesa" :key="cargo.id" class="mb-4">
          <label :for="`cargo_${cargo.id}`" class="block text-sm font-medium text-gray-700 mb-1">
            {{ cargo.nome }}
          </label>
          <Field
            as="select"
            :name="`cargo_${cargo.id}`"
            :id="`cargo_${cargo.id}`"
            v-model="compositionForm[cargo.id]"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
            :class="{
              'border-red-500 focus:ring-red-400': errors[`cargo_${cargo.id}`],
              'focus:ring-blue-400': !errors[`cargo_${cargo.id}`]
            }"
          >
            <option value="" disabled>Selecione um vereador</option>
            <option v-for="v in vereadores" :key="v.id" :value="v.id">
              {{ v.nome_urna }}
            </option>
          </Field>
          <ErrorMessage :name="`cargo_${cargo.id}`" class="text-red-500 text-sm mt-1" />
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="isSubmitting || !selectedLegislaturaId"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Salvando...</span>
            <span v-else>Salvar Composição</span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import mesaDiretoraService from '@/services/mesaDiretoraService';
import vereadoresService from '@/services/vereadoresService';
import cargosService from '@/services/cargosService';
import legislaturasService from '@/services/legislaturasService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const toast = useToast();
const mesaDiretora = ref([]);
const vereadores = ref([]);
const cargosMesa = ref([]);
const legislaturas = ref([]);
const selectedLegislaturaId = ref(null);
const loading = ref(false);
const loadingLegislaturas = ref(false);
const compositionForm = ref({});

const selectedLegislatura = computed(() =>
  legislaturas.value.find(leg => leg.id === selectedLegislaturaId.value)
);

const compositionSchema = computed(() => {
  const schemaFields = {};
  cargosMesa.value.forEach(cargo => {
    schemaFields[`cargo_${cargo.id}`] = yup
      .number()
      .required(`Selecione o vereador para ${cargo.nome}`);
  });
  return yup.object(schemaFields);
});

const formatDate = dateStr => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return 'Data inválida';
  }
};

const fetchDataForLegislatura = async () => {
  if (!selectedLegislaturaId.value) return;
  loading.value = true;
  try {
    const mesaRes = await mesaDiretoraService.getByLegislatura(
      selectedLegislaturaId.value
    );
    mesaDiretora.value = mesaRes.data || [];
    compositionForm.value = {};
    mesaDiretora.value.forEach(membro => {
      if (membro.cargo_id && membro.vereador_id) {
        compositionForm.value[membro.cargo_id] = membro.vereador_id;
      }
    });
  } catch (error) {
    console.error(
      `Erro ao buscar dados para legislatura ${selectedLegislaturaId.value}:`,
      error
    );
    toast.error('Falha ao carregar composição da mesa.');
    mesaDiretora.value = [];
    compositionForm.value = {};
  } finally {
    loading.value = false;
  }
};

const fetchInitialData = async () => {
  loadingLegislaturas.value = true;
  try {
    const [vereadoresRes, cargosRes, legislaturasRes] = await Promise.all([
      vereadoresService.getAll(),
      cargosService.getAll({ tipo: 'Mesa Diretora' }),
      legislaturasService.getAll()
    ]);

    vereadores.value = vereadoresRes.data || [];
    cargosMesa.value = (cargosRes.data || []).filter(
      c => c.tipo === 'Mesa Diretora'
    );
    legislaturas.value = (legislaturasRes.data || []).sort(
      (a, b) => b.numero - a.numero
    );

    if (legislaturas.value.length) {
      selectedLegislaturaId.value = legislaturas.value[0].id;
      await fetchDataForLegislatura();
    }
  } catch (error) {
    console.error('Erro ao buscar dados iniciais:', error);
    toast.error('Falha ao carregar dados iniciais.');
  } finally {
    loadingLegislaturas.value = false;
  }
};

onMounted(fetchInitialData);

const handleCompositionSubmit = async values => {
  if (!selectedLegislaturaId.value) {
    toast.error('Selecione uma legislatura primeiro.');
    return;
  }
  const dataToSend = Object.entries(values).map(([key, vereadorId]) => ({
    cargo_id: parseInt(key.split('_')[1]),
    vereador_id: vereadorId,
    legislatura_id: selectedLegislaturaId.value
  }));

  const ids = dataToSend.map(item => item.vereador_id);
  if (new Set(ids).size !== ids.length) {
    toast.error(
      'Um vereador não pode ocupar mais de um cargo na Mesa Diretora.'
    );
    return;
  }

  try {
    await mesaDiretoraService.saveComposition(
      selectedLegislaturaId.value,
      dataToSend
    );
    toast.success(
      `Composição da Mesa Diretora para a ${selectedLegislatura.value?.numero}ª legislatura salva com sucesso!`
    );
    await fetchDataForLegislatura();
  } catch (error) {
    console.error('Erro ao salvar composição:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar a composição.');
  }
};
</script>

<style scoped>
/* Estilos adicionais */
</style>