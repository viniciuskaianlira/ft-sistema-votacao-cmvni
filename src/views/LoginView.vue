<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-700">Login</h1>
      <Form @submit="login" :validation-schema="schema" class="space-y-4" v-slot="{ errors, isSubmitting }">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
          <Field
            name="username"
            type="text"
            id="username"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.username, 'focus:ring-blue-400': !errors.username }"
          />
          <ErrorMessage name="username" class="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <Field
            name="password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.password, 'focus:ring-blue-400': !errors.password }"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Mensagem de erro de login removida daqui, será tratada pelo toast -->

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // ref não é mais necessário para loginError
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from "vue-toastification"; // Importar useToast
import authService from '@/services/authService';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast(); // Inicializar o toast
// const loginError = ref(null); // Removido

const schema = yup.object({
  username: yup.string().required('O nome de usuário é obrigatório'),
  password: yup.string().required('A senha é obrigatória'),
});

const login = async (values, { setSubmitting }) => {
  // loginError.value = null; // Removido
  try {
    const response = await authService.login(values);

    authStore.setCredentials(response.data.token, response.data.user);
    toast.success("Login realizado com sucesso!"); // Adicionar toast de sucesso
    router.push('/dashboard');
  } catch (error) {
    console.error('Erro no login:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Falha no login. Verifique suas credenciais.';
    // loginError.value = errorMessage; // Removido
    toast.error(errorMessage); // Usar toast para exibir erro
  } finally {
    setSubmitting(false);
  }
};
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

