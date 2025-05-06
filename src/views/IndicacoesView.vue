<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Gerenciar Indicações</h1>

    <!-- Formulário para Adicionar/Editar Indicação -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Editar Indicação' : 'Registrar Nova Indicação' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm: veeResetForm }">
        <!-- Campos Principais -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label for="numero" class="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <Field name="numero" type="number" id="numero" v-model="currentIndicacao.numero" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white" :class="{ 'border-red-500 focus:ring-red-400': errors.numero, 'focus:ring-blue-400': !errors.numero }"/>
            <ErrorMessage name="numero" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="ano" class="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <Field name="ano" type="number" id="ano" v-model="currentIndicacao.ano" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white" :class="{ 'border-red-500 focus:ring-red-400': errors.ano, 'focus:ring-blue-400': !errors.ano }"/>
            <ErrorMessage name="ano" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="data" class="block text-sm font-medium text-gray-700 mb-1">Data</label> 
            <Field name="data" type="date" id="data" v-model="currentIndicacao.data" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white" :class="{ 'border-red-500 focus:ring-red-400': errors.data, 'focus:ring-blue-400': !errors.data }"/>
            <ErrorMessage name="data" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="mb-4">
          <label for="ementa" class="block text-sm font-medium text-gray-700 mb-1">Ementa/Assunto</label>
          <Field name="ementa" as="textarea" id="ementa" rows="3" v-model="currentIndicacao.ementa" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2" :class="{ 'border-red-500 focus:ring-red-400': errors.ementa, 'focus:ring-blue-400': !errors.ementa }"/>
          <ErrorMessage name="ementa" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Seleção de Proponentes -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Proponente(s)</label>
          <div v-if="loadingVereadores" class="text-gray-600">Carregando vereadores...</div>
          <div v-else class="max-h-40 overflow-y-auto border rounded-md p-2 bg-white shadow-inner">
            <div v-for="vereador in vereadores" :key="vereador.id" class="flex items-center py-1">
              <Field
                type="checkbox"
                :name="`proponentes`" 
                :id="`vereador_${vereador.id}`" 
                :value="vereador.id" 
                v-model="currentIndicacao.proponentes_ids"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
              />
              <label :for="`vereador_${vereador.id}`" class="text-sm text-gray-700">{{ vereador.nome_urna }}</label>
            </div>
          </div>
          <ErrorMessage name="proponentes" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Botões do formulário -->
        <div class="flex justify-end space-x-3">
          <button type="button" @click="resetForm(veeResetForm)" v-if="isEditing" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200 disabled:opacity-50">Cancelar Edição</button>
          <button type="submit" :disabled="isSubmitting" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed ">
            <span v-if="isSubmitting">Salvando...</span>
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Registrar Indicação' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Indicações --> 
    <h2 class="text-xl font-bold mb-4">Indicações Registradas</h2>
    <div v-if="loading" class="text-center py-4">Carregando indicações...</div>
    <div v-else-if="indicacoes.length === 0" class="text-center py-4">Nenhuma indicação registrada.</div>
    <ul v-else class="space-y-4 ">
      <li v-for="indicacao in indicacoes" :key="indicacao.id" class="p-4 border rounded-lg shadow-sm bg-white">
        <div class="flex justify-between items-start mb-2">
          <div>
            <p class="font-medium text-lg">Indicação Nº {{ indicacao.numero }}/{{ indicacao.ano }}</p>
            <p class="text-sm text-gray-500">Data: {{ formatDate(indicacao.data) }}</p>
          </div>
          <div class="space-x-2 flex-shrink-0 ml-4">
            <button @click="openFilesModal(indicacao)" class="text-green-500 hover:text-green-700 text-sm">Arquivos ({{ indicacao.Arquivos?.length || 0 }})</button>
            <button @click="editIndicacao(indicacao)" class="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
            <button @click="deleteIndicacao(indicacao.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
          </div>
        </div>
        <p class="text-sm text-gray-700 mb-1"><span class="font-medium">Ementa:</span> {{ indicacao.ementa }}</p>
        <p class="text-sm text-gray-700"><span class="font-medium">Proponentes:</span> {{ formatProponentes(indicacao.Proponentes) }}</p>
      </li>
    </ul>

    <!-- Modal para Gerenciar Arquivos -->
    <div v-if="showFilesModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative p-8 border w-full max-w-xl shadow-lg rounded-md bg-white">
        <h3 class="text-2xl font-bold mb-4">Arquivos da Indicação {{ selectedIndicacao?.numero }}/{{ selectedIndicacao?.ano }}</h3>
        <button @click="closeFilesModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        
        <!-- Upload de Arquivo -->
        <div class="mb-6">
          <label for="fileUpload" class="block text-sm font-medium text-gray-700 mb-1">Adicionar Novo Arquivo</label>
          <input type="file" id="fileUpload" @change="handleFileChange" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 shadow-inner"/>
          <button 
            @click="uploadFile" 
            :disabled="!selectedFile || uploadingFile"
            class="mt-2 px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed "
          >
            <span v-if="uploadingFile">Enviando...</span>
            <span v-else>Enviar Arquivo</span>
          </button>
        </div>

        <!-- Lista de Arquivos -->
        <div v-if="loadingFiles" class="text-center py-4">Carregando arquivos...</div>
        <ul v-else-if="indicacaoFiles.length > 0" class="space-y-2 max-h-60 overflow-y-auto border-t pt-4 shadow-inner">
          <li v-for="file in indicacaoFiles" :key="file.id" class="flex justify-between items-center text-sm">
            <a :href="file.url" target="_blank" class="text-blue-600 hover:underline truncate mr-4 ">{{ file.nome_original }}</a>
            <button @click="deleteFile(file.id)" class="text-red-500 hover:text-red-700 text-xs ">Excluir</button>
          </li>
        </ul> 
        <p v-else class="text-sm text-gray-500 border-t pt-4">Nenhum arquivo anexado.</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import indicacoesService from '@/services/indicacoesService';
