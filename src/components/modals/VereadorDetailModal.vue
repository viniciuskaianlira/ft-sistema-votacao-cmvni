<template>
    <transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg w-11/12 max-w-2xl p-6 relative">
          <button
            @click="close"
            class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            aria-label="Fechar"
          >
            ✖️
          </button>
  
          <h2 class="text-xl font-semibold mb-4">
            Detalhes de {{ vereadorData.nome || '---' }}
          </h2>
  
          <!-- Informações principais -->
          <div class="grid grid-cols-2 gap-4">
            <div><strong>Partido:</strong> {{ vereadorData.partido || '—' }}</div>
            <div><strong>Email:</strong> {{ vereadorData.email || '—' }}</div>
            <div><strong>Telefone:</strong> {{ vereadorData.telefone || '—' }}</div>
          </div>
  
          <!-- Legislaturas -->
          <div class="mt-6">
            <h3 class="font-semibold mb-2">Legislaturas</h3>
            <ul class="list-disc list-inside">
              <li v-for="leg in legislaturas" :key="leg.id">{{ leg.nome }}</li>
              <li v-if="legislaturas.length === 0" class="text-gray-500">Nenhuma registrada</li>
            </ul>
          </div>
  
          <!-- Projetos -->
          <div class="mt-6">
            <h3 class="font-semibold mb-2">Projetos</h3>
            <ul class="list-disc list-inside">
              <li v-for="proj in projetos" :key="proj.id">{{ proj.titulo }}</li>
              <li v-if="projetos.length === 0" class="text-gray-500">Nenhum registrado</li>
            </ul>
          </div>
  
          <!-- Indicações -->
          <div class="mt-6">
            <h3 class="font-semibold mb-2">Indicações</h3>
            <ul class="list-disc list-inside">
              <li v-for="ind in indicacoes" :key="ind.id">{{ ind.titulo }}</li>
              <li v-if="indicacoes.length === 0" class="text-gray-500">Nenhuma registrada</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import axios from 'axios'
  
  const props = defineProps({
    visible:      { type: Boolean, required: true },
    vereadorId:   { type: [String, Number], required: true }
  })
  const emit = defineEmits(['update:visible'])
  
  const vereadorData = ref({})
  const legislaturas = ref([])
  const projetos     = ref([])
  const indicacoes   = ref([])
  
  async function fetchDetails() {
    try {
      const token = localStorage.getItem('token')
      const [vRes, lRes, pRes, iRes] = await Promise.all([
        axios.get(`/api/vereador/${props.vereadorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`/api/vereador/${props.vereadorId}/legislaturas`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`/api/vereador/${props.vereadorId}/projetos`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`/api/vereador/${props.vereadorId}/indicacoes`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])
  
      vereadorData.value = vRes.data || {}
      legislaturas.value = Array.isArray(lRes.data) ? lRes.data : []
      projetos.value     = Array.isArray(pRes.data) ? pRes.data : []
      indicacoes.value   = Array.isArray(iRes.data) ? iRes.data : []
    } catch (e) {
      console.error('Erro ao buscar detalhes do vereador:', e)
    }
  }
  
  watch(
    () => props.visible,
    (open) => { if (open) fetchDetails() }
  )
  
  function close() {
    emit('update:visible', false)
  }
  </script>
  
  <style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.2s;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  </style>
  