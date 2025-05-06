<template>
    <div class="flex items-center justify-center h-screen bg-gray-50">
      <div class="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p class="text-2xl text-gray-600 mb-6">Página não encontrada</p>
        <button
          @click="goHome"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Voltar para o início
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  function goHome() {
    router.push('/')
  }
  </script>

  