<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-700">Login</h1>

      <Form
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting, handleSubmit }"
        class="space-y-4"
      >
        <!-- Campo Usuário-->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
            Usuário
          </label>
          <Field
            name="username"
            type="text"
            id="username"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{
              'border-red-500 focus:ring-red-400': errors.username,
              'focus:ring-blue-400': !errors.username
            }"
          />
          <ErrorMessage name="username" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Campo Senha -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <Field
            name="password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{
              'border-red-500 focus:ring-red-400': errors.password,
              'focus:ring-blue-400': !errors.password
            }"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Botão de submit -->
        <button
          type="button"
          :disabled="isSubmitting"
          @click="handleSubmit(onSubmit)"
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
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import authService from '@/services/authService'
import { useAuthStore } from '@/store/auth'

// instâncias
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// schema de validação
const schema = yup.object({
  username: yup.string().required('O nome de usuário é obrigatório'),
  password: yup.string().required('A senha é obrigatória'),
})

// função de submissão
async function onSubmit(values) {
  try {
    const { data } = await authService.login(values)
    // guarda token e usuário no store
    // authStore.setCredentials(data.user, data.token)
    // também salva no localStorage para o guard de rota
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)

    toast.success('Login realizado com sucesso!')
    // redireciona para a rota nomeada 'Dashboard'
    await router.push({ name: 'Dashboard' })
  }
  catch (error) {
    console.error('Erro no login ou navegação:', error)
    const msg =
      error.response?.data?.message ||
      error.message ||
      'Falha no login. Verifique suas credenciais.'
    toast.error(msg)
  }
}
</script>
<style>
</style>
