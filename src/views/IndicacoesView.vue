<template>
  <div class="p-4">
    <!-- Header with title and "New" button -->
    <header class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Lista de Indicações</h2>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        @click="onCreate"
      >
        + Nova Indicação
      </button>
    </header>

    <!-- Search field -->
    <header class="flex justify-between items-center mb-4">
        <input
            type="text"
            placeholder="Pesquisar por número ou descrição"
            class="border border-gray-300 rounded px-2 py-1"
        />
    </header>

     <BaseList
        :endpoint="endpoint"
        :columns="fields"
        @edit="onEdit"
        @view="onView"
        :show-actions="true"
        :filterable-fields="['numero','descricao']"
      />

    <BaseDetail
      v-model:visible="showDetailModal"
      :resource-id="selectedResourceId"
      :resource-endpoint="endpoint"
      title-field="numero"
      :fields="detailFields"
    />

    <BaseFormCreate
      v-model:visible="showCreateModal"
      :endpoint="endpoint"
      title="Nova Indicação"
      :fields="formFields"
      @saved="onSaved"
    />

    <BaseFormEdit
      v-model:visible="showEditModal"
      :endpoint="endpoint"
      title="Editar Indicação"
      :record-id="selectedResourceId"
      :fields="formFields"
      @saved="onSaved"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseList from '@/components/crud/BaseList.vue'
import BaseDetail from '@/components/crud/BaseDetail.vue'
import BaseFormCreate from '@/components/crud/BaseFormCreate.vue'
import BaseFormEdit from '@/components/crud/BaseFormEdit.vue'

const endpoint = '/indicacoes'

const fields = [
  { key: 'id', label: 'ID' },
  { key: 'numero', label: 'Número' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'data', label: 'Data' },
  { key: 'vereador', label: 'Vereador' },
]

const detailFields = [
  { key: 'id', label: 'ID' },
  { key: 'numero', label: 'Número' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'data', label: 'Data' },
  { key: 'vereador', label: 'Vereador' },
]

const formFields = [
  {
    name: 'numero',
    label: 'Número',
    type: 'number',
    placeholder: 'Número da Indicação',
  },
  {
    name: 'descricao',
    label: 'Descrição',
    type: 'textarea',
    placeholder: 'Descrição da Indicação',
  },
  {
    name: 'data',
    label: 'Data',
    type: 'date',
  },
  {
    name: 'vereador',
    label: 'Vereador',
    type: 'select',
    optionsEndpoint: '/vereadores',
    optionsValueKey: 'id',
    optionsLabelKey: 'nome',
  },
]

const showDetailModal = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedResourceId = ref(null)

const onView = (id) => { showDetailModal.value = true; selectedResourceId.value = id }
const onCreate = () => { showCreateModal.value = true }
const onEdit = (id) => { showEditModal.value = true; selectedResourceId.value = id }
const onSaved = () => {}
</script>
