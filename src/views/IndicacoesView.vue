<template>
  <div class="p-6 bg-white min-h-full">
    <h1 class="text-2xl font-semibold mb-6">Gerenciar Indicações</h1>

    <!-- Formulário para Adicionar/Editar Indicação -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Indicação' : 'Adicionar Nova Indicação' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="mb-4">
          <label for="assunto" class="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
          <Field
            name="assunto"
            type="text"
            id="assunto"
            v-model="currentIndicacao.assunto"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.assunto, 'focus:ring-blue-400': !errors.assunto }"
          />
          <ErrorMessage name="assunto" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="mb-4">
          <label for="destinatario" class="block text-sm font-medium text-gray-700 mb-1">Destinatário</label>
          <Field
            name="destinatario"
            type="text"
            id="destinatario"
            v-model="currentIndicacao.destinatario"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.destinatario, 'focus:ring-blue-400': !errors.destinatario }"
          />
          <ErrorMessage name="destinatario" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="mb-4">
          <label for="texto" class="block text-sm font-medium text-gray-700 mb-1">Texto da Indicação</label>
          <Field
            name="texto"
            as="textarea"
            id="texto"
            rows="4"
            v-model="currentIndicacao.texto_indicacao"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.texto, 'focus:ring-blue-400': !errors.texto }"
          />
          <ErrorMessage name="texto" class="text-red-500 text-sm mt-1" />
        </div>
        
        <!-- Adicionar campos para proponentes (vereadores), data, etc. conforme necessário -->
        <!-- Exemplo: Proponente (Vereador) -->
        <div class="mb-4">
            <label for="proponente" class="block text-sm font-medium text-gray-700 mb-1">Proponente (Vereador)</label>
            <Field
              name="proponente"
              as="select"
              id="proponente"
              v-model="currentIndicacao.vereador_id" 
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.proponente, 'focus:ring-blue-400': !errors.proponente }"
            >
              <option value="" disabled>Selecione um vereador</option>
              <option v-for="vereador in vereadores" :key="vereador.id" :value="vereador.id">{{ vereador.nome }}</option> 
            </Field>
            <ErrorMessage name="proponente" class="text-red-500 text-sm mt-1" />
          </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="resetForm"
            v-if="isEditing"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancelar Edição
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Salvando...</span>
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Adicionar Indicação' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Indicações -->
    <h2 class="text-xl font-semibold mb-4">Indicações Cadastradas</h2>
    <div v-if="loading">Carregando indicações...</div>
    <div v-else-if="indicacoes.length === 0">Nenhuma indicação cadastrada.</div>
    <ul v-else class="space-y-3">
      <li v-for="indicacao in indicacoes" :key="indicacao.id" class="p-4 border rounded-lg flex justify-between items-start">
        <div>
          <p class="font-medium">Assunto: {{ indicacao.assunto }}</p>
          <p class="text-sm text-gray-600">Destinatário: {{ indicacao.destinatario }}</p>
          <p class="text-sm text-gray-600">Proponente: {{ getVereadorNome(indicacao.vereador_id) }}</p>
          <p class="text-sm text-gray-500 mt-1">Data: {{ formatDate(indicacao.data_indicacao) }}</p> 
        </div>
        <div class="space-x-2 flex-shrink-0 ml-4">
          <button @click="editIndicacao(indicacao)" class="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
          <button @click="deleteIndicacao(indicacao.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
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
import indicacoesService from '@/services/indicacoesService';
import vereadoresService from '@/services/vereadoresService'; // Para buscar lista de vereadores
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const toast = useToast();
const indicacoes = ref([]);
const vereadores = ref([]); // Lista de vereadores para o select
const loading = ref(false);
const isEditing = ref(false);
const currentIndicacao = ref({
  id: null,
  assunto: '',
  destinatario: '',
  texto_indicacao: '',
  vereador_id: '', // ID do vereador proponente
  data_indicacao: null, // O backend deve cuidar disso ou adicionar campo
});

// Esquema de validação
const schema = yup.object({
  assunto: yup.string().required('O assunto é obrigatório').max(255),
  destinatario: yup.string().required('O destinatário é obrigatório').max(255),
  texto: yup.string().required('O texto da indicação é obrigatório'),
  proponente: yup.number().required('Selecione o vereador proponente'),
});

// Buscar dados iniciais (indicações e vereadores)
const fetchData = async () => {
  loading.value = true;
  try {
    const [indicacoesRes, vereadoresRes] = await Promise.all([
      indicacoesService.getAll(),
      vereadoresService.getAll(), // Assumindo que o serviço busca todos os vereadores
    ]);
    indicacoes.value = indicacoesRes.data || [];
    vereadores.value = vereadoresRes.data || [];
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    toast.error('Falha ao carregar dados das indicações ou vereadores.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Formatar data
const formatDate = (dateStr) => {
  if (!dateStr) return 'Data não definida';
  try {
    const date = new Date(dateStr);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  } catch (e) {
    return 'Data inválida';
  }
};

// Obter nome do vereador pelo ID
const getVereadorNome = (vereadorId) => {
  const vereador = vereadores.value.find(v => v.id === vereadorId);
  return vereador ? vereador.nome : 'Desconhecido';
};

// Resetar formulário
const resetForm = () => {
  isEditing.value = false;
  currentIndicacao.value = {
    id: null,
    assunto: '',
    destinatario: '',
    texto_indicacao: '',
    vereador_id: '',
    data_indicacao: null,
  };
};

// Submissão do formulário (Criar ou Atualizar)
const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  const dataToSend = {
    assunto: values.assunto,
    destinatario: values.destinatario,
    texto_indicacao: values.texto,
    vereador_id: values.proponente,
    // data_indicacao: O backend deve definir a data atual ao criar
  };

  try {
    if (isEditing.value) {
      await indicacoesService.update(currentIndicacao.value.id, dataToSend);
      toast.success('Indicação atualizada com sucesso!');
    } else {
      await indicacoesService.create(dataToSend);
      toast.success('Indicação adicionada com sucesso!');
    }
    await fetchData();
    resetForm();
    veeResetForm();
  } catch (error) {
    console.error('Erro ao salvar indicação:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar a indicação.');
  }
};

// Editar indicação
const editIndicacao = (indicacao) => {
  isEditing.value = true;
  currentIndicacao.value = { ...indicacao };
  // Ajustar nomes dos campos se necessário para o formulário
  currentIndicacao.value.texto_indicacao = indicacao.texto_indicacao; 
  currentIndicacao.value.vereador_id = indicacao.vereador_id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Excluir indicação
const deleteIndicacao = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta indicação?')) {
    return;
  }
  try {
    await indicacoesService.delete(id);
    toast.success('Indicação excluída com sucesso!');
    await fetchData();
  } catch (error) {
    console.error('Erro ao excluir indicação:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir a indicação.');
  }
};

</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui */
</style>

