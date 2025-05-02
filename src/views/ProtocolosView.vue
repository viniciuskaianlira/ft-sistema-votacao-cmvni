<template>
  <div class="p-6 bg-white min-h-full">
    <h1 class="text-2xl font-semibold mb-6">Gerenciar Protocolos</h1>

    <!-- Formulário para Adicionar/Editar Protocolo -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Protocolo' : 'Registrar Novo Protocolo' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm: veeResetForm }">
        <!-- Campos do formulário (número, ano, data, origem, tipo, assunto) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label for="numero" class="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <Field name="numero" type="number" id="numero" v-model="currentProtocolo.numero" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white" :class="{ 'border-red-500 focus:ring-red-400': errors.numero, 'focus:ring-blue-400': !errors.numero }"/>
            <ErrorMessage name="numero" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="ano" class="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <Field name="ano" type="number" id="ano" v-model="currentProtocolo.ano" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white" :class="{ 'border-red-500 focus:ring-red-400': errors.ano, 'focus:ring-blue-400': !errors.ano }"/>
            <ErrorMessage name="ano" class="text-red-500 text-sm mt-1" />
          </div>
           <div>
            <label for="dataRecebimento" class="block text-sm font-medium text-gray-700 mb-1">Data Recebimento</label>
            <Field name="dataRecebimento" type="date" id="dataRecebimento" v-model="currentProtocolo.data_recebimento" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white" :class="{ 'border-red-500 focus:ring-red-400': errors.dataRecebimento, 'focus:ring-blue-400': !errors.dataRecebimento }"/>
            <ErrorMessage name="dataRecebimento" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="origem" class="block text-sm font-medium text-gray-700 mb-1">Origem</label>
            <Field name="origem" type="text" id="origem" v-model="currentProtocolo.origem" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2" :class="{ 'border-red-500 focus:ring-red-400': errors.origem, 'focus:ring-blue-400': !errors.origem }"/>
            <ErrorMessage name="origem" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="tipoDocumento" class="block text-sm font-medium text-gray-700 mb-1">Tipo Documento</label>
            <Field name="tipoDocumento" type="text" id="tipoDocumento" v-model="currentProtocolo.tipo_documento" placeholder="Ex: Ofício, Requerimento, Projeto de Lei" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2" :class="{ 'border-red-500 focus:ring-red-400': errors.tipoDocumento, 'focus:ring-blue-400': !errors.tipoDocumento }"/>
            <ErrorMessage name="tipoDocumento" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="mb-4">
          <label for="assunto" class="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
          <Field name="assunto" as="textarea" id="assunto" rows="3" v-model="currentProtocolo.assunto" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2" :class="{ 'border-red-500 focus:ring-red-400': errors.assunto, 'focus:ring-blue-400': !errors.assunto }"/>
          <ErrorMessage name="assunto" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Botões do formulário -->
        <div class="flex justify-end space-x-3">
          <button type="button" @click="resetForm(veeResetForm)" v-if="isEditing" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200">Cancelar Edição</button>
          <button type="submit" :disabled="isSubmitting" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isSubmitting">Salvando...</span>
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Registrar Protocolo' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Protocolos -->
    <h2 class="text-xl font-semibold mb-4">Protocolos Registrados</h2>
    <div v-if="loading">Carregando protocolos...</div>
    <div v-else-if="protocolos.length === 0">Nenhum protocolo registrado.</div>
    <ul v-else class="space-y-3">
      <li v-for="protocolo in protocolos" :key="protocolo.id" class="p-4 border rounded-lg flex justify-between items-start">
        <div>
          <p class="font-medium">{{ protocolo.numero }}/{{ protocolo.ano }} - {{ protocolo.tipo_documento }}</p>
          <p class="text-sm text-gray-600">Origem: {{ protocolo.origem }}</p>
          <p class="text-sm text-gray-600">Assunto: {{ protocolo.assunto }}</p>
          <p class="text-sm text-gray-500 mt-1">Recebido em: {{ formatDate(protocolo.data_recebimento) }}</p>
        </div>
        <div class="space-x-2 flex-shrink-0 ml-4">
          <button @click="openHistoryModal(protocolo)" class="text-purple-500 hover:text-purple-700 text-sm">Histórico</button>
          <button @click="editProtocolo(protocolo)" class="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
          <button @click="deleteProtocolo(protocolo.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
        </div>
      </li>
    </ul>

    <!-- Modal para Histórico do Protocolo -->
    <div v-if="showHistoryModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative p-8 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <h3 class="text-2xl font-semibold mb-4">Histórico do Protocolo {{ selectedProtocolo?.numero }}/{{ selectedProtocolo?.ano }}</h3>
        <button @click="closeHistoryModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        
        <div v-if="loadingHistory">Carregando histórico...</div>
        <div v-else>
          <ul v-if="protocolHistory.length > 0" class="space-y-3 max-h-60 overflow-y-auto mb-6 pr-2 border-b pb-4">
            <li v-for="entry in protocolHistory" :key="entry.id" class="text-sm">
              <p><span class="font-medium">{{ formatDate(entry.data_hora, true) }}:</span> {{ entry.descricao }}</p>
              <p class="text-xs text-gray-500">Por: {{ entry.User?.nome || 'Sistema' }}</p> <!-- Ajustar nome do campo de usuário -->
            </li>
          </ul>
          <p v-else class="text-sm text-gray-500 mb-6">Nenhum histórico registrado para este protocolo.</p>

          <!-- Formulário para Adicionar Entrada no Histórico (Opcional) -->
          <Form @submit="handleAddHistoryEntry" :validation-schema="historySchema" v-slot="{ errors, isSubmitting: isAddingHistory, resetForm: resetHistoryForm }">
            <h4 class="text-lg font-semibold mb-2">Adicionar Registro ao Histórico</h4>
            <div class="mb-3">
              <label for="historyDescription" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <Field
                name="descricao"
                as="textarea"
                id="historyDescription"
                rows="2"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                :class="{ 'border-red-500 focus:ring-red-400': errors.descricao, 'focus:ring-blue-400': !errors.descricao }"
              />
              <ErrorMessage name="descricao" class="text-red-500 text-sm mt-1" />
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="isAddingHistory"
                class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isAddingHistory">Adicionando...</span>
                <span v-else>Adicionar Registro</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import protocolosService from '@/services/protocolosService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const toast = useToast();
