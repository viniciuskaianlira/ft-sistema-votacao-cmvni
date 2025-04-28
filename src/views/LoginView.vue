<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-700">Login</h1>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="usuario" class="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
          <input
            v-model="usuario"
            type="text"
            id="usuario"
            required
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label for="senha" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input
            v-model="senha"
            type="password"
            id="senha"
            required
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const usuario = ref('');
const senha = ref('');

function login() {
  // Aqui você pode fazer validação de usuário e senha real depois
  if (usuario.value.trim() && senha.value.trim()) {
    const user = {
      id: Date.now(),
      nome: usuario.value,
      role: 'user', // Você pode mudar conforme sua lógica
      token: 'fake-jwt-token'
    };

    localStorage.setItem('user', JSON.stringify(user));
    router.push('/dashboard');
  } else {
    alert('Preencha todos os campos.');
  }
}
</script>
