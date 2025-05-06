<!-- src/views/VotacaoView.vue -->
<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Votação</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Nova Votação
      </button>
    </div>

    <DataTable
      :key="reloadKey"
      endpoint="/votacoes"
      :columns="columns"
      :showActions="true"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <!-- Criação -->
    <DynamicFormModal
      v-model:visible="showCreate"
      endpoint="/votacoes"
      :fields="createFields"
      title="Nova Votação"
      @saved="onCreated"
    />

    <!-- Edição via RegistroEditor com modal interno -->
    <RegistroEditor
      v-model:visible="showEdit"
      title="Editar Votação"
      endpoint="/votacoes"
      :recordId="selectedVotacaoId"
      :fields="editFields"
      @saved="onEdited"
      @error="onErro"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import DataTable from '@/components/tables/DataTable.vue'
import DynamicFormModal from '@/components/modals/DynamicFormModal.vue'
import RegistroEditor from '@/components/forms/RegistroEditor.vue'

const toast = useToast()

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Sessão ID', field: 'sessao_id' },
  { label: 'Item ID', field: 'item_id' },
  { label: 'Vereador ID', field: 'vereador_id' },
  { label: 'Voto', field: 'voto' },
  { label: 'Data Voto', field: 'data_voto' }
]

const reloadKey = ref(0)
const showCreate = ref(false)
const showEdit = ref(false)
const selectedVotacaoId = ref(null)

const createFields = [
  { name: 'sessao_id', label: 'Sessão ID', type: 'number', placeholder: 'Digite o ID da Sessão' },
  { name: 'item_id', label: 'Item ID', type: 'number', placeholder: 'Digite o ID do Item' },
  { name: 'vereador_id', label: 'Vereador ID', type: 'number', placeholder: 'Digite o ID do Vereador' },
  { name: 'voto', label: 'Voto', type: 'text', placeholder: 'Digite o Voto' },
  { name: 'data_voto', label: 'Data Voto', type: 'date', placeholder: 'Digite a Data do Voto' },
]

const editFields = [
  { name: 'sessao_id', label: 'Sessão ID', type: 'number', placeholder: 'Digite o ID da Sessão' },
  { name: 'item_id', label: 'Item ID', type: 'number', placeholder: 'Digite o ID do Item' },
  { name: 'vereador_id', label: 'Vereador ID', type: 'number', placeholder: 'Digite o ID do Vereador' },
  { name: 'voto', label: 'Voto', type: 'text', placeholder: 'Digite o Voto' },
  { name: 'data_voto', label: 'Data Voto', type: 'date', placeholder: 'Digite a Data do Voto' },
]

// ---- Ações ----

function onView(row) {
  console.log('View:', row)
}

function onEdit(row) {
  console.log('Edit:', row)
  selectedVotacaoId.value = row.id
  showEdit.value = true
}

async function onDelete(row) {
  console.log('Delete:', row)
  if (!confirm('Tem certeza que deseja excluir esta votação?')) return
  try {
    // await votacaoService.delete(row.id)
    toast.success('Votação excluída com sucesso!')
    reloadKey.value++
  } catch (err) {
    console.error(err)
    toast.error(err.response?.data?.message || 'Erro ao excluir a votação.')
  }
}

function onCreated() {
  toast.success('Votação criada com sucesso!')
  reloadKey.value++
  showCreate.value = false
}

function onEdited() {
  toast.success('Votação atualizada com sucesso!')
  reloadKey.value++
  showEdit.value = false
}

function onErro(err) {
  console.error(err)
  toast.error('Erro ao carregar ou salvar a votação.')
}
</script>
