<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Lista de Sessões Legislativas</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Nova Sessão Legislativa
      </button>
    </div>

    <BaseList
      :key="listKey"
      endpoint="/sessao_legislativa"
      :columns="columns"
      :showActions="true"
      :filterableFields="['numero', 'data_inicio', 'data_fim']"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <BaseDetail
      v-model:visible="showModal"
      resource-endpoint="/sessao_legislativa"
      :resource-id="selectedSessaoId"
      title-field="numero"
      :fields="detailFields"
      :sections="detailSections"
    />

    <BaseFormCreate
      v-model:visible="showCreate"
      endpoint="/sessao_legislativa"
      :fields="createFields"
      title="Nova Sessão Legislativa"
      @saved="onCreated"
    />

    <BaseFormEdit
      v-model:visible="showEdit"
      title="Editar Sessão Legislativa"
      endpoint="/sessao_legislativa"
      :record-id="selectedSessaoId"
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

import sessoesService from '@/services/sessoesService';

const toast = useToast();

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Número', field: 'numero' },
  { label: 'Data Início', field: 'data_inicio' },
  { label: 'Data Fim', field: 'data_fim' },
];

const listKey = ref(0);
const showModal = ref(false);
const showCreate = ref(false);
const showEdit = ref(false);
const selectedSessaoId = ref(null);

const createFields = [
  { name: 'numero', label: 'Número', type: 'text', placeholder: 'Digite o número da sessão' },
  { name: 'data_inicio', label: 'Data Início', type: 'date', placeholder: 'Selecione a data de início' },
  { name: 'data_fim', label: 'Data Fim', type: 'date', placeholder: 'Selecione a data de fim' },
];

const editFields = [
  { name: 'numero', label: 'Número', type: 'text', placeholder: 'Digite o número da sessão' },
  { name: 'data_inicio', label: 'Data Início', type: 'date', placeholder: 'Selecione a data de início' },
  { name: 'data_fim', label: 'Data Fim', type: 'date', placeholder: 'Selecione a data de fim' },
];

const detailFields = [
  { label: 'Número', key: 'numero' },
  { label: 'Data Início', key: 'data_inicio' },
  { label: 'Data Fim', key: 'data_fim' },
];

const detailSections = [];

const onView = (row) => {
  selectedSessaoId.value = row.id;
  showModal.value = true;
};

const onEdit = (row) => {
  selectedSessaoId.value = row.id;
  showEdit.value = true;
};

async function onDelete(row) {
  if (!confirm('Tem certeza que deseja excluir esta sessão legislativa?')) return;
  try {
    await sessoesService.delete(row.id);
    toast.success('Sessão legislativa excluída com sucesso!');
    listKey.value++;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao excluir a sessão legislativa.');
  }
}

const onCreated = () => {
  toast.success('Sessão legislativa criada com sucesso!');
  listKey.value++;
  showCreate.value = false;
};

const onEdited = () => {
  toast.success('Sessão legislativa atualizada com sucesso!');
  listKey.value++;
  showEdit.value = false;
};

const onError = () => {
  toast.error('Erro ao carregar ou salvar a sessão legislativa.');
};
</script>

<style>
button {
  cursor: pointer;
}
</style>
