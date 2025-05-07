<!-- src/views/OficiosView.vue -->
<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Lista de Ofícios</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Novo Ofício
      </button>
    </div>

    <BaseList
      :key="reloadKey"
      endpoint="/oficios"
      :columns="columns"
      :showActions="true"
      :filterableFields="['numero', 'assunto', 'destinatario']"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <!-- Detalhes -->
    <BaseDetail
      v-model:visible="showModal"
      resource-endpoint="/oficios"
      :resource-id="selectedOficioId"
      title-field="numero"
      :fields="detailFields"
      :sections="detailSections"
    />

    <!-- Criação -->
    <BaseFormCreate
      v-model:visible="showCreate"
      endpoint="/oficios"
      :fields="createFields"
      title="Novo Ofício"
      @saved="onCreated"
    />

    <!-- Edição via modal interno -->
    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Ofício"
      endpoint="/oficios"
      :record-id="selectedOficioId"
      :fields="editFields"
      @saved="onEdited"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import BaseList       from '@/components/crud/BaseList.vue'
import BaseDetail     from '@/components/crud/BaseDetail.vue'
import BaseFormCreate from '@/components/crud/BaseFormCreate.vue'
import BaseFormEdit   from '@/components/crud/BaseFormEdit.vue'

import oficiosService from '@/services/oficiosService'

const toast = useToast()

const columns = [
  { label: 'ID',           field: 'id' },
  { label: 'Número',       field: 'numero' },
  { label: 'Assunto',      field: 'assunto' },
  { label: 'Destinatário', field: 'destinatario' },
  { label: 'Data',         field: 'data_criacao' }
]

const reloadKey        = ref(0)
const showModal        = ref(false)
const showCreate       = ref(false)
const showEdit         = ref(false)
const selectedOficioId = ref(null)

const createFields = [
  { name: 'numero',          label: 'Número do Ofício',      type: 'text',      placeholder: 'Digite o número' },
  { name: 'assunto',         label: 'Assunto',               type: 'text',      placeholder: 'Digite o assunto' },
  { name: 'detino',          label: 'Destinatário',          type: 'text',      placeholder: 'Digite o destinatário' },
  { name: 'texto',           label: 'Texto do Ofício',       type: 'textarea',  placeholder: 'Digite o texto' },
  { name: 'data_criacao',    label: 'Data',                  type: 'date',      placeholder: 'Informe a data' },
  { name: 'para_executivo',  label: 'Envio ao Executivo',    type: 'checkbox',  placeholder: ''}
]

const editFields = [
  { name: 'numero',       label: 'Número do Ofício', type: 'text', placeholder: 'Digite o número' },
  { name: 'assunto',      label: 'Assunto', type: 'text', placeholder: 'Digite o assunto' },
  { name: 'destinatario', label: 'Destinatário', type: 'text', placeholder: 'Digite o destinatário' },
  { name: 'texto',        label: 'Texto do Ofício',       type: 'textarea', placeholder: 'Digite o texto' },
  { name: 'data_criacao', label: 'Data', type: 'date', placeholder: 'Informe a data' },
]

const detailFields = [
  { label: 'Número', key: 'numero' },
  { label: 'Assunto', key: 'assunto' },
  { label: 'Destinatário', key: 'destinatario' },
  { label: 'Data', key: 'data_criacao' },
  { label: 'Texto', key: 'texto' },
]

const detailSections = []

// ---- Ações ----

function onView(row) {
  selectedOficioId.value = row.id
  showModal.value = true
}

function onEdit(row) {
  selectedOficioId.value = row.id
  showEdit.value = true
}

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir este ofício?')) return
  try {
    await oficiosService.delete(row.id)
    toast.success('Ofício excluído com sucesso!')
    reloadKey.value++
  } catch (err) {
    console.error(err)
    toast.error(err.response?.data?.message || 'Erro ao excluir o ofício.')
  }
}

function onCreated() {
  toast.success('Ofício criado com sucesso!')
  reloadKey.value++
  showCreate.value = false
}

function onEdited() {
  toast.success('Ofício atualizado com sucesso!')
  reloadKey.value++
  showEdit.value = false
}

function onError(err) {
  console.error(err)
  toast.error('Erro ao carregar ou salvar o ofício.')
}
</script>

<style>
button {
  cursor: pointer;
}
</style>
