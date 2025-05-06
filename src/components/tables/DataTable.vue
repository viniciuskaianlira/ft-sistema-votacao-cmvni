<template>
  <div>
    <!-- Estado de loading -->
    <div v-if="loading" class="text-center p-4">Carregando dados...</div>
    
    <!-- Estado de erro -->
    <div v-else-if="error" class="text-red-500 p-4">
      Erro ao carregar dados.
    </div>

    <!-- Tabela e filtro -->
    <div v-else>
      <div class="flex items-center justify-between mb-4">
        <div v-if="filterableFields && filterableFields.length">
          <input
            type="text"
            v-model="filterText"
            placeholder="Filtrar por nome ou partido..."
            class="border border-gray-300 rounded px-2 py-1"
          />
        </div>
      </div>

      <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th
              v-for="col in allColumns"
              :key="col.field"
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in filteredRows"
            :key="rowIndex"
            class="hover:bg-gray-50"
          >
            <td
              v-for="col in allColumns"
              :key="col.field"
              class="px-4 py-2 text-sm text-gray-800 border-b"
            >
              <template v-if="col.field === '__actions'">
                <div class="flex space-x-2">
                  <button @click="$emit('view', row)" title="Ver" class="p-1 hover:bg-gray-100 rounded">
                    👁️
                  </button>
                  <button @click="$emit('edit', row)" title="Editar" class="p-1 hover:bg-gray-100 rounded">
                    ✏️
                  </button>
                  <button @click="$emit('delete', row)" title="Excluir" class="p-1 hover:bg-gray-100 rounded">
                    🗑️
                  </button>
                </div>
              </template>
              <template v-else>
                {{ row[col.field] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import api from '@/services/api.js'
import { useToast } from 'vue-toastification'

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  endpoint: {
    type: String,
    required: true
  },
  showActions: {
    type: Boolean,
    default: false
  },
  filterableFields: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['view', 'edit', 'delete'])
const rows = ref([])
const loading = ref(false)
const error = ref(false)
const toast = useToast()
const filterText = ref('')
const filteredRows = ref([])

const baseColumns = computed(() => {
  if (props.columns.length) return props.columns
  if (rows.value.length) {
    return Object.keys(rows.value[0]).map(key => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      field: key
    }))
  }
  return []
})

const allColumns = computed(() => {
  const cols = [...baseColumns.value]
  if (props.showActions) {
    cols.push({ label: 'Ação', field: '__actions' })
  }
  return cols
})

async function fetchData() {
  loading.value = true
  error.value = false
  try {
    const response = await api.get(props.endpoint)
    const data = response.data
    rows.value = Array.isArray(data) ? data : data.data || []
    filteredRows.value = [...rows.value]
  } catch (err) {
    error.value = true
    toast.error('Erro ao carregar dados: ' + (err.response?.data?.message || err.message))
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
watch(() => props.endpoint, fetchData)

watch(filterText, newValue => {
  if (!newValue) {
    filteredRows.value = [...rows.value]
    return
  }
  const lc = newValue.toLowerCase()
  filteredRows.value = rows.value.filter(row =>
    props.filterableFields.some(f => String(row[f]).toLowerCase().includes(lc))
  )
})
</script>

<style scoped>
/* Adicione estilos personalizados, se precisar */
</style>
