<template>
  <div class="p-6 bg-white min-h-full">
    <h1 class="text-2xl font-semibold mb-6">Gerenciar Projetos</h1>

    <!-- Formulário para Adicionar/Editar Projeto -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Projeto' : 'Adicionar Novo Projeto' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
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
        
        <!-- Adicionar campos para proponentes, arquivos, etc. conforme necessário -->

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
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Adicionar Projeto' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Projetos (Exemplo) -->
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
          <button @click="editProject(projeto)" class="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
          <button @click="deleteProject(projeto.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import projetosService from '@/services/projetosService';

const toast = useToast();
const projetos = ref([]);
const tiposProjeto = ref([]);
const loading = ref(false);
const isEditing = ref(false);
const currentProject = ref({
  id: null,
  titulo: '',
  descricao: '',
  tipo_projeto_id: '',
  // Adicionar outros campos conforme modelo do backend
});

// Esquema de validação
const schema = yup.object({
  titulo: yup.string().required('O título é obrigatório').max(255, 'O título deve ter no máximo 255 caracteres'),
  tipoProjeto: yup.number().required('Selecione o tipo de projeto'),
  descricao: yup.string().required('A descrição é obrigatória'),
});

// Buscar dados iniciais
const fetchData = async () => {
  loading.value = true;
  try {
    const [projetosRes, tiposRes] = await Promise.all([
      projetosService.getAll(),
      projetosService.getTipos(),
    ]);
    projetos.value = projetosRes.data || [];
    tiposProjeto.value = tiposRes.data || [];
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    toast.error('Falha ao carregar dados dos projetos.');
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
const resetForm = () => {
  isEditing.value = false;
  currentProject.value = {
    id: null,
    titulo: '',
    descricao: '',
    tipo_projeto_id: '',
  };
  // Idealmente, usar a função resetForm do vee-validate se disponível no contexto
};

// Submissão do formulário (Criar ou Atualizar)
const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  const dataToSend = {
      ...currentProject.value, // Pega ID se estiver editando
      titulo: values.titulo,
      descricao: values.descricao,
      tipo_projeto_id: values.tipoProjeto,
      // Mapear outros campos se necessário
  };

  try {
    if (isEditing.value) {
      // Atualizar
      await projetosService.update(currentProject.value.id, dataToSend);
      toast.success('Projeto atualizado com sucesso!');
    } else {
      // Criar
      await projetosService.create(dataToSend);
      toast.success('Projeto adicionado com sucesso!');
    }
    await fetchData(); // Recarregar lista
    resetForm();
    veeResetForm(); // Limpa o estado do formulário vee-validate
  } catch (error) {
    console.error('Erro ao salvar projeto:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar o projeto.');
  }
};

// Editar projeto
const editProject = (projeto) => {
  isEditing.value = true;
  currentProject.value = { ...projeto }; // Copia os dados para o formulário
  // Ajustar o nome do campo tipoProjeto para o select
  currentProject.value.tipo_projeto_id = projeto.tipo_projeto_id;
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo para ver o form
};

// Excluir projeto
const deleteProject = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este projeto?')) {
    return;
  }
  try {
    await projetosService.delete(id);
    toast.success('Projeto excluído com sucesso!');
    await fetchData(); // Recarregar lista
  } catch (error) {
    console.error('Erro ao excluir projeto:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir o projeto.');
  }
};

</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui */
</style>

