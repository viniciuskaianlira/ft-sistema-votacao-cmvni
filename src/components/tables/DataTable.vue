<template>
    <div>
      <div v-if="loading" class="text-center p-4">Carregando dados...</div>
      <div v-else-if="error" class="text-red-500 p-4">Erro ao carregar dados.</div>
  
      <table
        v-else
        class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden"
      >
        <thead class="bg-gray-100">
          <tr>
            <th
              v-for="col in derivedColumns"
              :key="col.field"
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="hover:bg-gray-50"
          >
            <td
              v-for="col in derivedColumns"
              :key="col.field"
              class="px-4 py-2 text-sm text-gray-800 border-b"
            >
              {{ row[col.field] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import axios from 'axios'
  import { useToast } from 'vue-toastification'
  
  const props = defineProps({
    /**
     * Array de colunas: { label: string, field: string }
     * Se vazio, gera dinamicamente a partir das chaves do primeiro registro.
     */
    columns: {
      type: Array,
      default: () => []
    },
    /** URL da API para buscar os dados */
    endpoint: {
      type: String,
      required: true
    }
  })
  
  const rows = ref([])
  const loading = ref(false)
  const error = ref(false)
  const toast = useToast()
  
  // Gera colunas dinamicamente se props.columns vazio
  const derivedColumns = computed(() => {
    if (props.columns.length) {
      return props.columns
    }
    if (rows.value.length) {
      return Object.keys(rows.value[0]).map(key => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        field: key
      }))
    }
    return []
  })
  
  async function fetchData() {
    loading.value = true
    error.value = false
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(props.endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      })
      rows.value = Array.isArray(response.data)
        ? response.data
        : response.data.data || []
    } catch (err) {
      error.value = true
      toast.error('Erro ao carregar dados: ' + (err.response?.data?.message || err.message))
    } finally {
      loading.value = false
    }
  }
  
  onMounted(fetchData)
  watch(() => props.endpoint, fetchData)
  </script>
  
  <style scoped>
  /* Adicione estilos personalizados, se precisar */
  </style>
  