<template>
  <div class="p-6 bg-white min-h-full">
    <h1 class="text-2xl font-semibold mb-6">Gerenciar Proposições</h1>

    <!-- Formulário para Adicionar/Editar Proposição -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Proposição' : 'Adicionar Nova Proposição' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm: veeResetForm }">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <Field
              name="titulo"
              type="text"
              id="titulo"
              v-model="currentProposicao.titulo"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.titulo, 'focus:ring-blue-400': !errors.titulo }"
            />
            <ErrorMessage name="titulo" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="tipoProposicao" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Proposição</label>
            <Field
              name="tipoProposicao"
              as="select"
              id="tipoProposicao"
              v-model="currentProposicao.tipo_proposicao_id"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.tipoProposicao, 'focus:ring-blue-400': !errors.tipoProposicao }"
            >
              <option value="" disabled>Selecione um tipo</option>
              <option v-for="tipo in tiposProposicao" :key="tipo.id" :value="tipo.id">{{ tipo.nome }}</option>
            </Field>
            <ErrorMessage name="tipoProposicao" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="mb-4">
          <label for="ementa" class="block text-sm font-medium text-gray-700 mb-1">Ementa</label>
          <Field
            name="ementa"
            as="textarea"
            id="ementa"
            rows="3"
            v-model="currentProposicao.ementa"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.ementa, 'focus:ring-blue-400': !errors.ementa }"
          />
          <ErrorMessage name="ementa" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Seleção de Proponentes -->
        <div class="mb-4">
          <label for="proponentes" class="block text-sm font-medium text-gray-700 mb-1">Proponentes</label>
          <Field
            name="proponentes"
            as="select"
            id="proponentes"
            multiple
            v-model="currentProposicao.proponentes"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white h-32"
            :class="{ 'border-red-500 focus:ring-red-400': errors.proponentes, 'focus:ring-blue-400': !errors.proponentes }"
          >
            <option v-for="vereador in vereadores" :key="vereador.id" :value="vereador.id">{{ vereador.nome }}</option>
          </Field>
          <ErrorMessage name="proponentes" class="text-red-500 text-sm mt-1" />
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
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Adicionar Proposição' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Proposições -->
    <h2 class="text-xl font-semibold mb-4">Proposições Cadastradas</h2>
    <div v-if="loading">Carregando proposições...</div>
    <div v-else-if="proposicoes.length === 0">Nenhuma proposição cadastrada.</div>
    <ul v-else class="space-y-3">
      <li v-for="proposicao in proposicoes" :key="proposicao.id" class="p-4 border rounded-lg flex justify-between items-center">
        <div>
          <span class="font-medium">{{ proposicao.titulo }}</span>
          <span class="text-sm text-gray-500 ml-2">({{ getTipoNome(proposicao.tipo_proposicao_id) }})</span>
        </div>
        <div class="space-x-2">
          <button @click="openFileManager(proposicao)" class="text-green-500 hover:text-green-700 text-sm">Arquivos</button>
          <button @click="editProposicao(proposicao)" class="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
          <button @click="deleteProposicao(proposicao.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
        </div>
      </li>
    </ul>

    <!-- Modal Gerenciador de Arquivos (Reutilizar ou adaptar o componente de Projetos) -->
    <div v-if="showFileManager" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
       <div class="relative mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">Gerenciar Arquivos - {{ fileManagerProposicao?.titulo }}</h3>
          <button @click="closeFileManager" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div class="mb-4">
          <label for="fileUpload" class="block text-sm font-medium text-gray-700 mb-1">Adicionar Novo Arquivo</label>
          <input type="file" id="fileUpload" @change="handleFileUpload" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          <button @click="uploadFile" :disabled="!selectedFile || uploadingFile" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50">
            {{ uploadingFile ? 'Enviando...' : 'Enviar Arquivo' }}
          </button>
        </div>
        <div>
          <h4 class="text-lg font-medium mb-2">Arquivos Anexados</h4>
          <div v-if="loadingFiles">Carregando arquivos...</div>
          <ul v-else-if="proposicaoFiles.length > 0" class="space-y-2 max-h-60 overflow-y-auto">
            <li v-for="file in proposicaoFiles" :key="file.id" class="flex justify-between items-center p-2 border rounded">
              <a :href="file.url" target="_blank" class="text-blue-600 hover:underline truncate mr-4">{{ file.nome_original || 'Arquivo sem nome' }}</a>
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
import proposicoesService from '@/services/proposicoesService';
import vereadoresService from '@/services/vereadoresService'; // Reutilizar serviço de vereadores

const toast = useToast();
const proposicoes = ref([]);
const tiposProposicao = ref([]);
const vereadores = ref([]);
const loading = ref(false);
const isEditing = ref(false);
const currentProposicao = ref({
  id: null,
  titulo: '',
  ementa: '',
  tipo_proposicao_id: '',
  proponentes: [],
});

// Estado do Gerenciador de Arquivos
const showFileManager = ref(false);
const fileManagerProposicao = ref(null);
const proposicaoFiles = ref([]);
const loadingFiles = ref(false);
const selectedFile = ref(null);
const uploadingFile = ref(false);

// Esquema de validação
const schema = yup.object({
  titulo: yup.string().required('O título é obrigatório').max(255, 'O título deve ter no máximo 255 caracteres'),
  tipoProposicao: yup.number().required('Selecione o tipo de proposição'),
  ementa: yup.string().required('A ementa é obrigatória'),
  proponentes: yup.array().min(1, 'Selecione pelo menos um proponente').required('Selecione os proponentes'),
});

