<template>
  <div class="p-6 bg-white min-h-full">
    <h1 class="text-2xl font-semibold mb-6">Gerenciar Projetos</h1>

    <!-- Formulário para Adicionar/Editar Projeto -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Projeto' : 'Adicionar Novo Projeto' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm: veeResetForm }">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <Field
              name="titulo"
              type="text"
              id="titulo"
              v-model="currentProject.titulo"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.titulo, 'focus:ring-blue-400': !errors.titulo }"
            />
            <ErrorMessage name="titulo" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="tipoProjeto" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Projeto</label>
            <Field
              name="tipoProjeto"
              as="select"
              id="tipoProjeto"
              v-model="currentProject.tipo_projeto_id"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.tipoProjeto, 'focus:ring-blue-400': !errors.tipoProjeto }"
            >
              <option value="" disabled>Selecione um tipo</option>
              <option v-for="tipo in tiposProjeto" :key="tipo.id" :value="tipo.id">{{ tipo.nome }}</option>
            </Field>
            <ErrorMessage name="tipoProjeto" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="mb-4">
          <label for="descricao" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <Field
            name="descricao"
            as="textarea"
            id="descricao"
            rows="3"
            v-model="currentProject.descricao"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.descricao, 'focus:ring-blue-400': !errors.descricao }"
          />
          <ErrorMessage name="descricao" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Seleção de Proponentes -->
        <div class="mb-4">
          <label for="proponentes" class="block text-sm font-medium text-gray-700 mb-1">Proponentes</label>
          <Field
            name="proponentes"
            as="select"
            id="proponentes"
            multiple
            v-model="currentProject.proponentes"
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
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Adicionar Projeto' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Projetos -->
    <h2 class="text-xl font-semibold mb-4">Projetos Cadastrados</h2>
    <div v-if="loading">Carregando projetos...</div>
    <div v-else-if="projetos.length === 0">Nenhum projeto cadastrado.</div>
    <ul v-else class="space-y-3">
      <li v-for="projeto in projetos" :key="projeto.id" class="p-4 border rounded-lg flex justify-between items-center">
        <div>
          <span class="font-medium">{{ projeto.titulo }}</span>
          <span class="text-sm text-gray-500 ml-2">({{ getTipoNome(projeto.tipo_projeto_id) }})</span>
        </div>
        <div class="space-x-2">
          <button @click="openFileManager(projeto)" class="text-green-500 hover:text-green-700 text-sm">Arquivos</button>
          <button @click="editProject(projeto)" class="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
          <button @click="deleteProject(projeto.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
        </div>
      </li>
    </ul>

    <!-- Modal Gerenciador de Arquivos -->
    <div v-if="showFileManager" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">Gerenciar Arquivos - {{ fileManagerProject?.titulo }}</h3>
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
          <ul v-else-if="projectFiles.length > 0" class="space-y-2 max-h-60 overflow-y-auto">
            <li v-for="file in projectFiles" :key="file.id" class="flex justify-between items-center p-2 border rounded">
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
import { ref, onMounted, computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import projetosService from '@/services/projetosService';
import vereadoresService from '@/services/vereadoresService'; // Importar serviço de vereadores

const toast = useToast();
const projetos = ref([]);
const tiposProjeto = ref([]);
const vereadores = ref([]); // Ref para lista de vereadores
const loading = ref(false);
const isEditing = ref(false);
const currentProject = ref({
  id: null,
  titulo: '',
  descricao: '',
  tipo_projeto_id: '',
  proponentes: [], // Array para IDs dos proponentes selecionados
});

// Estado do Gerenciador de Arquivos
const showFileManager = ref(false);
const fileManagerProject = ref(null);
const projectFiles = ref([]);
const loadingFiles = ref(false);
const selectedFile = ref(null);
const uploadingFile = ref(false);

// Esquema de validação
const schema = yup.object({
  titulo: yup.string().required('O título é obrigatório').max(255, 'O título deve ter no máximo 255 caracteres'),
  tipoProjeto: yup.number().required('Selecione o tipo de projeto'),
  descricao: yup.string().required('A descrição é obrigatória'),
  proponentes: yup.array().min(1, 'Selecione pelo menos um proponente').required('Selecione os proponentes'),
});

// Buscar dados iniciais (projetos, tipos, vereadores)
const fetchData = async () => {
  loading.value = true;
  try {
    const [projetosRes, tiposRes, vereadoresRes] = await Promise.all([
      projetosService.getProjetos(), // Ajustar nome da função se necessário
      projetosService.getTiposProjeto(), // Ajustar nome da função se necessário
      vereadoresService.getVereadores(), // Assumindo que existe essa função
    ]);
    projetos.value = projetosRes.data || [];
    tiposProjeto.value = tiposRes.data || [];
    vereadores.value = vereadoresRes.data || [];
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    toast.error('Falha ao carregar dados iniciais.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Função para obter nome do tipo pelo ID
const getTipoNome = (tipoId) => {
  const tipo = tiposProjeto.value.find(t => t.id === tipoId);
  return tipo ? tipo.nome : 'Desconhecido';
};

// Resetar formulário
const resetForm = (veeResetForm) => {
  isEditing.value = false;
  currentProject.value = {
    id: null,
    titulo: '',
    descricao: '',
    tipo_projeto_id: '',
    proponentes: [],
  };
  if (veeResetForm) {
      veeResetForm(); // Limpa o estado do formulário vee-validate
  }
};

// Submissão do formulário (Criar ou Atualizar)
const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  // Os proponentes já estão em currentProject.value.proponentes devido ao v-model
  const dataToSend = {
      titulo: values.titulo,
      descricao: values.descricao,
      tipo_projeto_id: values.tipoProjeto,
      // Incluir outros campos se houver
  };

  try {
    let savedProject;
    if (isEditing.value) {
      // Atualizar dados básicos do projeto
      const updateRes = await projetosService.updateProjeto(currentProject.value.id, dataToSend);
      savedProject = updateRes.data; // Assumindo que a API retorna o projeto atualizado
      // Atualizar proponentes (usando rota específica)
      await projetosService.updateProponentesProjeto(currentProject.value.id, currentProject.value.proponentes);
      toast.success('Projeto atualizado com sucesso!');
    } else {
      // Criar projeto
      const createRes = await projetosService.createProjeto(dataToSend);
      savedProject = createRes.data; // Assumindo que a API retorna o projeto criado com ID
      // Adicionar proponentes (usando rota específica)
      if (savedProject && savedProject.id) {
        await projetosService.updateProponentesProjeto(savedProject.id, currentProject.value.proponentes);
      } else {
         console.warn('ID do projeto não encontrado após criação para adicionar proponentes.');
      }
      toast.success('Projeto adicionado com sucesso!');
    }
    await fetchData(); // Recarregar lista
    resetForm(veeResetForm);
  } catch (error) {
    console.error('Erro ao salvar projeto:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar o projeto.');
  }
};

// Editar projeto
const editProject = async (projeto) => {
  isEditing.value = true;
  // Copia dados básicos
  currentProject.value = {
      id: projeto.id,
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      tipo_projeto_id: projeto.tipo_projeto_id,
      proponentes: [], // Inicializa vazio, busca abaixo
  };
  // Buscar proponentes atuais do projeto
  try {
      const proponentesRes = await projetosService.getProponentesProjeto(projeto.id);
      currentProject.value.proponentes = proponentesRes.data.map(p => p.vereador_id); // Assumindo que a API retorna {vereador_id: X}
  } catch (error) {
      console.error('Erro ao buscar proponentes do projeto:', error);
      toast.error('Falha ao carregar proponentes para edição.');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo para ver o form
};

// Excluir projeto
const deleteProject = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este projeto e todos os seus arquivos?')) {
    return;
  }
  try {
    await projetosService.deleteProjeto(id);
    toast.success('Projeto excluído com sucesso!');
    await fetchData(); // Recarregar lista
  } catch (error) {
    console.error('Erro ao excluir projeto:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir o projeto.');
  }
};

// --- Funções do Gerenciador de Arquivos ---

const openFileManager = async (projeto) => {
  fileManagerProject.value = projeto;
  showFileManager.value = true;
  projectFiles.value = [];
  selectedFile.value = null;
  await loadProjectFiles();
};

const closeFileManager = () => {
  showFileManager.value = false;
  fileManagerProject.value = null;
  projectFiles.value = [];
  selectedFile.value = null;
};

const loadProjectFiles = async () => {
  if (!fileManagerProject.value) return;
  loadingFiles.value = true;
  try {
    const response = await projetosService.getArquivosProjeto(fileManagerProject.value.id);
    projectFiles.value = response.data || [];
  } catch (error) {
    console.error('Erro ao carregar arquivos do projeto:', error);
    toast.error('Falha ao carregar arquivos.');
  } finally {
    loadingFiles.value = false;
  }
};

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
  if (!selectedFile.value || !fileManagerProject.value) return;
  uploadingFile.value = true;
  const formData = new FormData();
  formData.append('file', selectedFile.value);
  // Adicionar outros dados se a API exigir, ex: formData.append('descricao', '...');

  try {
    await projetosService.uploadArquivoProjeto(fileManagerProject.value.id, formData);
    toast.success('Arquivo enviado com sucesso!');
    selectedFile.value = null; // Limpa o input (visualmente)
    document.getElementById('fileUpload').value = ''; // Limpa o input (realmente)
    await loadProjectFiles(); // Recarrega a lista de arquivos
  } catch (error) {
    console.error('Erro ao enviar arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao enviar arquivo.');
  } finally {
    uploadingFile.value = false;
  }
};

const deleteFile = async (fileId) => {
  if (!fileManagerProject.value || !confirm('Tem certeza que deseja excluir este arquivo?')) {
    return;
  }
  try {
    await projetosService.deleteArquivoProjeto(fileManagerProject.value.id, fileId);
    toast.success('Arquivo excluído com sucesso!');
    await loadProjectFiles(); // Recarrega a lista de arquivos
  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir arquivo.');
  }
};

</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui */
select[multiple] {
  /* Garante que o select múltiplo tenha uma altura mínima */
  min-height: 8rem; /* Ajuste conforme necessário */
}
</style>

