<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Gerenciar Usuários</h1>

    <!-- Botão para Adicionar Novo Usuário -->
    <div class="mb-4 flex justify-end">
      <button @click="openUserModal()" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
        Adicionar Usuário
      </button>
    </div>

    <!-- Listagem de Usuários -->
    <div v-if="loadingUsers" class="text-center p-4">Carregando usuários...</div>
    <div v-else-if="users.length === 0" class="text-center p-4">Nenhum usuário cadastrado.</div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-4 border-b text-left">Nome</th>
            <th class="py-2 px-4 border-b text-left">Email</th>
            <th class="py-2 px-4 border-b text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-100">
            <td class="px-4 py-2 border-b">{{ user.nome }}</td>
            <td class="px-4 py-2 border-b">{{ user.email }}</td>
            <td class="px-4 py-2 border-b text-center space-x-2">
              <button @click="openUserModal(user)" class="text-blue-500 hover:text-blue-600 text-sm">Editar</button>
              <button @click="openPermissionsModal(user)" class="text-green-500 hover:text-green-600 text-sm">Permissões</button>
              <button @click="deleteUser(user.id)" class="text-red-500 hover:text-red-600 text-sm">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para Adicionar/Editar Usuário -->
    <div v-if="showUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="relative p-8 border w-full max-w-lg bg-white rounded">
        <h3 class="text-2xl font-bold mb-6">{{ isEditingUser ? 'Editar Usuário' : 'Adicionar Novo Usuário' }}</h3>
        <Form @submit="handleUserSubmit" :validation-schema="userSchema" v-slot="{ errors, isSubmitting }" class="space-y-4">
          <div class="mb-4">
            <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <Field
              name="nome"
              type="text"
              id="nome"
              v-model="currentUser.nome"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.nome, 'focus:ring-blue-400': !errors.nome }"
              />
            <ErrorMessage name="nome" class="text-red-500 text-sm mt-1" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Field
              name="email"
              type="email"
              id="email"
              v-model="currentUser.email"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.email, 'focus:ring-blue-400': !errors.email }"
              />
            <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha {{ isEditingUser ? '(Deixe em branco para não alterar)' : '' }}</label>
            <Field
              name="password"
              type="password"
              id="password"
              v-model="currentUser.password"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
              :class="{ 'border-red-500 focus:ring-red-400': errors.password, 'focus:ring-blue-400': !errors.password }"
              />
            <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="closeUserModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
              Cancelar
            </button>
            <button type="submit" :disabled="isSubmitting" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="isSubmitting">Salvando...</span>
              <span v-else>Salvar</span>
            </button>
          </div>
        </Form>
      </div>
    </div>

    <!-- Modal para Gerenciar Permissões -->
    <div v-if="showPermissionsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="relative p-8 border w-full max-w-xl bg-white rounded">
        <h3 class="text-2xl font-semibold mb-6">Gerenciar Permissões para {{ currentUser.nome }}</h3>
        <div v-if="loadingPermissions">Carregando permissões...</div>
        <div v-else>
          <div class="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto mb-6 pr-2">
            <div v-for="permission in allPermissions" :key="permission.id" class="flex items-center">
              <input
                type="checkbox"
                :id="`perm_${permission.id}`"
                :value="permission.id"
                v-model="currentUserPermissions" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label :for="`perm_${permission.id}`" class="ml-2 block text-sm text-gray-900">{{ permission.nome }}</label> <!-- Ajustar nome do campo se necessário -->
            </div>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="closePermissionsModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
              Cancelar
            </button>
            <button @click="handlePermissionsSubmit" :disabled="savingPermissions" class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="savingPermissions">Salvando...</span>
              <span v-else>Salvar Permissões</span>
            </button>
          </div>
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
import usuariosService from '@/services/usuariosService';
import permissionsService from '@/services/permissionsService'; // Serviço para buscar todas as permissões

const toast = useToast();
const users = ref([]);
const allPermissions = ref([]);
const loadingUsers = ref(false);
const loadingPermissions = ref(false);
const savingPermissions = ref(false);

const showUserModal = ref(false);
const showPermissionsModal = ref(false);
const isEditingUser = ref(false);
const currentUser = ref({});
const currentUserPermissions = ref([]); // Array de IDs das permissões do usuário atual

