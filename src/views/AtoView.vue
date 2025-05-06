<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">Gerenciar Atos</h1>

    <!-- Formulário para Adicionar/Editar Ato -->
    <div class="mb-8 p-6 border rounded-lg shadow-md bg-white">
      <h2 class="text-2xl font-semibold mb-4">{{ isEditing ? 'Editar Ato' : 'Adicionar Novo Ato' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm: veeResetForm }">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="mb-2">
            <label for="numero" class="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <Field
              name="numero"
              type="number"
              id="numero"
              v-model="currentAto.numero"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.numero, 'focus:ring-blue-400': !errors.numero }"
            />
            <ErrorMessage name="numero" class="text-red-500 text-sm mt-1" />
          </div>
          <div class="mb-2">
            <label for="data_ato" class="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <Field
              name="data_ato"
              type="date"
              id="data_ato"
              v-model="currentAto.data_ato"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.data_ato, 'focus:ring-blue-400': !errors.data_ato }"
            />
            <ErrorMessage name="data_ato" class="text-red-500 text-sm mt-1" />
          </div>
           <div class="mb-2">
            <label for="tipoAto" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Ato</label>
            <Field
              name="tipoAto"
              as="select"
              id="tipoAto"
              v-model="currentAto.tipo_ato_id"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.tipoAto, 'focus:ring-blue-400': !errors.tipoAto }"
            >
              <option value="" disabled>Selecione um tipo</option>
              <option v-for="tipo in tiposAto" :key="tipo.id" :value="tipo.id">{{ tipo.nome }}</option>
            </Field>
            <ErrorMessage name="tipoAto" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="mb-6">
          <label for="ementa" class="block text-sm font-medium text-gray-700 mb-1">Ementa/Resumo</label>
          <Field
            name="ementa"
            as="textarea"
            id="ementa"
            rows="3"
            v-model="currentAto.ementa"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.ementa, 'focus:ring-blue-400': !errors.ementa }"
          />
          <ErrorMessage name="ementa" class="text-red-500 text-sm mt-1" />
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="resetForm(veeResetForm)"
            v-if="isEditing"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
          >
            Cancelar Edição
          </button>
          <button
            type="submit"
            :disabled="isSubmitting" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Salvando...</span>
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Adicionar Ato' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <h2 class="text-2xl font-bold mb-4">Atos Cadastrados</h2>
    <div v-if="loading" class="text-center">Carregando atos...</div>
    <div v-else-if="atos.length === 0" class="text-center text-gray-500">Nenhum ato cadastrado.</div>
    <ul v-else class="space-y-3">
      <li v-for="ato in atos" :key="ato.id" class="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white">
        <div>
          <span class="font-medium">Ato Nº {{ ato.numero }}/{{ new Date(ato.data_ato).getFullYear() }}</span>
          <span class="text-sm text-gray-500 ml-2">({{ getTipoNome(ato.tipo_ato_id) }})</span>
          <p class="text-sm text-gray-600 mt-1">{{ ato.ementa }}</p>
        </div>
        <div class="space-x-2 flex-shrink-0 ml-4">
          <button @click="openFileManager(ato)" class="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">Arquivos</button>
          <button @click="editAto(ato)" class="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Editar</button>
          <button @click="deleteAto(ato.id)" class="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Excluir</button>
        </div>
      </li>
    </ul>

    <!-- Modal Gerenciador de Arquivos -->
    <div v-if="showFileManager" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
       <div class="relative mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">Gerenciar Arquivos - Ato Nº {{ fileManagerAto?.numero }}</h3>
          <button @click="closeFileManager" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div class="mb-4">
          <label for="fileUpload" class="block text-sm font-medium text-gray-700 mb-1">Adicionar Novo Arquivo</label>
          <input type="file" id="fileUpload" @change="handleFileUpload" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          <button @click="uploadFile" :disabled="!selectedFile || uploadingFile" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50">
            {{ uploadingFile ? 'Enviando...' : 'Enviar Arquivo' }}
          </button>
        </div>
        <div>
          <h4 class="text-lg font-medium mb-2">Arquivos Anexados</h4>
          <div v-if="loadingFiles">Carregando arquivos...</div>
          <ul v-else-if="atoFiles.length > 0" class="space-y-2 max-h-60 overflow-y-auto bg-white shadow-sm rounded-md">
            <li v-for="file in atoFiles" :key="file.id" class="flex justify-between items-center p-2 border rounded bg-gray-50">
              <a :href="file.url" target="_blank" class="text-blue-600 hover:underline truncate mr-4">{{ file.nome_original }}</a>
              <button @click="deleteFile(file.id)" class="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Excluir</button>
            </li>
          </ul>
          <p v-else class="text-gray-500">Nenhum arquivo anexado.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import atosService from '@/services/atosService';

const toast = useToast();
const atos = ref([]);
const tiposAto = ref([]);
const loading = ref(false);
const isEditing = ref(false);
const currentAto = ref({
  id: null,
  numero: null,
  data_ato: '',
  ementa: '',
  tipo_ato_id: '',
});

