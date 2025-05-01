<template>
    <div>
      <h2 class="text-xl font-semibold mb-4">Próximas Sessões</h2>
  
      <div v-if="loading" class="text-gray-600">Carregando sessões...</div>
  
      <div v-else>
        <table class="min-w-full bg-white border-collapse">
          <thead>
            <tr class="bg-gray-200">
              <th class="py-2 px-4 text-left">Sessão Nº</th>
              <th class="py-2 px-4 text-left">Data</th>
              <th class="py-2 px-4 text-left">Horário</th>
              <th class="py-2 px-4 text-left">Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sessao in sessoes" :key="sessao.id" class="border-t">
              <td class="py-2 px-4">{{ sessao.numero }}</td>
              <td class="py-2 px-4">{{ formatDate(sessao.data_sessao) }}</td>
              <td class="py-2 px-4">{{ formatTime(sessao.data_sessao) }}</td>
              <td class="py-2 px-4 capitalize">{{ sessao.tipo.toLowerCase() }}</td>
            </tr>
          </tbody>
        </table>
  
        <div v-if="!sessoes.length" class="text-gray-600 mt-4">
          Nenhuma sessão encontrada.
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const sessoes = ref([])
  const loading = ref(false)
  
  function formatDate(datetime) {
    const date = new Date(datetime)
    return date.toLocaleDateString()
  }
  
  function formatTime(datetime) {
    const date = new Date(datetime)
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  async function fetchSessoes() {
    loading.value = true
    try {
      const token = localStorage.getItem('token')
      const url = 'http://localhost:3000/api/sessao_legislativa'
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(url, config)
      sessoes.value = response.data
    } catch (err) {
      console.error('Erro ao buscar sessões:', err)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    fetchSessoes()
  })
  </script>
  
  <style scoped>
  /* Todo o estilo está via Tailwind; nada extra aqui */
  </style>
  