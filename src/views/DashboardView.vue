<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <p>Bem-vindo, {{ user?.nome }}!</p>
      <p>Seu cargo: {{ user?.role }}</p>
  
      <button @click="irParaSessao">Acessar Sessão</button>
      <button @click="logout">Sair</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const user = ref(JSON.parse(localStorage.getItem('user')));
  
  function irParaSessao() {
    router.push('/sessao');
  }
  
  function logout() {
    localStorage.removeItem('user');
    router.push('/');
  }
  </script>
  
  <style scoped>
  .dashboard {
    max-width: 600px;
    margin: 100px auto;
    text-align: center;
  }
  .dashboard button {
    margin: 10px;
  }
  </style>
  