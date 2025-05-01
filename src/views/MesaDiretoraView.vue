<template>
  <div class="p-6 bg-white min-h-full">
    <h1 class="text-2xl font-semibold mb-6">Mesa Diretora</h1>

    <!-- Exibição da Composição Atual -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">Composição Atual (Legislatura X)</h2> <!-- TODO: Obter legislatura dinamicamente -->
      <div v-if="loading">Carregando composição...</div>
      <div v-else-if="!mesaDiretora || mesaDiretora.length === 0">Nenhuma composição definida para a legislatura atual.</div>
      <ul v-else class="space-y-3">
        <li v-for="membro in mesaDiretora" :key="membro.id" class="p-3 border-b last:border-b-0">
          <span class="font-medium">{{ membro.Cargo?.nome || 'Cargo não definido' }}:</span> 
          <span class="ml-2">{{ membro.Vereador?.nome_urna || 'Vereador não definido' }}</span>
          <!-- Adicionar mais detalhes se necessário -->
        </li>
      </ul>
    </div>

    <!-- Formulário para Definir/Editar Composição (Exemplo) -->
    <!-- Este formulário é um exemplo e pode precisar de ajustes significativos -->
    <!-- dependendo de como o backend gerencia a Mesa Diretora (por legislatura, etc.) -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
        <h2 class="text-xl font-semibold mb-4">Gerenciar Composição</h2>
        <p class="text-sm text-gray-600 mb-4">Selecione os vereadores para cada cargo da Mesa Diretora.</p>
        
        <Form @submit="handleCompositionSubmit" :validation-schema="compositionSchema" v-slot="{ errors, isSubmitting }">
            <div v-for="cargo in cargosMesa" :key="cargo.id" class="mb-4">
                <label :for="`cargo_${cargo.id}`" class="block text-sm font-medium text-gray-700 mb-1">{{ cargo.nome }}</label>
                <Field
                    :name="`cargo_${cargo.id}`"
                    as="select"
                    :id="`cargo_${cargo.id}`"
                    v-model="compositionForm[cargo.id]" 
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
                    :class="{ 'border-red-500 focus:ring-red-400': errors[`cargo_${cargo.id}`], 'focus:ring-blue-400': !errors[`cargo_${cargo.id}`] }"
                >
                    <option value="" disabled>Selecione um vereador</option>
                    <option v-for="vereador in vereadores" :key="vereador.id" :value="vereador.id">{{ vereador.nome_urna }}</option>
                </Field>
                <ErrorMessage :name="`cargo_${cargo.id}`" class="text-red-500 text-sm mt-1" />
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    :disabled="isSubmitting"
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
import { ref, onMounted, computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import mesaDiretoraService from '@/services/mesaDiretoraService';
import vereadoresService from '@/services/vereadoresService';
import cargosService from '@/services/cargosService'; // Serviço para buscar cargos

const toast = useToast();
const mesaDiretora = ref([]); // Composição atual
const vereadores = ref([]); // Lista de todos vereadores
const cargosMesa = ref([]); // Lista de cargos específicos da Mesa Diretora
const loading = ref(false);
const compositionForm = ref({}); // Objeto para bind dos selects do formulário { cargoId: vereadorId }

// Esquema de validação para o formulário de composição
// Cria dinamicamente baseado nos cargos da mesa
const compositionSchema = computed(() => {
  const schemaFields = {};
  cargosMesa.value.forEach(cargo => {
    // Tornar obrigatório ou não dependendo da regra de negócio
    schemaFields[`cargo_${cargo.id}`] = yup.number().required(`Selecione o vereador para ${cargo.nome}`);
  });
  return yup.object(schemaFields);
});

// Buscar dados iniciais (composição atual, vereadores, cargos da mesa)
const fetchData = async () => {
  loading.value = true;
  try {
    // Ajustar endpoints conforme necessário
    const [mesaRes, vereadoresRes, cargosRes] = await Promise.all([
      mesaDiretoraService.get(), // Busca composição atual
      vereadoresService.getAll(),
      cargosService.getAll({ tipo: 'Mesa Diretora' }) // Busca apenas cargos da Mesa Diretora
    ]);
    
    mesaDiretora.value = mesaRes.data || [];
    vereadores.value = vereadoresRes.data || [];
    cargosMesa.value = cargosRes.data || []; // Assumindo que o serviço filtra

    // Preencher o formulário com a composição atual, se existir
    compositionForm.value = {}; // Limpa antes de preencher
    if (mesaDiretora.value.length > 0) {
        mesaDiretora.value.forEach(membro => {
            if (membro.cargo_id && membro.vereador_id) {
                compositionForm.value[membro.cargo_id] = membro.vereador_id;
            }
        });
    }

  } catch (error) {
    console.error('Erro ao buscar dados da Mesa Diretora:', error);
    toast.error('Falha ao carregar dados da Mesa Diretora.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Submissão do formulário de composição
const handleCompositionSubmit = async (values) => {
  // values terá o formato { cargo_1: vereadorId, cargo_2: vereadorId, ... }
  // Transformar para o formato esperado pelo backend
  // Exemplo: [{ cargo_id: 1, vereador_id: 5 }, { cargo_id: 2, vereador_id: 8 }]
  const dataToSend = Object.entries(values).map(([key, vereadorId]) => ({
    cargo_id: parseInt(key.split('_')[1]),
    vereador_id: vereadorId,
    // Adicionar legislatura_id se necessário
  }));

  // Validar se não há vereadores repetidos para cargos diferentes (se for regra)
  const vereadorIds = dataToSend.map(item => item.vereador_id);
  if (new Set(vereadorIds).size !== vereadorIds.length) {
      toast.error('Um vereador não pode ocupar mais de um cargo na Mesa Diretora.');
      return;
  }

  try {
    // Chamar o serviço para salvar/atualizar a composição
    // O endpoint pode ser um POST ou PUT dependendo da lógica (criar nova composição ou atualizar existente)
    // Exemplo: await mesaDiretoraService.saveComposition(dataToSend);
    console.log("Dados a enviar para salvar composição:", dataToSend);
    toast.info('Funcionalidade de salvar composição ainda não implementada no backend.');
    // Após salvar com sucesso:
    // await fetchData(); // Recarregar dados
    // toast.success('Composição da Mesa Diretora salva com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar composição:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar a composição.');
  }
};

</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui */
</style>