// Esquema de validação para usuário
const userSchema = computed(() => {
  return yup.object({
    nome: yup.string().required('O nome é obrigatório').max(255),
    email: yup.string().required('O email é obrigatório').email('Email inválido').max(255),
    password: yup.string().when([], {
      is: () => !isEditingUser.value, // Obrigatório apenas na criação
      then: (schema) => schema.required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
      otherwise: (schema) => schema.nullable().min(6, 'A senha deve ter pelo menos 6 caracteres'), // Opcional na edição
    }),
  });
});

// --- Funções de Usuário ---

const fetchUsers = async () => {
  loadingUsers.value = true;
  try {
    const response = await usuariosService.getAll();
    users.value = response.data || [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    toast.error('Falha ao carregar usuários.');
  } finally {
    loadingUsers.value = false;
  }
};

const openUserModal = (user = null) => {
  if (user) {
    isEditingUser.value = true;
    currentUser.value = { ...user, password: '' }; // Limpa senha para edição
  } else {
    isEditingUser.value = false;
    currentUser.value = { nome: '', email: '', password: '' };
  }
  showUserModal.value = true;
};

const closeUserModal = () => {
  showUserModal.value = false;
  currentUser.value = {};
};

const handleUserSubmit = async (values, { resetForm }) => {
  const dataToSend = {
    nome: values.nome,
    email: values.email,
  };
  // Inclui senha apenas se foi digitada (na criação ou edição)
  if (values.password) {
    dataToSend.password = values.password;
  }

  try {
    if (isEditingUser.value) {
      await usuariosService.update(currentUser.value.id, dataToSend);
      toast.success('Usuário atualizado com sucesso!');
    } else {
      await usuariosService.create(dataToSend);
      toast.success('Usuário criado com sucesso!');
    }
    await fetchUsers();
    closeUserModal();
    resetForm();
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar o usuário.');
  }
};

const deleteUser = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este usuário?')) {
    return;
  }
  try {
    await usuariosService.delete(id);
    toast.success('Usuário excluído com sucesso!');
    await fetchUsers();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir o usuário.');
  }
};

// --- Funções de Permissões ---

const fetchAllPermissions = async () => {
  try {
    const response = await permissionsService.getAll();
    allPermissions.value = response.data || [];
  } catch (error) {
    console.error('Erro ao buscar todas as permissões:', error);
    toast.error('Falha ao carregar lista de permissões.');
  }
};

const openPermissionsModal = async (user) => {
  currentUser.value = { ...user };
  showPermissionsModal.value = true;
  loadingPermissions.value = true;
  currentUserPermissions.value = [];
  try {
    // Busca permissões atuais do usuário
    const response = await usuariosService.getUserPermissions(user.id);
    // Assumindo que a resposta é um array de objetos de permissão ou apenas IDs
    currentUserPermissions.value = (response.data || []).map(p => p.id || p); 

    // Busca todas as permissões se ainda não foram carregadas
    if (allPermissions.value.length === 0) {
      await fetchAllPermissions();
    }
  } catch (error) {
    console.error(`Erro ao buscar permissões para ${user.nome}:`, error);
    toast.error(`Falha ao carregar permissões para ${user.nome}.`);
    closePermissionsModal(); // Fecha modal em caso de erro
  } finally {
    loadingPermissions.value = false;
  }
};

const closePermissionsModal = () => {
  showPermissionsModal.value = false;
  currentUser.value = {};
  currentUserPermissions.value = [];
};

const handlePermissionsSubmit = async () => {
  savingPermissions.value = true;
  try {
    await usuariosService.updateUserPermissions(currentUser.value.id, currentUserPermissions.value);
    toast.success(`Permissões de ${currentUser.value.nome} atualizadas com sucesso!`);
    closePermissionsModal();
  } catch (error) {
    console.error('Erro ao salvar permissões:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar permissões.');
  } finally {
    savingPermissions.value = false;
  }
};

// --- Lifecycle Hook ---
onMounted(() => {
  fetchUsers();
  // fetchAllPermissions(); // Pode carregar aqui ou sob demanda no modal
});

</script>
