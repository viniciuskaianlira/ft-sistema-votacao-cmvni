<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Gerenciar Ofícios</h1>

    <!-- Formulário para Adicionar/Editar Ofício -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Ofício' : 'Adicionar Novo Ofício' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm: veeResetForm }">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label for="numero" class="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <Field
              name="numero"
              type="number"
              id="numero"
              v-model="currentOficio.numero"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.numero, 'focus:ring-blue-400': !errors.numero }"
            />
            <ErrorMessage name="numero" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="data_oficio" class="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <Field
              name="data_oficio"
              type="date"
              id="data_oficio"
              v-model="currentOficio.data_oficio"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.data_oficio, 'focus:ring-blue-400': !errors.data_oficio }"
            />
            <ErrorMessage name="data_oficio" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="destinatario" class="block text-sm font-medium text-gray-700 mb-1">Destinatário</label>
            <Field
              name="destinatario"
              type="text" 
              id="destinatario"
              v-model="currentOficio.destinatario"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.destinatario, 'focus:ring-blue-400': !errors.destinatario }"
            />
             <!-- Ou usar um select se houver uma lista predefinida -->
            <!-- <Field name="destinatario_id" as="select" ... > -->
            <ErrorMessage name="destinatario" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="mb-4">
          <label for="assunto" class="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
          <Field
            name="assunto"
            as="textarea"
            id="assunto"
            rows="3"
            v-model="currentOficio.assunto"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.assunto, 'focus:ring-blue-400': !errors.assunto }"
          />
          <ErrorMessage name="assunto" class="text-red-500 text-sm mt-1" />
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="resetForm(veeResetForm)"
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
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Adicionar Ofício' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Ofícios -->
    <h2 class="text-xl font-semibold mb-4">Ofícios Cadastrados</h2>
    <div v-if="loading" class="text-center p-4">Carregando ofícios...</div>
    <div v-else-if="oficios.length === 0" class="text-gray-500 p-4">Nenhum ofício cadastrado.</div>
    <ul v-else class="space-y-3">
      <li v-for="oficio in oficios" :key="oficio.id" class="p-4 border rounded-lg flex justify-between items-center">
        <div>
          <span class="font-medium">Ofício Nº {{ oficio.numero }}/{{ new Date(oficio.data_oficio).getFullYear() }}</span>
          <span class="text-sm text-gray-500 ml-2">- Dest: {{ oficio.destinatario }}</span>
          <p class="text-sm text-gray-600 mt-1">Assunto: {{ oficio.assunto }}</p>
        </div>
        <div class="space-x-2 flex-shrink-0 ml-4">
          <button @click="openFileManager(oficio)" class="text-green-500 hover:text-green-700 text-sm">Arquivos</button>
          <button @click="editOficio(oficio)" class="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
          <button @click="deleteOficio(oficio.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
        </div>
      </li>
    </ul>

    <!-- Modal Gerenciador de Arquivos -->
    <div v-if="showFileManager" class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto flex items-center justify-center z-50">
       <div class="relative mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">Gerenciar Arquivos - Ofício Nº {{ fileManagerOficio?.numero }}</h3>
          <button @click="closeFileManager" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div class="mb-4">
          <label for="fileUpload" class="block text-sm font-medium text-gray-700 mb-1">Adicionar Arquivo</label>
          <input type="file" id="fileUpload" @change="handleFileUpload" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          <button @click="uploadFile" :disabled="!selectedFile || uploadingFile" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50">
            {{ uploadingFile ? 'Enviando...' : 'Enviar Arquivo' }}
          </button>
        </div>
        <div>
          <h4 class="text-lg font-medium mb-2">Arquivos Anexados</h4>
          <div v-if="loadingFiles" class="text-center p-4">Carregando arquivos...</div>
          <ul v-else-if="oficioFiles.length > 0" class="space-y-2 max-h-60 overflow-y-auto">
            <li v-for="file in oficioFiles" :key="file.id" class="flex justify-between items-center p-2 border rounded-lg">
              <a :href="file.url" target="_blank" class="text-blue-600 hover:underline truncate mr-4">{{ file.nome_original }}</a>
              <button @click="deleteFile(file.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
            </li>
          </ul>
          <p v-else class="text-gray-500">Nenhum arquivo anexado.</p>
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
import oficiosService from '@/services/oficiosService';

const toast = useToast();
const oficios = ref([]);
// const destinatarios = ref([]); // Se houver lista predefinida
const loading = ref(false);
const isEditing = ref(false);
const currentOficio = ref({
  id: null,
  numero: null,
  data_oficio: '',
  destinatario: '', // ou destinatario_id: null
  assunto: '',
});

