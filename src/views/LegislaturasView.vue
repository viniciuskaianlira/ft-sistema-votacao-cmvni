<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">Gerenciar Legislaturas</h1>

    <!-- Formulário para Adicionar/Editar Legislatura -->
    <div class="mb-8 p-6 border rounded-lg shadow-md bg-white">
      <h2 class="text-2xl font-semibold mb-4">{{ isEditing ? 'Editar Legislatura' : 'Adicionar Nova Legislatura' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label for="numero" class="block text-sm font-medium text-gray-600 mb-1">Número da Legislatura</label>
            <Field
              name="numero"
              type="number"
              id="numero"
              v-model="currentLegislatura.numero"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              :class="{ 'border-red-500 focus:ring-red-400': errors.numero, 'focus:ring-blue-400': !errors.numero }"
            />
            <ErrorMessage name="numero" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="data_inicio" class="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
            <Field
              name="data_inicio"
              type="date"
              id="data_inicio"
              v-model="currentLegislatura.data_inicio"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.data_inicio, 'focus:ring-blue-400': !errors.data_inicio }"
            />
            <ErrorMessage name="data_inicio" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="data_fim" class="block text-sm font-medium text-gray-700 mb-1">Data de Fim</label>
            <Field
              name="data_fim"
              type="date"
              id="data_fim"
              v-model="currentLegislatura.data_fim"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.data_fim, 'focus:ring-blue-400': !errors.data_fim }"
            />
            <ErrorMessage name="data_fim" class="text-red-500 text-sm mt-1" />
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="resetForm"
            v-if="isEditing"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
          >
            Cancelar Edição
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Salvando...</span>
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Adicionar Legislatura' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Legislaturas -->
    <h2 class="text-2xl font-semibold mb-4">Legislaturas Cadastradas</h2>
    <div v-if="loading" class="text-center py-4">Carregando legislaturas...</div>
    <div v-else-if="legislaturas.length === 0" class="text-center py-4">Nenhuma legislatura cadastrada.</div>
    <ul v-else class="space-y-4">
      <li v-for="legislatura in legislaturas" :key="legislatura.id" class="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
        <div>
          <p class="font-medium text-gray-800">{{ legislatura.numero }}ª Legislatura</p>
          <p class="text-sm text-gray-600">Período: {{ formatDate(legislatura.data_inicio) }} - {{ formatDate(legislatura.data_fim) }}</p>
        </div>
        <div class="space-x-3 flex-shrink-0 ml-4">
          <button @click="editLegislatura(legislatura)" class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">Editar</button>
          <button @click="deleteLegislatura(legislatura.id)" class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-400">Excluir</button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import legislaturasService from '@/services/legislaturasService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const toast = useToast();
const legislaturas = ref([]);
const loading = ref(false);
const isEditing = ref(false);
const currentLegislatura = ref({
  id: null,
  numero: null,
  data_inicio: '',
  data_fim: '',
});

// Esquema de validação
const schema = yup.object({
  numero: yup.number().required('O número é obrigatório').integer('Deve ser um número inteiro').positive('Deve ser um número positivo'),
  data_inicio: yup.date().required('A data de início é obrigatória').typeError('Data inválida'),
  data_fim: yup.date().required('A data de fim é obrigatória').typeError('Data inválida')
    .min(yup.ref('data_inicio'), 'A data de fim deve ser posterior à data de início'),
});

// Buscar dados iniciais
const fetchData = async () => {
  loading.value = true;
  try {
    const response = await legislaturasService.getAll();
    legislaturas.value = response.data || [];
  } catch (error) {
    console.error('Erro ao buscar legislaturas:', error);
    toast.error('Falha ao carregar legislaturas.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Formatar data
const formatDate = (dateStr) => {
  if (!dateStr) return 'Data não definida';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  } catch (e) {
    console.error('Erro ao formatar data:', e, dateStr);
    return 'Data inválida';
  }
};

// Resetar formulário
const resetForm = () => {
  isEditing.value = false;
  currentLegislatura.value = {
    id: null,
    numero: null,
    data_inicio: '',
    data_fim: '',
  };
};

// Submissão do formulário (Criar ou Atualizar)
const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  const dataToSend = {
    numero: values.numero,
    data_inicio: values.data_inicio, // yup já validou como Date
    data_fim: values.data_fim,
  };

  try {
    if (isEditing.value) {
      await legislaturasService.update(currentLegislatura.value.id, dataToSend);
      toast.success('Legislatura atualizada com sucesso!');
    } else {
      await legislaturasService.create(dataToSend);
      toast.success('Legislatura adicionada com sucesso!');
    }
    await fetchData();
    resetForm();
    veeResetForm();
  } catch (error) {
    console.error('Erro ao salvar legislatura:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar a legislatura.');
  }
};

// Editar legislatura
const editLegislatura = (legislatura) => {
  isEditing.value = true;
  const dataInicioFormatada = legislatura.data_inicio ? format(new Date(legislatura.data_inicio + 'T00:00:00'), 'yyyy-MM-dd') : '';
  const dataFimFormatada = legislatura.data_fim ? format(new Date(legislatura.data_fim + 'T00:00:00'), 'yyyy-MM-dd') : '';
  currentLegislatura.value = { 
      ...legislatura, 
      data_inicio: dataInicioFormatada,
      data_fim: dataFimFormatada
  }; 
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Excluir legislatura
const deleteLegislatura = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta legislatura?')) {
    return;
  }
  try {
    await legislaturasService.delete(id);
    toast.success('Legislatura excluída com sucesso!');
    await fetchData();
  } catch (error) {
    console.error('Erro ao excluir legislatura:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir a legislatura.');
  }
};

</script>
