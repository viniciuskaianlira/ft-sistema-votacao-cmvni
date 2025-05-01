<template>
    <div class="sessao">
      <h1>Sessão Legislativa</h1>
      <p>Olá, {{ user?.nome }}! Cargo: {{ user?.role }}</p>
  
      <div v-if="isAuthorized">
        <h2>Controle de Sessão</h2>
        <p>Iniciar, encerrar, gerenciar votações...</p>
      </div>
      <div v-else>
        <p>Você não tem permissão para controlar a sessão.</p>
      </div>
  
      <button @click="voltar">Voltar</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const user = ref(JSON.parse(localStorage.getItem('user')));
  const isAuthorized = user.value && (user.value.role === 'presidente' || user.value.role === 'secretario');
  
  function voltar() {
    router.push('/dashboard');
  }
  </script>
  
  <style scoped>
  .sessao {
    max-width: 600px;
    margin: 100px auto;
    text-align: center;
  }
  .sessao button {
    margin-top: 20px;
  }
  </style>
  