// Estado do Gerenciador de Arquivos
const showFileManager = ref(false);
const fileManagerOficio = ref(null);
const oficioFiles = ref([]);
const loadingFiles = ref(false);
const selectedFile = ref(null);
const uploadingFile = ref(false);

// Esquema de validação
const schema = yup.object({
  numero: yup.number().required('O número é obrigatório').positive('O número deve ser positivo').integer('O número deve ser inteiro'),
  data_oficio: yup.date().required('A data é obrigatória').typeError('Data inválida'),
  destinatario: yup.string().required('O destinatário é obrigatório').max(255, 'Máximo 255 caracteres'), // Ajustar se for ID
  assunto: yup.string().required('O assunto é obrigatório'),
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
    // Adicionar busca de destinatários se necessário: Promise.all([...])
    const oficiosRes = await oficiosService.getOficios();
    oficios.value = oficiosRes.data || [];
    // destinatarios.value = destinatariosRes.data || [];
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    toast.error('Falha ao carregar dados dos ofícios.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Resetar formulário
const resetForm = (veeResetForm) => {
  isEditing.value = false;
  currentOficio.value = {
    id: null,
    numero: null,
    data_oficio: '',
    destinatario: '',
    assunto: '',
  };
   if (veeResetForm) {
      veeResetForm();
  }
};

// Submissão do formulário (Criar ou Atualizar)
const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  const dataToSend = {
    numero: values.numero,
    data_oficio: values.data_oficio,
    destinatario: values.destinatario, // Ajustar se for ID
    assunto: values.assunto,
  };

  try {
    if (isEditing.value) {
      // Atualizar
      await oficiosService.updateOficio(currentOficio.value.id, dataToSend);
      toast.success('Ofício atualizado com sucesso!');
    } else {
      // Criar
      await oficiosService.createOficio(dataToSend);
      toast.success('Ofício adicionado com sucesso!');
    }
    await fetchData(); // Recarregar lista
    resetForm(veeResetForm);
  } catch (error) {
    console.error('Erro ao salvar ofício:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar o ofício.');
  }
};

// Editar ofício
const editOficio = (oficio) => {
  isEditing.value = true;
  currentOficio.value = { 
      ...oficio, 
      data_oficio: formatDateForInput(oficio.data_oficio) // Formata para o input date
  }; 
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Excluir ofício
const deleteOficio = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este ofício e todos os seus arquivos?')) {
    return;
  }
  try {
    await oficiosService.deleteOficio(id);
    toast.success('Ofício excluído com sucesso!');
    await fetchData(); // Recarregar lista
  } catch (error) {
    console.error('Erro ao excluir ofício:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir o ofício.');
  }
};

// --- Funções do Gerenciador de Arquivos (Adaptadas) ---

const openFileManager = async (oficio) => {
  fileManagerOficio.value = oficio;
  showFileManager.value = true;
  oficioFiles.value = [];
  selectedFile.value = null;
  await loadOficioFiles();
};

const closeFileManager = () => {
  showFileManager.value = false;
  fileManagerOficio.value = null;
  oficioFiles.value = [];
  selectedFile.value = null;
};

const loadOficioFiles = async () => {
  if (!fileManagerOficio.value) return;
  loadingFiles.value = true;
  try {
    const response = await oficiosService.getArquivosOficio(fileManagerOficio.value.id);
    oficioFiles.value = response.data || [];
  } catch (error) {
    console.error('Erro ao carregar arquivos do ofício:', error);
    toast.error('Falha ao carregar arquivos.');
  } finally {
    loadingFiles.value = false;
  }
};

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
  if (!selectedFile.value || !fileManagerOficio.value) return;
  uploadingFile.value = true;
  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    await oficiosService.uploadArquivoOficio(fileManagerOficio.value.id, formData);
    toast.success('Arquivo enviado com sucesso!');
    selectedFile.value = null;
    document.getElementById('fileUpload').value = '';
    await loadOficioFiles();
  } catch (error) {
    console.error('Erro ao enviar arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao enviar arquivo.');
  } finally {
    uploadingFile.value = false;
  }
};

const deleteFile = async (fileId) => {
  if (!fileManagerOficio.value || !confirm('Tem certeza que deseja excluir este arquivo?')) {
    return;
  }
  try {
    await oficiosService.deleteArquivoOficio(fileManagerOficio.value.id, fileId);
    toast.success('Arquivo excluído com sucesso!');
    await loadOficioFiles();
  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir arquivo.');
  }
};

</script>
