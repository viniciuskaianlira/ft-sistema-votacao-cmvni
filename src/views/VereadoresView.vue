<template>
  <div class="p-6 bg-white min-h-full">
    <h1 class="text-2xl font-semibold mb-6">Gerenciar Vereadores</h1>

    <!-- Formulário para Adicionar/Editar Vereador -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Vereador' : 'Adicionar Novo Vereador' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <Field
              name="nome"
              type="text"
              id="nome"
              v-model="currentVereador.nome"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.nome, 'focus:ring-blue-400': !errors.nome }"
            />
            <ErrorMessage name="nome" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="nome_urna" class="block text-sm font-medium text-gray-700 mb-1">Nome de Urna</label>
            <Field
              name="nome_urna"
              type="text"
              id="nome_urna"
              v-model="currentVereador.nome_urna"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.nome_urna, 'focus:ring-blue-400': !errors.nome_urna }"
            />
            <ErrorMessage name="nome_urna" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label for="partido" class="block text-sm font-medium text-gray-700 mb-1">Partido</label>
            <Field
              name="partido"
              type="text"
              id="partido"
              v-model="currentVereador.partido"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.partido, 'focus:ring-blue-400': !errors.partido }"
            />
            <ErrorMessage name="partido" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Field
              name="email"
              type="email"
              id="email"
              v-model="currentVereador.email"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.email, 'focus:ring-blue-400': !errors.email }"
            />
            <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="telefone" class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <Field
              name="telefone"
              type="tel"
              id="telefone"
              v-model="currentVereador.telefone"
              placeholder="(XX) XXXXX-XXXX"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.telefone, 'focus:ring-blue-400': !errors.telefone }"
            />
            <ErrorMessage name="telefone" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="mb-4">
          <label for="biografia" class="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
          <Field
            name="biografia"
            as="textarea"
            id="biografia"
            rows="3"
            v-model="currentVereador.biografia"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.biografia, 'focus:ring-blue-400': !errors.biografia }"
          />
          <ErrorMessage name="biografia" class="text-red-500 text-sm mt-1" />
        </div>
        
        <!-- Adicionar campo para foto, se necessário -->

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
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Adicionar Vereador' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Vereadores -->
    <h2 class="text-xl font-semibold mb-4">Vereadores Cadastrados</h2>
    <div v-if="loading">Carregando vereadores...</div>
    <div v-else-if="vereadores.length === 0">Nenhum vereador cadastrado.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="vereador in vereadores" :key="vereador.id" class="p-4 border rounded-lg shadow-sm">
        <h3 class="font-semibold text-lg">{{ vereador.nome_urna }}</h3>
        <p class="text-sm text-gray-700">{{ vereador.nome }}</p>
        <p class="text-sm text-gray-500">Partido: {{ vereador.partido }}</p>
        <p class="text-sm text-gray-500">Email: {{ vereador.email || '-' }}</p>
        <p class="text-sm text-gray-500">Telefone: {{ vereador.telefone || '-' }}</p>
        <div class="mt-3 pt-3 border-t flex justify-end space-x-2">
          <button @click="editVereador(vereador)" class="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
          <button @click="deleteVereador(vereador.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
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
import vereadoresService from '@/services/vereadoresService';

const toast = useToast();
const vereadores = ref([]);
const loading = ref(false);
const isEditing = ref(false);
const currentVereador = ref({
  id: null,
  nome: '',
  nome_urna: '',
  partido: '',
  email: '',
  telefone: '',
  biografia: '',
  // foto_url: '', // Se houver campo de foto
});

// Esquema de validação
const schema = yup.object({
  nome: yup.string().required('O nome completo é obrigatório').max(255),
  nome_urna: yup.string().required('O nome de urna é obrigatório').max(100),
  partido: yup.string().required('O partido é obrigatório').max(50),
  email: yup.string().email('Email inválido').nullable().max(255),
  telefone: yup.string().nullable().max(20), // Adicionar validação de formato se necessário
  biografia: yup.string().nullable(),
});

// Buscar dados iniciais
const fetchData = async () => {
  loading.value = true;
  try {
    const response = await vereadoresService.getAll();
    vereadores.value = response.data || [];
  } catch (error) {
    console.error('Erro ao buscar vereadores:', error);
    toast.error('Falha ao carregar vereadores.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Resetar formulário
const resetForm = () => {
  isEditing.value = false;
  currentVereador.value = {
    id: null,
    nome: '',
    nome_urna: '',
    partido: '',
    email: '',
    telefone: '',
    biografia: '',
  };
};

// Submissão do formulário (Criar ou Atualizar)
const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  const dataToSend = {
    nome: values.nome,
    nome_urna: values.nome_urna,
    partido: values.partido,
    email: values.email || null, // Enviar null se vazio
    telefone: values.telefone || null,
    biografia: values.biografia || null,
  };

  try {
    if (isEditing.value) {
      await vereadoresService.update(currentVereador.value.id, dataToSend);
      toast.success('Vereador atualizado com sucesso!');
    } else {
      await vereadoresService.create(dataToSend);
      toast.success('Vereador adicionado com sucesso!');
    }
    await fetchData();
    resetForm();
    veeResetForm();
  } catch (error) {
    console.error('Erro ao salvar vereador:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar o vereador.');
  }
};

// Editar vereador
const editVereador = (vereador) => {
  isEditing.value = true;
  currentVereador.value = { ...vereador }; 
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Excluir vereador
const deleteVereador = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este vereador?')) {
    return;
  }
  try {
    await vereadoresService.delete(id);
    toast.success('Vereador excluído com sucesso!');
    await fetchData();
  } catch (error) {
    console.error('Erro ao excluir vereador:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir o vereador.');
  }
};

</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui */
</style>