const protocolos = ref([]);
const loading = ref(false);
const isEditing = ref(false);
const currentProtocolo = ref({
  id: null,
  numero: null,
  ano: new Date().getFullYear(),
  data_recebimento: '',
  origem: '',
  assunto: '',
  tipo_documento: '',
});

// Histórico
const showHistoryModal = ref(false);
const selectedProtocolo = ref(null);
const protocolHistory = ref([]);
const loadingHistory = ref(false);

// Esquema de validação - Protocolo
const currentYear = new Date().getFullYear();
const schema = yup.object({
  numero: yup.number().required('O número é obrigatório').integer('Deve ser um número inteiro').positive('Deve ser um número positivo'),
  ano: yup.number().required('O ano é obrigatório').integer().min(1900).max(currentYear + 1, `Ano não pode ser maior que ${currentYear + 1}`),
  dataRecebimento: yup.date().required('A data de recebimento é obrigatória').typeError('Data inválida'),
  origem: yup.string().required('A origem é obrigatória').max(255),
  tipoDocumento: yup.string().required('O tipo do documento é obrigatório').max(100),
  assunto: yup.string().required('O assunto é obrigatório'),
});

// Esquema de validação - Histórico
const historySchema = yup.object({
  descricao: yup.string().required('A descrição é obrigatória').max(500),
});

