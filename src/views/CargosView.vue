<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Lista de Cargos</h1>
      <button
        @click="showCreate = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Novo Cargo
      </button>
    </div>

    <DataTable
      :key="reloadKey"
      endpoint="/cargos"
      :columns="columns"
      :showActions="true"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <!-- Criação -->
    <DynamicFormModal
      v-model:visible="showCreate"
      endpoint="/cargo"
      :fields="createFields"
      title="Novo Cargo"
      @saved="onCreated"
    />

    <!-- Edição via RegistroEditor com modal interno -->
    <RegistroEditor
      v-model:visible="showEdit"
      title="Editar Cargo"
      endpoint="/cargo"
      :recordId="selectedCargoId"
      :fields="editFields"
      @saved="onEdited"
      @error="onErro"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import DataTable from '@/components/tables/DataTable.vue';
import DynamicFormModal from '@/components/modals/DynamicFormModal.vue';
import RegistroEditor from '@/components/forms/RegistroEditor.vue';

const toast = useToast();

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Nome', field: 'nome' },
  { label: 'Descrição', field: 'descricao' },
  { label: 'Ativo', field: 'ativo' }
];

const reloadKey = ref(0);
const showCreate = ref(false);
const showEdit = ref(false);
const selectedCargoId = ref(null);

const createFields = [
  { name: 'nome', label: 'Nome do Cargo', type: 'text', placeholder: 'Digite o nome do cargo' },
  { name: 'descricao', label: 'Descrição', type: 'text', placeholder: 'Digite a descrição' },
  {
    name: 'ativo',
    label: 'Ativo',
    type: 'select',
    options: [
      { label: 'Sim', value: true },
      { label: 'Não', value: false }
    ]
  }
];

const editFields = [
  { name: 'nome', label: 'Nome do Cargo', type: 'text', placeholder: 'Digite o nome do cargo' },
  { name: 'descricao', label: 'Descrição', type: 'text', placeholder: 'Digite a descrição' },
  {
    name: 'ativo',
    label: 'Ativo',
    type: 'select',
    options: [
      { label: 'Sim', value: true },
      { label: 'Não', value: false }
    ]
  }
];

// ---- Ações ----

function onView(row) {
  console.log('Visualizar Cargo:', row);
}

function onEdit(row) {
  selectedCargoId.value = row.id;
  showEdit.value = true;
}

async function onDelete(row) {
  console.log('Excluir Cargo:', row);
}

function onCreated() {
  toast.success('Cargo criado com sucesso!');
  reloadKey.value++;
  showCreate.value = false;
}

function onEdited() {
  toast.success('Cargo atualizado com sucesso!');
  reloadKey.value++;
  showEdit.value = false;
}

function onErro(err) {
  console.error(err);
  toast.error('Erro ao carregar ou salvar o cargo.');
}
</script>
