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

    <!-- Edição -->
    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Membro da Mesa Diretora"
      endpoint="/mesa-diretora"
      :record-id="selectedMesaDiretoraId"
      :fields="createFields"
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
  { label: 'ID',            field: 'id' },
  { label: 'Legislatura',   field: 'legislatura' },
  { label: 'Ano da Legislatura',   field: 'ano_legislatura' },
]

const reloadKey                = ref(0)
const showModal                = ref(false)
const showCreate               = ref(false)
const showEdit                 = ref(false)
const selectedMesaDiretoraId   = ref(null)

const anoLegislatura = [
  { value: '1', label: 'Primeiro ano' },
  { value: '2', label: 'Segundo ano' },
  { value: '3', label: 'Terceiro ano' },
  { value: '4', label: 'Quarto ano' },
]

const createFields = [
  {
    name: 'legislatura_id',
    label: 'Legislatura',
    type: 'select',
    optionsEndpoint: '/legislatura',
    optionsValueKey: 'id',
    optionsLabelKey: 'numero',
  },
  {
    name: 'presidente_id',
    label: 'Presidente',
    type: 'select',
    optionsEndpoint: '/vereador',
    optionsValueKey: 'id',
    optionsLabelKey: 'nome',
  },
  {
    name: 'vice_presidente',
    label: 'Vice-Presidente',
    type: 'select',
    optionsEndpoint: '/vereador',
    optionsValueKey: 'id',
    optionsLabelKey: 'nome',
  },
  {
    name: 'primeiro_secretario',
    label: 'Primeiro Secretário',
    type: 'select',
    optionsEndpoint: '/vereador',
    optionsValueKey: 'id',
    optionsLabelKey: 'nome',
  },
  {
    name: 'segundo_secretario',
    label: 'Segundo Secretário',
    type: 'select',
    optionsEndpoint: '/vereador',
    optionsValueKey: 'id',
    optionsLabelKey: 'nome',
  },
  {
    name: 'ano_legislatura',
    label: 'Ano da Legislatura',
    type: 'select',
    options: anoLegislatura,
  },
]

const detailFields = [
  // Aqui você pode mostrar campos simples, como ID e Legislatura
  { key: 'id',                 label: 'ID' },
  { key: 'legislatura', label: 'Legislatura' },
  { key: 'ano_legislatura', label: 'Ano Legislatura'}
]

const detailSections = [
  {
    title:       'Presidente',
    endpoint:    'presidente',       // GET /mesa-diretora/:id/presidente
    itemKey:     'presidente',
    labelKey:    'nome',
    displayType: 'list'
  },
  {
    title:       'Vice-Presidente',
    endpoint:    'vice_presidente',  // GET /mesa-diretora/:id/vice_presidente
    itemKey:     'vice_presidente',
    labelKey:    'nome',
    displayType: 'list'
  },
  {
    title:       'Primeiro Secretário',
    endpoint:    'primeiro_secretario', // GET /mesa-diretora/:id/primeiro_secretario
    itemKey:     'primeiro_secretario',
    labelKey:    'nome',
    displayType: 'list'
  },
  {
    title:       'Segundo Secretário',
    endpoint:    'segundo_secretario', // GET /mesa-diretora/:id/segundo_secretario
    itemKey:     'segundo_secretario',
    labelKey:    'nome',
    displayType: 'list'
  }
]

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
