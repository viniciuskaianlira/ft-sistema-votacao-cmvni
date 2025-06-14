<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Lista de Cargos</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Novo Cargo
      </button>
    </div>

    <BaseList
      :key="listKey"
      endpoint="/cargos"
      :columns="columns"
      :showActions="true"
      :filterableFields="['nome']"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <BaseDetail
      v-model:visible="showModal"
      resource-endpoint="/cargos"
      :resource-id="selectedCargoId"
      title-field="nome"
      :fields="detailFields"
      :sections="detailSections"
    />

    <BaseFormCreate
      v-model:visible="showCreate"
      endpoint="/cargos"
      :fields="createFields"
      title="Novo Cargo"
      @saved="onCreated"
    />

    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Cargo"
      endpoint="/cargos"
      :record-id="selectedCargoId"
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

import cargosService from '@/services/cargosService';

const toast = useToast();

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Nome', field: 'nome' },
];

const listKey = ref(0);
const showModal = ref(false);
const showCreate = ref(false);
const showEdit = ref(false);
const selectedCargoId = ref(null);

const createFields = [
  { name: 'nome', label: 'Nome', type: 'text', placeholder: 'Digite o nome do cargo' },
];

const editFields = [
  { name: 'nome', label: 'Nome', type: 'text', placeholder: 'Digite o nome do cargo' },
];

const detailFields = [
  { label: 'Nome', key: 'nome' },
];

const detailSections = [];

const onView = (row) => {
  selectedCargoId.value = row.id;
  showModal.value = true;
};

const onEdit = (row) => {
  selectedCargoId.value = row.id;
  showEdit.value = true;
};

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir este cargo?')) return;
  try {
    await cargosService.delete(row.id);
    toast.success('Cargo excluído com sucesso!');
    listKey.value++;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao excluir o cargo.');
  }
}

const onCreated = () => {
  toast.success('Cargo criado com sucesso!');
  listKey.value++;
  showCreate.value = false;
};

const onEdited = () => {
  toast.success('Cargo atualizado com sucesso!');
  listKey.value++;
  showEdit.value = false;
};

const onError = () => {
  toast.error('Erro ao carregar ou salvar o cargo.');
};
</script>

<style>
button {
  cursor: pointer;
}
</style>
