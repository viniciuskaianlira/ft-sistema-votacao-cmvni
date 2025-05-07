<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Lista de Usuários</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Novo Usuário
      </button>
    </div>

    <BaseList
      :key="listKey"
      endpoint="/usuarios"
      :columns="columns"
      :showActions="true"
      :filterableFields="['nome', 'email']"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />
    
    <BaseDetail
      v-model:visible="showModal"
      resource-endpoint="/usuarios"
      :resource-id="selectedUsuarioId"
      title-field="nome"
      :fields="detailFields"
      :sections="detailSections"
    />
    
    <BaseFormCreate
      v-model:visible="showCreate"
      endpoint="/usuarios"
      :fields="createFields"
      title="Novo Usuário"
      @saved="onCreated"
    />
    
    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Usuário"
      endpoint="/usuarios"
      :record-id="selectedUsuarioId"
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

import usuariosService from '@/services/usuariosService'

const toast = useToast()

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Nome', field: 'nome' },
  { label: 'Email', field: 'email' },
]

const listKey = ref(0)
const showModal = ref(false)
const showCreate = ref(false)
const showEdit = ref(false)
const selectedUsuarioId = ref(null)

const createFields = [
  { name: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Digite o nome' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite o email' },
  { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite a senha' },
]

const editFields = [
  { name: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Digite o nome' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite o email' },
  { name: 'password', label: 'Senha', type: 'password', placeholder: 'Deixe em branco para não alterar' },
]

const detailFields = [
  { label: 'Nome', key: 'nome' },
  { label: 'Email', key: 'email' },
]

const detailSections = []

const onView = (row) => { selectedUsuarioId.value = row.id; showModal.value = true }
const onEdit = (row) => { selectedUsuarioId.value = row.id; showEdit.value = true }

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir este usuário?')) return
  try {
    await usuariosService.delete(row.id)
    toast.success('Usuário excluído com sucesso!')
    listKey.value++
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao excluir o usuário.')
  }
}

const onCreated = () => { toast.success('Usuário criado com sucesso!'); listKey.value++; showCreate.value = false }

const onEdited = () => { toast.success('Usuário atualizado com sucesso!'); listKey.value++; showEdit.value = false }

const onError = (err) => { toast.error('Erro ao carregar ou salvar o usuário.') }
</script>
<style>
button {
  cursor: pointer;
}
</style>