// Estado do Gerenciador de Arquivos
const showFileManager = ref(false);
const fileManagerAto = ref(null);
const atoFiles = ref([]);
const loadingFiles = ref(false);
const selectedFile = ref(null);
const uploadingFile = ref(false);

// Esquema de validação
const schema = yup.object({
  numero: yup.number().required('O número é obrigatório').positive('O número deve ser positivo').integer('O número deve ser inteiro').label('Número'),
  data_ato: yup.date().required('A data é obrigatória').typeError('Data inválida').label('Data'),
  tipoAto: yup.number().required('Selecione o tipo de ato').label('Tipo de ato'),
  ementa: yup.string().required('A ementa/resumo é obrigatória').label('Ementa'),
});

// Formatar data para input type="date"
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
};

// Buscar dados iniciais
const fetchData = async () => {
  loading.value = true;
  try {
    const [atosRes, tiposRes] = await Promise.all([
      atosService.getAtos(),
      atosService.getTiposAto(), // Assumindo que existe
    ]);
    atos.value = atosRes.data || [];
    tiposAto.value = tiposRes.data || [];
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    toast.error('Falha ao carregar dados dos atos.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Função para obter nome do tipo pelo ID
const getTipoNome = (tipoId) => {
  const tipo = tiposAto.value.find((t) => t.id === tipoId);
  return tipo ? tipo.nome : 'Desconhecido';
};

// Resetar formulário
const resetForm = (veeResetForm) => {
  isEditing.value = false;
  currentAto.value = {
    id: null,
    numero: null,
    data_ato: '',
    ementa: '',
    tipo_ato_id: '',
  };
  if (veeResetForm) {
    veeResetForm();
  }
};

// Submissão do formulário (Criar ou Atualizar)
const handleSubmit = async (values, { resetForm: veeResetForm }) => {
    const dataToSend = {
    numero: values.numero,
    // A data do YUP já vem formatada corretamente para envio (geralmente ISO string)
    // Se a API esperar YYYY-MM-DD, pode ser necessário ajustar aqui
    data_ato: values.data_ato, 
    ementa: values.ementa,
    tipo_ato_id: values.tipoAto,
  };

  try {
    if (isEditing.value) {
      // Atualizar
      await atosService.updateAto(currentAto.value.id, dataToSend);
      toast.success('Ato atualizado com sucesso!');
    } else {
      // Criar
      await atosService.createAto(dataToSend);
      toast.success('Ato adicionado com sucesso!');
    }
    await fetchData(); // Recarregar lista
    resetForm(veeResetForm);
  } catch (error) {
    console.error('Erro ao salvar ato:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar o ato.');
  }
};

// Editar ato
const editAto = (ato) => {
  isEditing.value = true;
  currentAto.value = { 
    ...ato,
    data_ato: formatDateForInput(ato.data_ato), // Formata para o input date
  }; 
  window.scrollTo({ top: 0, behavior: 'smooth' })
};

// Excluir ato
const deleteAto = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este ato e todos os seus arquivos?')) {
    return;
  }
  try {
    await atosService.deleteAto(id);
    toast.success('Ato excluído com sucesso!');
    await fetchData(); // Recarregar lista
  } catch (error) {
    console.error('Erro ao excluir ato:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir o ato.');
  }
};

// --- Funções do Gerenciador de Arquivos (Adaptadas) ---

const openFileManager = async (ato) => {
  fileManagerAto.value = ato;
  showFileManager.value = true;
  atoFiles.value = [];
  selectedFile.value = null;
  await loadAtoFiles();
};

const closeFileManager = () => {
  showFileManager.value = false;
  fileManagerAto.value = null;
  atoFiles.value = [];
  selectedFile.value = null;
};

const loadAtoFiles = async () => {
  if (!fileManagerAto.value) return;
  loadingFiles.value = true;
  try {
    const response = await atosService.getArquivosAto(fileManagerAto.value.id);
    atoFiles.value = response.data || [];
  } catch (error) {
    console.error('Erro ao carregar arquivos do ato:', error);
    toast.error('Falha ao carregar arquivos.');
  } finally {
    loadingFiles.value = false;
  }
};

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
  if (!selectedFile.value || !fileManagerAto.value) return;
  uploadingFile.value = true;
  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    await atosService.uploadArquivoAto(fileManagerAto.value.id, formData);
    toast.success('Arquivo enviado com sucesso!');
    selectedFile.value = null;
    document.getElementById('fileUpload').value = '';
    await loadAtoFiles();
  } catch (error) {
    console.error('Erro ao enviar arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao enviar arquivo.');
  } finally {
    uploadingFile.value = false;
  }
};

const deleteFile = async (fileId) => {
  if (!fileManagerAto.value || !confirm('Tem certeza que deseja excluir este arquivo?')) {
    return;
  }
  try {
    await atosService.deleteArquivoAto(fileManagerAto.value.id, fileId);
    toast.success('Arquivo excluído com sucesso!');
    await loadAtoFiles();
  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir arquivo.');
  }
};
</script>