import vereadoresService from '@/services/vereadoresService'; // Para buscar proponentes
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const toast = useToast();
const indicacoes = ref([]);
const vereadores = ref([]);
const loading = ref(false);
const loadingVereadores = ref(false);
const isEditing = ref(false);
const currentIndicacao = ref({
  id: null,
  numero: null,
  ano: new Date().getFullYear(),
  data: '',
  ementa: '',
  proponentes_ids: [], // Array de IDs dos vereadores proponentes
});

// Modal de Arquivos
const showFilesModal = ref(false);
const selectedIndicacao = ref(null);
const indicacaoFiles = ref([]);
const loadingFiles = ref(false);
const selectedFile = ref(null);
const uploadingFile = ref(false);

// Esquema de validação
const currentYear = new Date().getFullYear();
const schema = yup.object({
  numero: yup.number().required('O número é obrigatório').integer().positive(),
  ano: yup.number().required('O ano é obrigatório').integer().min(1900).max(currentYear + 5), // Permitir alguns anos futuros
  data: yup.date().required('A data é obrigatória').typeError('Data inválida'),
  ementa: yup.string().required('A ementa/assunto é obrigatória'),
  proponentes_ids: yup.array().min(1, 'Selecione pelo menos um proponente').required(),
});

// --- Funções CRUD Indicação ---

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await indicacoesService.getAll({ include: 'Proponentes,Arquivos' }); // Incluir associações
    indicacoes.value = response.data || [];
  } catch (error) {
    console.error('Erro ao buscar indicações:', error);
    toast.error('Falha ao carregar indicações.');
  } finally {
    loading.value = false;
  }
};

const fetchVereadores = async () => {
  loadingVereadores.value = true;
  try {
    const response = await vereadoresService.getAll();
    vereadores.value = response.data || [];
  } catch (error) {
    console.error('Erro ao buscar vereadores:', error);
    toast.error('Falha ao carregar lista de vereadores.');
  } finally {
    loadingVereadores.value = false;
  }
};

onMounted(() => {
  fetchData();
  fetchVereadores();
});

