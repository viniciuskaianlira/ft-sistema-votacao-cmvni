<!-- src/views/MesaDiretoraView.vue -->
<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Mesa Diretora</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Novo Membro
      </button>
    </div>

    <BaseList
      :key="reloadKey"
      endpoint="/mesa-diretora"
      :columns="columns"
      :showActions="true"
      :filterableFields="['vereador.nome', 'cargo']"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <!-- Detalhes -->
    <BaseDetail
      v-model:visible="showModal"
      resource-endpoint="/mesa-diretora"
      :resource-id="selectedMesaDiretoraId"
      title-field="id"
      :fields="detailFields"
      :sections="detailSections"
    />

    <!-- Criação -->
    <BaseFormCreate
      v-model:visible="showCreate"
      endpoint="/mesa-diretora"
      :fields="createFields"
      title="Novo Membro da Mesa Diretora"
      @saved="onCreated"
    />

    <!-- Edição via modal interno -->
    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Membro da Mesa Diretora"
      endpoint="/mesa-diretora"
      :record-id="selectedMesaDiretoraId"
      :fields="editFields"
      @saved="onEdited"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import BaseList from '@/components/crud/BaseList.vue'
import BaseDetail from '@/components/crud/BaseDetail.vue'
import BaseFormCreate from '@/components/crud/BaseFormCreate.vue'
import BaseFormEdit from '@/components/crud/BaseFormEdit.vue'

import mesaDiretoraService from '@/services/mesaDiretoraService'

const toast = useToast()

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Vereador', field: 'vereador.nome' },
  { label: 'Cargo', field: 'cargo' },
  { label: 'Legislatura', field: 'legislatura.numero' },
]

const reloadKey = ref(0)
const showModal = ref(false)
const showCreate = ref(false)
const showEdit = ref(false)
const selectedMesaDiretoraId = ref(null)

const createFields = [
  {
    name: 'vereador_id',
    label: 'Vereador',
    type: 'select',
    optionsEndpoint: '/vereador',
    optionsValueKey: 'id',
    optionsLabelKey: 'nome',
  },
  { name: 'cargo', label: 'Cargo', type: 'text', placeholder: 'Digite o cargo' },
  {
    name: 'legislatura_id',
    label: 'Legislatura',
    type: 'select',
    optionsEndpoint: '/legislatura',
    optionsValueKey: 'id',
    optionsLabelKey: 'numero',
  },
]

const editFields = [
  { name: 'cargo', label: 'Cargo', type: 'text', placeholder: 'Digite o cargo' },
  {
    name: 'legislatura_id',
    label: 'Legislatura',
    type: 'select',
    optionsEndpoint: '/legislatura',
    optionsValueKey: 'id',
    optionsLabelKey: 'numero',
  },
]

const detailFields = [
  { label: 'Vereador', key: 'vereador.nome' },
  { label: 'Cargo', key: 'cargo' },
  { label: 'Legislatura', key: 'legislatura.numero' },
]

const detailSections = []

// ---- Ações ----

function onView(row) {
  selectedMesaDiretoraId.value = row.id
  showModal.value = true
}

function onEdit(row) {
  selectedMesaDiretoraId.value = row.id
  showEdit.value = true
}

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir este membro da Mesa Diretora?'))
    return
  try {
    await mesaDiretoraService.delete(row.id)
    toast.success('Membro da Mesa Diretora excluído com sucesso!')
    reloadKey.value++
  } catch (err) {
    console.error(err)
    toast.error(err.response?.data?.message || 'Erro ao excluir o membro.')
  }
}

function onCreated() {
  toast.success('Membro da Mesa Diretora criado com sucesso!')
  reloadKey.value++
  showCreate.value = false
}

function onEdited() {
  toast.success('Membro da Mesa Diretora atualizado com sucesso!')
  reloadKey.value++
  showEdit.value = false
}

function onError(err) {
  console.error(err)
  toast.error('Erro ao carregar ou salvar o membro da Mesa Diretora.')
}
</script>

<style>
button {
  cursor: pointer;
}
</style>
