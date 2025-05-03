<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Lista de Vereadores</h1>

    <DataTable
      :key="reloadKey"
      endpoint="http://localhost:3000/api/vereador"
      :columns="columns"
      :showActions="true"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <!-- Modal de detalhes -->
    <VereadorDetailModal
      v-if="showModal"
      v-model:visible="showModal"
      :vereador-id="selectedVereadorId.value"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import vereadoresService from '@/services/vereadoresService'
import DataTable from '@/components/tables/DataTable.vue'
import VereadorDetailModal from '@/components/modals/VereadorDetailModal.vue'

const toast = useToast()

// Definição das colunas da tabela
const columns = [
  { label: 'ID',      field: 'id' },
  { label: 'Nome',    field: 'nome' },
  { label: 'Partido', field: 'partido' },
  { label: 'Ativo',   field: 'ativo' }
]

// Chave reativa para forçar reload no DataTable
const reloadKey = ref(0)
// Controle do modal e ID selecionado
const showModal = ref(false)
const selectedVereadorId = ref(null)

// Ações disparadas pelos botões na coluna "Ação"
function onView(row) {
  selectedVereadorId.value = row.id
  showModal.value = true
}

function onEdit(row) {
  console.log('Editar vereador:', row)
}

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir este vereador?')) return
  try {
    await vereadoresService.delete(row.id)
    toast.success('Vereador excluído com sucesso!')
    reloadKey.value++
  } catch (err) {
    console.error('Erro ao excluir vereador:', err)
    toast.error(err.response?.data?.message || 'Falha ao excluir o vereador.')
  }
}
</script>

<style scoped>
/* estilos adicionais, se necessário */
</style>