// Buscar dados iniciais
const fetchData = async () => {
  loading.value = true;
  try {
    const [proposicoesRes, tiposRes, vereadoresRes] = await Promise.all([
      proposicoesService.getProposicoes(),
      proposicoesService.getTiposProposicao(), // Assumindo que existe
      vereadoresService.getVereadores(), // Reutilizando
    ]);
    proposicoes.value = proposicoesRes.data || [];
    tiposProposicao.value = tiposRes.data || [];
    vereadores.value = vereadoresRes.data || [];
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    toast.error('Falha ao carregar dados das proposições.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Função para obter nome do tipo pelo ID
const getTipoNome = (tipoId) => {
  const tipo = tiposProposicao.value.find(t => t.id === tipoId);
  return tipo ? tipo.nome : 'Desconhecido';
};

// Resetar formulário
const resetForm = (veeResetForm) => {
  isEditing.value = false;
  currentProposicao.value = {
    id: null,
    titulo: '',
    ementa: '',
    tipo_proposicao_id: '',
    proponentes: [],
  };
   if (veeResetForm) {
      veeResetForm();
  }
};

// Submissão do formulário (Criar ou Atualizar)
const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  const dataToSend = {
    titulo: values.titulo,
    ementa: values.ementa,
    tipo_proposicao_id: values.tipoProposicao,
    // Incluir outros campos se houver
  };

  try {
    let savedProposicao;
    if (isEditing.value) {
      // Atualizar dados básicos
      const updateRes = await proposicoesService.updateProposicao(currentProposicao.value.id, dataToSend);
      savedProposicao = updateRes.data;
      // Atualizar proponentes
      await proposicoesService.updateProponentesProposicao(currentProposicao.value.id, currentProposicao.value.proponentes);
      toast.success('Proposição atualizada com sucesso!');
    } else {
      // Criar
      const createRes = await proposicoesService.createProposicao(dataToSend);
      savedProposicao = createRes.data;
      // Adicionar proponentes
      if (savedProposicao && savedProposicao.id) {
        await proposicoesService.updateProponentesProposicao(savedProposicao.id, currentProposicao.value.proponentes);
      } else {
         console.warn('ID da proposição não encontrado após criação para adicionar proponentes.');
      }
      toast.success('Proposição adicionada com sucesso!');
    }
    await fetchData(); // Recarregar lista
    resetForm(veeResetForm);
  } catch (error) {
    console.error('Erro ao salvar proposição:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar a proposição.');
  }
};

// Editar proposição
const editProposicao = async (proposicao) => {
  isEditing.value = true;
  // Copia dados básicos
  currentProposicao.value = {
    id: proposicao.id,
    titulo: proposicao.titulo,
    ementa: proposicao.ementa,
    tipo_proposicao_id: proposicao.tipo_proposicao_id,
    proponentes: [], // Inicializa vazio, busca abaixo
  };
  // Buscar proponentes atuais
  try {
    const proponentesRes = await proposicoesService.getProponentesProposicao(proposicao.id);
    currentProposicao.value.proponentes = proponentesRes.data.map(p => p.vereador_id); // Ajustar conforme API
  } catch (error) {
    console.error('Erro ao buscar proponentes da proposição:', error);
    toast.error('Falha ao carregar proponentes para edição.');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Excluir proposição
const deleteProposicao = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta proposição e todos os seus arquivos?')) {
    return;
  }
  try {
    await proposicoesService.deleteProposicao(id);
    toast.success('Proposição excluída com sucesso!');
    await fetchData(); // Recarregar lista
  } catch (error) {
    console.error('Erro ao excluir proposição:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir a proposição.');
  }
};

// --- Funções do Gerenciador de Arquivos (Adaptadas de Projetos) ---

const openFileManager = async (proposicao) => {
  fileManagerProposicao.value = proposicao;
  showFileManager.value = true;
  proposicaoFiles.value = [];
  selectedFile.value = null;
  await loadProposicaoFiles();
};

const closeFileManager = () => {
  showFileManager.value = false;
  fileManagerProposicao.value = null;
  proposicaoFiles.value = [];
  selectedFile.value = null;
};

const loadProposicaoFiles = async () => {
  if (!fileManagerProposicao.value) return;
  loadingFiles.value = true;
  try {
    const response = await proposicoesService.getArquivosProposicao(fileManagerProposicao.value.id);
    proposicaoFiles.value = response.data || [];
  } catch (error) {
    console.error('Erro ao carregar arquivos da proposição:', error);
    toast.error('Falha ao carregar arquivos.');
  } finally {
    loadingFiles.value = false;
  }
};

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
  if (!selectedFile.value || !fileManagerProposicao.value) return;
  uploadingFile.value = true;
  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    await proposicoesService.uploadArquivoProposicao(fileManagerProposicao.value.id, formData);
    toast.success('Arquivo enviado com sucesso!');
    selectedFile.value = null;
    document.getElementById('fileUpload').value = '';
    await loadProposicaoFiles();
  } catch (error) {
    console.error('Erro ao enviar arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao enviar arquivo.');
  } finally {
    uploadingFile.value = false;
  }
};

const deleteFile = async (fileId) => {
  if (!fileManagerProposicao.value || !confirm('Tem certeza que deseja excluir este arquivo?')) {
    return;
  }
  try {
    await proposicoesService.deleteArquivoProposicao(fileManagerProposicao.value.id, fileId);
    toast.success('Arquivo excluído com sucesso!');
    await loadProposicaoFiles();
  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir arquivo.');
  }
};

</script>

<style scoped>
select[multiple] {
  min-height: 8rem;
}
</style>

