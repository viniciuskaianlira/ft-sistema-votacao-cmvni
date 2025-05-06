<template>
  <div class="flex items-center justify-center h-screen bg-gray-50">
    <div class="text-center p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-2xl text-gray-600 mb-6">Página não encontrada</p>
      <button
        @click="goBack"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Voltar para página anterior
      </button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/store/auth'

  const router = useRouter()
  const auth = useAuthStore()

  function goBack() {
    router.back() 
  }

  onMounted(() => {
    // Se houver token válido (ou alguma checagem extra), volta à página anterior
    if (auth.token) {
      router.back() // ou router.go(-1)
    }
  })
</script>
