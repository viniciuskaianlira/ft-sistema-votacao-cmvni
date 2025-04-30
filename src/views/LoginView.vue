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

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: usuario.value,
          password: senha.value
        })
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };
</script>