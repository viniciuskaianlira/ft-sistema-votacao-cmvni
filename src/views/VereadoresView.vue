<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Lista de Vereadores</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Novo Vereador
      </button>
    </div>

    <DataTable
      :key="reloadKey"
      endpoint="http://localhost:3000/api/vereador"
      :columns="columns"
      :showActions="true"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <!-- Modal de detalhes existente -->
    <VereadorDetailModal
      v-if="showModal"
      v-model:visible="showModal"
      :vereador-id="selectedVereadorId"
    />

    <!-- Novo Modal de criação -->
    <DynamicFormModal
      v-model:visible="showCreate"
      :fields="createFields"
      endpoint="http://localhost:3000/api/vereador"
      title="Novo Vereador"
      @saved="onCreated"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import vereadoresService from '@/services/vereadoresService'
import DataTable from '@/components/tables/DataTable.vue'
import VereadorDetailModal from '@/components/modals/VereadorDetailModal.vue'
import DynamicFormModal from '@/components/modals/DynamicFormModal.vue'

const toast = useToast()

// Colunas da tabela
const columns = [
  { label: 'ID',      field: 'id' },
  { label: 'Nome',    field: 'nome' },
  { label: 'Partido', field: 'partido' },
  { label: 'Ativo',   field: 'ativo' }
]

// Para recarregar a DataTable após ações
const reloadKey = ref(0)

// Controle do modal de detalhes
const showModal = ref(false)
const selectedVereadorId = ref(null)

// Controle do modal de criação
const showCreate = ref(false)

// Definição dinâmica dos campos para criar um vereador
const createFields = [
  { label: 'Nome Completo',     field: 'nome', type: 'text' },
  { label: 'Usuário',           field: 'username', type: 'text' },
  { label: 'Senha Temporária',  field: 'password', type: 'text'},
  { label: 'Partido',           field: 'partido', type: 'text'},
  { label: 'Sigla do Partido',  field: 'sigla_partido', type: 'text' },
  { label: 'Legislatura',      field: 'legislatura_id', type: 'select',
    optionEndpoint: 'http://localhost:3000/api/legislatura',
    optionValue: 'id',
    optionLabel: 'numero'
   }
]


// Ações da coluna "Ação"
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

// Callback disparado quando o DynamicFormModal salva com sucesso
function onCreated(newVereador) {
  toast.success('Vereador criado com sucesso!')
  reloadKey.value++     // força recarga da tabela
  showCreate.value = false
}
</script>

<style scoped>
/* ajustes finos, se necessário */
</style>
