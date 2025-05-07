<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Lista de Tipos de Atos</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Novo Tipo de Ato
      </button>
    </div>

    <BaseList
      :key="listKey"
      endpoint="/tipo-ato"
      :columns="columns"
      :showActions="true"
      :filterableFields="['nome']"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <BaseDetail
      v-model:visible="showModal"
      resource-endpoint="/tipo-ato"
      :resource-id="selectedTipoAtoId"
      title-field="nome"
      :fields="detailFields"
      :sections="detailSections"
    />

    <BaseFormCreate
      v-model:visible="showCreate"
      endpoint="/tipo-ato"
      :fields="createFields"
      title="Novo Tipo de Ato"
      @saved="onCreated"
    />

    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Tipo de Ato"
      endpoint="/tipo-ato"
      :record-id="selectedTipoAtoId"
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

import tipoAtosService from '@/services/atosService';

const toast = useToast();

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Nome', field: 'nome' },
];

const listKey = ref(0);
const showModal = ref(false);
const showCreate = ref(false);
const showEdit = ref(false);
const selectedTipoAtoId = ref(null);

const createFields = [
  { name: 'nome', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
];

const editFields = [
  { name: 'nome', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
];

const detailFields = [
  { label: 'Nome', key: 'nome' },
];

const detailSections = [];

const onView = (row) => {
  selectedTipoAtoId.value = row.id;
  showModal.value = true;
};

const onEdit = (row) => {
  selectedTipoAtoId.value = row.id;
  showEdit.value = true;
};

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir este tipo de ato?')) return;
  try {
    await tipoAtosService.delete(row.id);
    toast.success('Tipo de Ato excluído com sucesso!');
    listKey.value++;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao excluir o Tipo de Ato.');
  }
}

const onCreated = () => {
  toast.success('Tipo de Ato criado com sucesso!');
  listKey.value++;
  showCreate.value = false;
};

const onEdited = () => {
  toast.success('Tipo de Ato atualizado com sucesso!');
  listKey.value++;
  showEdit.value = false;
};

const onError = () => {
  toast.error('Erro ao carregar ou salvar o tipo de ato.');
};
</script>

<style>
button {
  cursor: pointer;
}
</style>