// --- Funções CRUD Protocolo ---

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await protocolosService.getAll();
    protocolos.value = response.data || [];
  } catch (error) {
    console.error('Erro ao buscar protocolos:', error);
    toast.error('Falha ao carregar protocolos.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const formatDate = (dateStr, includeTime = false) => {
  if (!dateStr) return 'Data não definida';
  try {
    const formatString = includeTime ? "dd/MM/yyyy HH:mm:ss" : "dd/MM/yyyy";
    // Se a string já incluir tempo, use-a diretamente, senão adicione T00:00:00
    const dateToParse = dateStr.includes('T') ? dateStr : dateStr + 'T00:00:00';
    const date = new Date(dateToParse);
    return format(date, formatString, { locale: ptBR });
  } catch (e) {
    console.error('Erro ao formatar data:', e, dateStr);
    return 'Data inválida';
  }
};

const resetForm = (veeResetForm) => {
  isEditing.value = false;
  currentProtocolo.value = {
    id: null,
    numero: null,
    ano: new Date().getFullYear(),
    data_recebimento: '',
    origem: '',
    assunto: '',
    tipo_documento: '',
  };
  if (veeResetForm) {
      veeResetForm(); // Reseta o estado do formulário vee-validate
  }
};

const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  const dataToSend = {
    numero: values.numero,
    ano: values.ano,
    data_recebimento: values.dataRecebimento,
    origem: values.origem,
    assunto: values.assunto,
    tipo_documento: values.tipoDocumento,
  };

  try {
    if (isEditing.value) {
      await protocolosService.update(currentProtocolo.value.id, dataToSend);
      toast.success('Protocolo atualizado com sucesso!');
    } else {
      await protocolosService.create(dataToSend);
      toast.success('Protocolo registrado com sucesso!');
    }
    await fetchData();
    resetForm(veeResetForm);
  } catch (error) {
    console.error('Erro ao salvar protocolo:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar o protocolo.');
  }
};

const editProtocolo = (protocolo) => {
  isEditing.value = true;
  const dataFormatada = protocolo.data_recebimento ? format(new Date(protocolo.data_recebimento + 'T00:00:00'), 'yyyy-MM-dd') : '';
  currentProtocolo.value = { 
      ...protocolo, 
      data_recebimento: dataFormatada
  }; 
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const deleteProtocolo = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este protocolo? Isso pode apagar históricos associados.')) {
    return;
  }
  try {
    await protocolosService.delete(id);
    toast.success('Protocolo excluído com sucesso!');
    await fetchData();
  } catch (error) {
    console.error('Erro ao excluir protocolo:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir o protocolo.');
  }
};

// --- Funções Histórico ---

const openHistoryModal = async (protocolo) => {
  selectedProtocolo.value = protocolo;
  showHistoryModal.value = true;
  loadingHistory.value = true;
  protocolHistory.value = [];
  try {
    const response = await protocolosService.getHistorico(protocolo.id);
    protocolHistory.value = response.data || [];
  } catch (error) {
    console.error(`Erro ao buscar histórico para protocolo ${protocolo.id}:`, error);
    toast.error('Falha ao carregar histórico do protocolo.');
  } finally {
    loadingHistory.value = false;
  }
};

const closeHistoryModal = () => {
  showHistoryModal.value = false;
  selectedProtocolo.value = null;
  protocolHistory.value = [];
};

const handleAddHistoryEntry = async (values, { resetForm: resetHistoryForm }) => {
  if (!selectedProtocolo.value) return;

  const dataToSend = {
    descricao: values.descricao,
    protocolo_id: selectedProtocolo.value.id,
    // user_id será adicionado pelo backend (usuário logado)
  };

  try {
    // Assumindo que existe um serviço/endpoint para adicionar histórico
    // Ex: await protocolosService.addHistoricoEntry(selectedProtocolo.value.id, dataToSend);
    // Como não temos certeza se o backend suporta, vamos simular por enquanto
    console.log("Adicionar entrada no histórico:", dataToSend);
    toast.info('Funcionalidade de adicionar histórico ainda não implementada no backend.');
    
    // Se implementado no backend, recarregar o histórico após adicionar:
    // const response = await protocolosService.addHistoricoEntry(selectedProtocolo.value.id, dataToSend);
    // await openHistoryModal(selectedProtocolo.value); // Recarrega o histórico
    // toast.success('Registro adicionado ao histórico!');
    resetHistoryForm();

  } catch (error) {
    console.error('Erro ao adicionar registro ao histórico:', error);
    toast.error(error.response?.data?.message || 'Falha ao adicionar registro ao histórico.');
  }
};

</script>

<style scoped>
/* Estilos adicionais */
</style>

