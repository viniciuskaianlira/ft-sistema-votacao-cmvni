<template>
  <div class="p-6 bg-white min-h-full">
    <h1 class="text-2xl font-semibold mb-6">Registro de Presença</h1>

    <!-- Seleção da Sessão -->
    <div class="mb-6">
      <label for="sessaoSelect" class="block text-sm font-medium text-gray-700 mb-1">Selecione a Sessão</label>
      <select 
        id="sessaoSelect" 
        v-model="selectedSessaoId" 
        @change="loadPresencaStatus" 
        class="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        :disabled="loadingSessoes"
      >
        <option value="" disabled>{{ loadingSessoes ? 'Carregando sessões...' : 'Selecione uma sessão...' }}</option>
        <!-- Idealmente, buscar sessões ativas ou agendadas -->
        <option v-for="sessao in sessoesDisponiveis" :key="sessao.id" :value="sessao.id">
          {{ formatSessaoOption(sessao) }}
        </option>
      </select>
    </div>

    <!-- Lista de Vereadores e Controles de Presença -->
    <div v-if="loadingPresenca" class="text-center py-10">
      <p>Carregando lista de presença...</p>
      <!-- Adicionar spinner -->
    </div>
    <div v-else-if="errorPresenca" class="text-red-600">
      <p>Erro ao carregar presença: {{ errorPresenca }}</p>
    </div>
    <div v-else-if="selectedSessaoId && listaPresenca.length > 0">
      <h2 class="text-xl font-semibold mb-4">Vereadores</h2>
      <ul class="space-y-3">
        <li v-for="item in listaPresenca" :key="item.vereador.id" class="p-4 border rounded-lg flex justify-between items-center">
          <span class="font-medium">{{ item.vereador.nome }}</span>
          <div class="flex items-center space-x-3">
            <span 
              class="text-sm font-semibold px-2 py-1 rounded"
              :class="item.presente ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            >
              {{ item.presente ? 'Presente' : 'Ausente' }}
            </span>
            <button 
              @click="togglePresenca(item.vereador.id, !item.presente)" 
              :disabled="updatingPresencaId === item.vereador.id"
              class="px-3 py-1 text-sm rounded text-white disabled:opacity-50"
              :class="item.presente ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
            >
              <span v-if="updatingPresencaId === item.vereador.id">Atualizando...</span>
              <span v-else>{{ item.presente ? 'Marcar Ausente' : 'Marcar Presente' }}</span>
            </button>
            <!-- Opcional: Botões para registrar entrada/saída específicas -->
            <!-- <button @click="registrarEntrada(item.vereador.id)" class="...">Registrar Entrada</button> -->
            <!-- <button @click="registrarSaida(item.vereador.id)" class="...">Registrar Saída</button> -->
          </div>
        </li>
      </ul>
    </div>
    <div v-else-if="selectedSessaoId">
        <p class="text-gray-500">Não foi possível carregar a lista de vereadores para esta sessão.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import presencaService from '@/services/presencaService';
import sessoesService from '@/services/sessoesService'; // Para buscar sessões
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const toast = useToast();
const sessoesDisponiveis = ref([]); // Sessões ativas ou agendadas
const selectedSessaoId = ref('');
const listaPresenca = ref([]); // Array de { vereador: {id, nome}, presente: bool, horario_entrada: ... }
const loadingSessoes = ref(false);
const loadingPresenca = ref(false);
const errorPresenca = ref(null);
const updatingPresencaId = ref(null); // ID do vereador cuja presença está sendo atualizada

// --- Funções de Formatação ---
const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr) return '';
  const timeSuffix = timeStr ? ` às ${timeStr.substring(0, 5)}` : '';
  try {
    const date = new Date(`${dateStr}T00:00:00`);
    return format(date, "dd/MM/yyyy", { locale: ptBR }) + timeSuffix;
  } catch (e) {
    return 'Data inválida';
  }
};

const formatSessaoOption = (sessao) => {
    // Mock tipo - Idealmente viria do backend
    const tipos = { 1: 'Ordinária', 2: 'Extraordinária', 3: 'Solene' }; 
    const tipoNome = tipos[sessao.tipo_sessao_id] || 'Desconhecido';
    return `${tipoNome} - ${formatDateTime(sessao.data_sessao, sessao.hora_inicio)}`;
};

// --- Carregamento de Dados ---
const loadSessoesDisponiveis = async () => {
  loadingSessoes.value = true;
  try {
    // Buscar sessões com status 'agendada' ou 'em_andamento'
    const response = await sessoesService.getAll({ status: ['agendada', 'em_andamento'] }); 
    sessoesDisponiveis.value = response.data || [];
  } catch (error) {
    console.error('Erro ao buscar sessões disponíveis:', error);
    toast.error('Falha ao carregar lista de sessões.');
  } finally {
    loadingSessoes.value = false;
  }
};

const loadPresencaStatus = async () => {
  if (!selectedSessaoId.value) {
    listaPresenca.value = [];
    errorPresenca.value = null;
    return;
  }
  loadingPresenca.value = true;
  errorPresenca.value = null;
  listaPresenca.value = [];
  try {
    const response = await presencaService.getPresencaStatus(selectedSessaoId.value);
    listaPresenca.value = response.data.listaPresenca || [];
  } catch (error) {
    console.error('Erro ao buscar status de presença:', error);
    errorPresenca.value = error.response?.data?.message || 'Falha ao carregar dados de presença.';
    toast.error(errorPresenca.value);
  } finally {
    loadingPresenca.value = false;
  }
};

onMounted(() => {
  loadSessoesDisponiveis();
});

// --- Ações ---
const togglePresenca = async (vereadorId, novoStatus) => {
  if (!selectedSessaoId.value) return;
  updatingPresencaId.value = vereadorId;
  try {
    await presencaService.registrarPresenca(selectedSessaoId.value, vereadorId, novoStatus);
    toast.success(`Presença de ${listaPresenca.value.find(v => v.vereador.id === vereadorId)?.vereador.nome} atualizada.`);
    // Atualiza o status localmente para feedback imediato
    const index = listaPresenca.value.findIndex(item => item.vereador.id === vereadorId);
    if (index !== -1) {
      listaPresenca.value[index].presente = novoStatus;
      // Poderia recarregar tudo com loadPresencaStatus(), mas a atualização local é mais rápida
    }
  } catch (error) {
    console.error('Erro ao registrar presença:', error);
    toast.error(error.response?.data?.message || 'Falha ao atualizar presença.');
  } finally {
    updatingPresencaId.value = null;
  }
};

</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