const formatDate = (dateStr) => {
  if (!dateStr) return 'Data não definida';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  } catch (e) {
    return 'Data inválida';
  }
};

const formatProponentes = (proponentes) => {
  if (!proponentes || proponentes.length === 0) return 'Nenhum';
  return proponentes.map(p => p.Vereador?.nome_urna || 'Desconhecido').join(', ');
};

const resetForm = (veeResetForm) => {
  isEditing.value = false;
  currentIndicacao.value = {
    id: null,
    numero: null,
    ano: new Date().getFullYear(),
    data: '',
    ementa: '',
    proponentes_ids: [],
  };
  if (veeResetForm) {
      veeResetForm();
  }
};

const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  const dataToSend = {
    numero: values.numero,
    ano: values.ano,
    data: values.data,
    ementa: values.ementa,
    proponentes_ids: values.proponentes_ids, // Enviar array de IDs
  };

  try {
    if (isEditing.value) {
      await indicacoesService.update(currentIndicacao.value.id, dataToSend);
      toast.success('Indicação atualizada com sucesso!');
    } else {
      await indicacoesService.create(dataToSend);
      toast.success('Indicação registrada com sucesso!');
    }
    await fetchData();
    resetForm(veeResetForm);
  } catch (error) {
    console.error('Erro ao salvar indicação:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar a indicação.');
  }
};

const editIndicacao = (indicacao) => {
  isEditing.value = true;
  const dataFormatada = indicacao.data ? format(new Date(indicacao.data + 'T00:00:00'), 'yyyy-MM-dd') : '';
  currentIndicacao.value = {
    id: indicacao.id,
    numero: indicacao.numero,
    ano: indicacao.ano,
    data: dataFormatada,
    ementa: indicacao.ementa,
    // Mapear proponentes para array de IDs
    proponentes_ids: indicacao.Proponentes?.map(p => p.vereador_id) || [], 
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const deleteIndicacao = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta indicação? Arquivos e proponentes associados também podem ser afetados.')) {
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

// --- Funções Modal de Arquivos ---

const openFilesModal = async (indicacao) => {
  selectedIndicacao.value = indicacao;
  showFilesModal.value = true;
  loadingFiles.value = true;
  indicacaoFiles.value = [];
  selectedFile.value = null; // Limpa seleção anterior
  document.getElementById('fileUpload').value = ''; // Limpa input file
  try {
    const response = await indicacoesService.getArquivos(indicacao.id);
    indicacaoFiles.value = response.data || [];
  } catch (error) {
    console.error(`Erro ao buscar arquivos para indicação ${indicacao.id}:`, error);
    toast.error('Falha ao carregar arquivos da indicação.');
  } finally {
    loadingFiles.value = false;
  }
};

const closeFilesModal = () => {
  showFilesModal.value = false;
  selectedIndicacao.value = null;
  indicacaoFiles.value = [];
  selectedFile.value = null;
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
  if (!selectedFile.value || !selectedIndicacao.value) return;

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  // Adicionar outros dados se necessário pelo backend
  // formData.append('descricao', 'Descrição do arquivo'); 

  uploadingFile.value = true;
  try {
    await indicacoesService.uploadArquivo(selectedIndicacao.value.id, formData);
    toast.success('Arquivo enviado com sucesso!');
    await openFilesModal(selectedIndicacao.value); // Recarrega a lista de arquivos
  } catch (error) {
    console.error('Erro ao enviar arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao enviar o arquivo.');
  } finally {
    uploadingFile.value = false;
  }
};

const deleteFile = async (arquivoId) => {
  if (!selectedIndicacao.value || !confirm('Tem certeza que deseja excluir este arquivo?')) {
    return;
  }
  try {
    await indicacoesService.deleteArquivo(selectedIndicacao.value.id, arquivoId);
    toast.success('Arquivo excluído com sucesso!');
    await openFilesModal(selectedIndicacao.value); // Recarrega a lista de arquivos
  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir o arquivo.');
  }
};

</script>
