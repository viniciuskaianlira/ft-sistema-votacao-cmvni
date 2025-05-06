<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Lista de Legislaturas</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Nova Legislatura
      </button>
    </div>

    <BaseList
      :key="reloadKey"
      endpoint="/legislatura"
      :columns="columns"
      :showActions="true"
      :filterableFields="['numero']"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <!-- Detalhes -->
    <BaseDetail
      v-model:visible="showModal"
      resource-endpoint="/legislatura"
      :resource-id="selectedLegislaturaId"
      title-field="numero"
      title-prefix="Legislatura Nº "
      :fields="detailFields"
      :sections="detailSections"
    />

    <!-- Criação -->
    <BaseFormCreate
      v-model:visible="showCreate"
      endpoint="/legislatura"
      :fields="createFields"
      title="Nova Legislatura"
      @saved="onCreated"
      @error="onError"
    />

    <!-- Edição via modal interno -->
    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Legislatura"
      endpoint="/legislatura"
      :record-id="selectedLegislaturaId"
      :fields="editFields"
      @saved="onEdited"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification';
import legislaturasService from '@/services/legislaturasService';

import BaseList from '@/components/crud/BaseList.vue'
import BaseDetail from '@/components/crud/BaseDetail.vue'
import BaseFormCreate from '@/components/crud/BaseFormCreate.vue'
import BaseFormEdit from '@/components/crud/BaseFormEdit.vue'

const toast = useToast();

const reloadKey = ref(0)
const showModal = ref(false)
const showCreate = ref(false)
const showEdit = ref(false)
const selectedLegislaturaId = ref(null)

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Número', field: 'numero' },
  { label: 'Data de Início', field: 'data_inicio', type: 'date' },
  { label: 'Data de Fim', field: 'data_fim', type: 'date' },
]

const createFields = [
  { name: 'numero', label: 'Número da Legislatura', type: 'number', placeholder: 'Ex: 19', required: true },
  { name: 'data_inicio', label: 'Data de Início', type: 'date', required: true },
  { name: 'data_fim', label: 'Data de Fim', type: 'date', required: true },
]

const editFields = [
  { name: 'numero', label: 'Número da Legislatura', type: 'number', placeholder: 'Ex: 19', required: true },
  { name: 'data_inicio', label: 'Data de Início', type: 'date', required: true },
  { name: 'data_fim', label: 'Data de Fim', type: 'date', required: true },
]

const detailFields = [
  { label: 'Número', key: 'numero' },
  { label: 'Data de Início', key: 'data_inicio', type: 'date' },
  { label: 'Data de Fim', key: 'data_fim', type: 'date' },
]

const detailSections = [
  {
    title: 'Vereadores desta Legislatura',
    endpoint: 'vereadores', // Assumindo que existe um endpoint /legislatura/:id/vereadores
    itemKey: 'vereadores',
    labelKey: 'nome',
    displayType: 'table',
    columns: [
      { label: 'ID', key: 'id' },
      { label: 'Nome', key: 'nome' },
      { label: 'Partido', key: 'partido' },
    ],
  },
]

// ---- Ações ----

function onView(row) {
  selectedLegislaturaId.value = row.id
  showModal.value = true
}

function onEdit(row) {
  selectedLegislaturaId.value = row.id
  showEdit.value = true
}

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir esta legislatura?')) return
  try {
    await legislaturasService.delete(row.id)
    toast.success('Legislatura excluída com sucesso!')
    reloadKey.value++
  } catch (err) {
    console.error(err)
    toast.error(err.response?.data?.message || 'Erro ao excluir a legislatura.')
  }
}

function onCreated() {
  toast.success('Legislatura criada com sucesso!')
  reloadKey.value++
  showCreate.value = false
}

function onEdited() {
  toast.success('Legislatura atualizada com sucesso!')
  reloadKey.value++
  showEdit.value = false
}

function onError(err) {
  console.error(err)
  toast.error('Erro ao carregar ou salvar a legislatura.')
}

</script>

<style>
  button {
    cursor: pointer;
  }
</style>