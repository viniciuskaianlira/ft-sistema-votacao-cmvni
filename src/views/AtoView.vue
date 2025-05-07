<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Lista de Atos</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Novo Ato
      </button>
    </div>

    <BaseList
      :key="listKey"
      endpoint="/ato"
      :columns="columns"
      :showActions="true"
      :filterableFields="['numero', 'descricao', 'tipo_ato.nome']"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <BaseDetail
      v-model:visible="showModal"
      resource-endpoint="/ato"
      :resource-id="selectedAtoId"
      title-field="numero"
      :fields="detailFields"
      :sections="detailSections"
    />

    <BaseFormCreate
      v-model:visible="showCreate"
      endpoint="/ato"
      :fields="createFields"
      title="Novo Ato"
      @saved="onCreated"
    />

    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Ato"
      endpoint="/ato"
      :record-id="selectedAtoId"
      :fields="editFields"
      @saved="onEdited"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

import BaseList from '@/components/crud/BaseList.vue';
import BaseDetail from '@/components/crud/BaseDetail.vue';
import BaseFormCreate from '@/components/crud/BaseFormCreate.vue';
import BaseFormEdit from '@/components/crud/BaseFormEdit.vue';

import atosService from '@/services/atosService';

const toast = useToast();

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Número', field: 'numero' },
  { label: 'Descrição', field: 'descricao' },
  { label: 'Tipo de Ato', field: 'tipo_ato.nome' },
];

const listKey = ref(0);
const showModal = ref(false);
const showCreate = ref(false);
const showEdit = ref(false);
const selectedAtoId = ref(null);

const createFields = [
  { name: 'numero', label: 'Número', type: 'text', placeholder: 'Digite o número do ato' },
  { name: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Digite a descrição do ato' },
  {
    name: 'tipo_ato_id',
    label: 'Tipo de Ato',
    type: 'select',
    optionsEndpoint: '/tipo-ato',
    optionsValueKey: 'id',
    optionsLabelKey: 'nome'
  }
];

const editFields = [
  { name: 'numero', label: 'Número', type: 'text', placeholder: 'Digite o número do ato' },
  { name: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Digite a descrição do ato' },
    {
    name: 'tipo_ato_id',
    label: 'Tipo de Ato',
    type: 'select',
    optionsEndpoint: '/tipo-ato',
    optionsValueKey: 'id',
    optionsLabelKey: 'nome'
  }
];

const detailFields = [
  { label: 'Número', key: 'numero' },
  { label: 'Descrição', key: 'descricao' },
  { label: 'Tipo de Ato', key: 'tipo_ato.nome' },
];

const detailSections = [];

const onView = (row) => {
  selectedAtoId.value = row.id;
  showModal.value = true;
};

const onEdit = (row) => {
  selectedAtoId.value = row.id;
  showEdit.value = true;
};

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir este ato?')) return;
  try {
    await atosService.delete(row.id);
    toast.success('Ato excluído com sucesso!');
    listKey.value++;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao excluir o ato.');
  }
}

const onCreated = () => {
  toast.success('Ato criado com sucesso!');
  listKey.value++;
  showCreate.value = false;
};

const onEdited = () => {
  toast.success('Ato atualizado com sucesso!');
  listKey.value++;
  showEdit.value = false;
};

const onError = () => {
  toast.error('Erro ao carregar ou salvar o ato.');
};
</script>

<style>
button {
  cursor: pointer;
}
</style>
