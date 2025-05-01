<template>
  <div class="p-6 bg-white min-h-full">
    <h1 class="text-2xl font-semibold mb-6">Gerenciar Sessões</h1>

    <!-- Formulário para Agendar/Editar Sessão -->
    <div class="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Sessão' : 'Agendar Nova Sessão' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="dataSessao" class="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <Field
              name="dataSessao"
              type="date"
              id="dataSessao"
              v-model="currentSessao.data_sessao"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.dataSessao, 'focus:ring-blue-400': !errors.dataSessao }"
            />
            <ErrorMessage name="dataSessao" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="horaSessao" class="block text-sm font-medium text-gray-700 mb-1">Hora</label>
            <Field
              name="horaSessao"
              type="time"
              id="horaSessao"
              v-model="currentSessao.hora_inicio"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.horaSessao, 'focus:ring-blue-400': !errors.horaSessao }"
            />
            <ErrorMessage name="horaSessao" class="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div class="mb-4">
            <label for="tipoSessao" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Sessão</label>
            <Field
              name="tipoSessao"
              as="select"
              id="tipoSessao"
              v-model="currentSessao.tipo_sessao_id" 
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
              :class="{ 'border-red-500 focus:ring-red-400': errors.tipoSessao, 'focus:ring-blue-400': !errors.tipoSessao }"
            >
              <option value="" disabled>Selecione um tipo</option>
              <option v-for="tipo in tiposSessao" :key="tipo.id" :value="tipo.id">{{ tipo.nome }}</option>
            </Field>
            <ErrorMessage name="tipoSessao" class="text-red-500 text-sm mt-1" />
          </div>
        <div class="mb-4">
          <label for="pauta" class="block text-sm font-medium text-gray-700 mb-1">Pauta / Observações</label>
          <Field
            name="pauta"
            as="textarea"
            id="pauta"
            rows="3"
            v-model="currentSessao.pauta"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="{ 'border-red-500 focus:ring-red-400': errors.pauta, 'focus:ring-blue-400': !errors.pauta }"
          />
          <ErrorMessage name="pauta" class="text-red-500 text-sm mt-1" />
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="resetForm"
            v-if="isEditing"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancelar Edição
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Salvando...</span>
            <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Agendar Sessão' }}</span>
          </button>
        </div>
      </Form>
    </div>

    <!-- Listagem de Sessões Agendadas -->
    <h2 class="text-xl font-semibold mb-4">Sessões Agendadas</h2>
    <div v-if="loading">Carregando sessões...</div>
    <div v-else-if="sessoes.length === 0">Nenhuma sessão agendada.</div>
    <ul v-else class="space-y-3">
      <li v-for="sessao in sessoes" :key="sessao.id" class="p-4 border rounded-lg flex justify-between items-center">
        <div>
          <span class="font-medium">{{ formatDateTime(sessao.data_sessao, sessao.hora_inicio) }}</span>
          <span class="text-sm text-gray-500 ml-2">({{ getTipoSessaoNome(sessao.tipo_sessao_id) }})</span>
          <p class="text-sm text-gray-600 mt-1">{{ sessao.pauta }}</p>
        </div>
        <div class="space-x-2">
          <!-- Adicionar botões para iniciar/controlar sessão se aplicável -->
          <button @click="editSessao(sessao)" class="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
          <button @click="deleteSessao(sessao.id)" class="text-red-500 hover:text-red-700 text-sm">Excluir</button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import sessoesService from '@/services/sessoesService';
import { format } from 'date-fns'; // Para formatar data/hora
import { ptBR } from 'date-fns/locale'; // Para formato brasileiro

const toast = useToast();
const sessoes = ref([]);
const tiposSessao = ref([]);
const loading = ref(false);
const isEditing = ref(false);
const currentSessao = ref({
  id: null,
  data_sessao: '',
  hora_inicio: '',
  tipo_sessao_id: '',
  pauta: '',
  // Adicionar outros campos conforme modelo do backend (status, etc.)
});

// Esquema de validação
const schema = yup.object({
  dataSessao: yup.date().required('A data é obrigatória').typeError('Data inválida'),
  horaSessao: yup.string().required('A hora é obrigatória').matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora inválida (HH:MM)'),
  tipoSessao: yup.number().required('Selecione o tipo de sessão'),
  pauta: yup.string().nullable(),
});

// Buscar dados iniciais
const fetchData = async () => {
  loading.value = true;
  try {
    const [sessoesRes, tiposRes] = await Promise.all([
      sessoesService.getAll(),
      sessoesService.getTiposSessao(),
    ]);
    sessoes.value = sessoesRes.data || [];
    tiposSessao.value = tiposRes.data || [];
  } catch (error) {
    console.error('Erro ao buscar dados das sessões:', error);
    toast.error('Falha ao carregar dados das sessões.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Formatar data e hora
const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return 'Data/Hora inválida';
  try {
    // O backend pode retornar a data em formato diferente, ajustar o parse se necessário
    const date = new Date(`${dateStr}T${timeStr}`);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch (e) {
    return 'Data/Hora inválida';
  }
};

// Função para obter nome do tipo de sessão pelo ID
const getTipoSessaoNome = (tipoId) => {
  const tipo = tiposSessao.value.find(t => t.id === tipoId);
  return tipo ? tipo.nome : 'Desconhecido';
};

// Resetar formulário
const resetForm = () => {
  isEditing.value = false;
  currentSessao.value = {
    id: null,
    data_sessao: '',
    hora_inicio: '',
    tipo_sessao_id: '',
    pauta: '',
  };
};

// Submissão do formulário (Criar ou Atualizar)
const handleSubmit = async (values, { resetForm: veeResetForm }) => {
  // Formatar data e hora antes de enviar, se necessário pelo backend
  const dataToSend = {
    ...currentSessao.value, // Pega ID se estiver editando
    data_sessao: values.dataSessao, // yup já validou o formato Date
    hora_inicio: values.horaSessao,
    tipo_sessao_id: values.tipoSessao,
    pauta: values.pauta,
  };

  try {
    if (isEditing.value) {
      await sessoesService.update(currentSessao.value.id, dataToSend);
      toast.success('Sessão atualizada com sucesso!');
    } else {
      await sessoesService.create(dataToSend);
      toast.success('Sessão agendada com sucesso!');
    }
    await fetchData();
    resetForm();
    veeResetForm();
  } catch (error) {
    console.error('Erro ao salvar sessão:', error);
    toast.error(error.response?.data?.message || 'Falha ao salvar a sessão.');
  }
};

// Editar sessão
const editSessao = (sessao) => {
  isEditing.value = true;
  // Formatar data para 'YYYY-MM-DD' para o input type="date"
  const dataFormatada = sessao.data_sessao ? format(new Date(sessao.data_sessao + 'T00:00:00'), 'yyyy-MM-dd') : '';
  currentSessao.value = { 
      ...sessao, 
      data_sessao: dataFormatada, // Usar data formatada
      tipo_sessao_id: sessao.tipo_sessao_id // Garantir que o ID está correto
  }; 
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Excluir sessão
const deleteSessao = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta sessão?')) {
    return;
  }
  try {
    await sessoesService.delete(id);
    toast.success('Sessão excluída com sucesso!');
    await fetchData();
  } catch (error) {
    console.error('Erro ao excluir sessão:', error);
    toast.error(error.response?.data?.message || 'Falha ao excluir a sessão.');
  }
};

</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui */
</style>

