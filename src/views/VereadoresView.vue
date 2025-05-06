<!-- src/views/VereadoresView.vue -->
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

    <BaseList
      :key="reloadKey"
      endpoint="/vereador"
      :columns="columns"
      :showActions="true"
      :filterableFields="['nome', 'partido']"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <!-- Detalhes -->
    <BaseDetail
      v-if="showModal && selectedVereadorId != null"
      v-model:visible="showModal"
      :vereador-id="selectedVereadorId"
    />

    <!-- Criação -->
    <BaseFormCreate
      v-model:visible="showCreate"
      endpoint="/vereador"
      :fields="createFields"
      title="Novo Vereador"
      @saved="onCreated"
    />

    <!-- Edição via RegistroEditor com modal interno -->
    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Vereador"
      endpoint="/vereador"
      :recordId="selectedVereadorId"
      :fields="editFields"
      @saved="onEdited"
      @error="onErro"
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

import vereadoresService from '@/services/vereadoresService'

const toast = useToast()

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Nome', field: 'nome' },
  { label: 'Partido', field: 'partido' },
  { label: 'Sigla Partido', field: 'sigla_partido' },
  { label: 'Ativo', field: 'ativo' }
]

const reloadKey = ref(0)
const showModal = ref(false)
const showCreate = ref(false)
const showEdit = ref(false)
const selectedVereadorId = ref(null)

const createFields = [
  { name: 'nome',          label: 'Nome Completo',    type: 'text',      placeholder: 'Digite o nome' },
  { name: 'username',      label: 'Usuário',          type: 'text',      placeholder: 'Digite o usuário' },
  { name: 'password',      label: 'Senha Temporária', type: 'password',  placeholder: 'Digite a senha' },
  { name: 'partido',       label: 'Partido',          type: 'text',      placeholder: 'Digite o partido' },
  { name: 'sigla_partido', label: 'Sigla do Partido', type: 'text',      placeholder: 'Digite a sigla' },
  {
    name: 'legislatura_id',
    label: 'Legislatura',
    type: 'select',
    optionsEndpoint: '/legislatura',
    optionsValueKey: 'id',
    optionsLabelKey: 'numero'
  }
]

const editFields = [
  { name: 'partido',       label: 'Partido',          type: 'text',     placeholder: 'Digite o partido' },
  { name: 'sigla_partido', label: 'Sigla Partido',    type: 'text',     placeholder: 'Digite a sigla', maxLength: 10 },
  {
    name: 'legislatura_id',
    label: 'Legislatura',
    type: 'select',
    optionsEndpoint: '/legislatura',
    optionsValueKey: 'id',
    optionsLabelKey: 'numero'
  },
  {
    name: 'ativo',
    label: 'Ativo',
    type: 'select',
    options: [
      { label: 'Sim', value: true },
      { label: 'Não', value: false }
    ]
  }
]

// ---- Ações ----

function onView(row) {
  selectedVereadorId.value = row.id
  showModal.value = true
}

function onEdit(row) {
  selectedVereadorId.value = row.id
  showEdit.value = true
}

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir este vereador?')) return
  try {
    await vereadoresService.delete(row.id)
    toast.success('Vereador excluído com sucesso!')
    reloadKey.value++
  } catch (err) {
    console.error(err)
    toast.error(err.response?.data?.message || 'Erro ao excluir o vereador.')
  }
}

function onCreated() {
  toast.success('Vereador criado com sucesso!')
  reloadKey.value++
  showCreate.value = false
}

function onEdited() {
  toast.success('Vereador atualizado com sucesso!')
  reloadKey.value++
  showEdit.value = false
}

function onErro(err) {
  console.error(err)
  toast.error('Erro ao carregar ou salvar o vereador.')
}
</script>
