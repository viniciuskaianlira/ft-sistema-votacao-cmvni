<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div v-if="loading" class="text-center py-10">
      <p>Carregando dados da sessão...</p>
      <!-- Adicionar um spinner/loading indicator visual -->
    </div>
    <div v-else-if="error" class="text-center py-10 text-red-600">
      <p>Erro ao carregar sessão: {{ error }}</p>
      <router-link to="/dashboard/sessoes" class="text-blue-500 hover:underline">Voltar para lista de sessões</router-link>
    </div>
    <div v-else-if="sessao" class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
      
      <!-- Cabeçalho da Sessão -->
      <div class="mb-6 pb-4 border-b">
        <h1 class="text-3xl font-bold mb-2">Sessão {{ getTipoSessaoNome(sessao.tipo_sessao_id) }} - {{ formatDateTime(sessao.data_sessao, sessao.hora_inicio) }}</h1>
        <p class="text-lg text-gray-600">Status: <span :class="statusClass(sessao.status)">{{ formatStatus(sessao.status) }}</span></p>
      </div>

      <!-- Controles do Presidente -->
      <div v-if="isPresidente" class="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
        <h2 class="text-xl font-semibold mb-3 text-blue-800">Controles do Presidente</h2>
        <div class="flex space-x-4">
          <button 
            v-if="sessao.status === 'agendada'" 
            @click="iniciarSessaoHandler" 
            :disabled="controlLoading"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {{ controlLoading ? 'Iniciando...' : 'Iniciar Sessão' }}
          </button>
          <button 
            v-if="sessao.status === 'em_andamento' || sessao.status === 'votacao_aberta'" 
            @click="encerrarSessaoHandler" 
            :disabled="controlLoading"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
             {{ controlLoading ? 'Encerrando...' : 'Encerrar Sessão' }}
          </button>
          <!-- Botões para abrir/fechar votação serão adicionados na seção da pauta -->
        </div>
      </div>

      <!-- Pauta da Sessão -->
      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-4">Pauta da Sessão</h2>
        <div v-if="loadingPauta">Carregando pauta...</div>
        <div v-else-if="pauta.length === 0">Nenhum item na pauta.</div>
        <ul v-else class="space-y-4">
          <li v-for="(item, index) in pauta" :key="item.id" class="p-4 border rounded-lg shadow-sm" :class="{'bg-yellow-50 border-yellow-300': itemVotacaoAtual && itemVotacaoAtual.id === item.id && itemVotacaoAtual.tipo === item.tipo }">
            <h3 class="text-lg font-semibold">{{ index + 1 }}. {{ item.titulo || item.numero }} ({{ item.tipo }})</h3>
            <p class="text-sm text-gray-600 mb-3">{{ item.ementa || item.descricao }}</p>
            
            <!-- Controles de Votação (Presidente) -->
            <div v-if="isPresidente && sessao.status === 'em_andamento'" class="mt-3">
              <button 
                @click="abrirVotacaoHandler(item)" 
                :disabled="controlLoading"
                class="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 disabled:opacity-50"
              >
                Abrir Votação
              </button>
            </div>

            <!-- Interface de Votação (Item Atual) -->
            <div v-if="itemVotacaoAtual && itemVotacaoAtual.id === item.id && itemVotacaoAtual.tipo === item.tipo">
              <div v-if="sessao.status === 'votacao_aberta'" class="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                <h4 class="text-md font-semibold text-green-800 mb-3">Votação em Andamento</h4>
                
                <!-- Controles de Votação (Vereador) -->
                <div v-if="isVereador && !votouItemAtual" class="flex space-x-3 mb-3">
                  <button @click="registrarVotoHandler('sim')" :disabled="votingLoading" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">Sim</button>
                  <button @click="registrarVotoHandler('nao')" :disabled="votingLoading" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">Não</button>
                  <button @click="registrarVotoHandler('abstencao')" :disabled="votingLoading" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50">Abster-se</button>
                </div>
                <p v-if="isVereador && votouItemAtual" class="text-green-700 font-medium">Seu voto foi registrado.</p>

                <!-- Controles de Votação (Presidente) -->
                 <div v-if="isPresidente" class="mt-3">
                   <button 
                     @click="fecharVotacaoHandler" 
                     :disabled="controlLoading"
                     class="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50"
                   >
                     Fechar Votação
                   </button>
                 </div>
                 
                 <!-- Pedido de Vista (Vereador) -->
                 <div v-if="isVereador && !votouItemAtual" class="mt-3">
                    <button 
                      @click="pedirVistaHandler" 
                      :disabled="controlLoading || votingLoading"
                      class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 disabled:opacity-50"
                    >
                      Pedir Vista
                    </button>
                 </div>

              </div>

              <!-- Resultado da Votação -->
              <div v-if="resultadoVotacao" class="mt-4 p-4 bg-gray-100 border rounded">
                  <h4 class="text-md font-semibold mb-2">Resultado da Votação</h4>
                  <p>Sim: {{ resultadoVotacao.sim }}</p>
                  <p>Não: {{ resultadoVotacao.nao }}</p>
                  <p>Abstenções: {{ resultadoVotacao.abstencoes }}</p>
                  <p class="mt-2 font-semibold">Resultado: {{ resultadoVotacao.resultado }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- TODO: Adicionar Lista de Presença -->
      <!-- TODO: Adicionar Chat/Comunicações -->

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import sessoesService from '@/services/sessoesService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// Mock user data - substituir pela lógica real de autenticação e permissões
const currentUser = ref({ id: 1, role: 'presidente' }); // 'presidente', 'vereador', 'secretaria'
const isPresidente = computed(() => currentUser.value.role === 'presidente');
const isVereador = computed(() => currentUser.value.role === 'vereador');

const route = useRoute();
const router = useRouter();
const toast = useToast();

const sessaoId = ref(route.params.id);
const sessao = ref(null);
const pauta = ref([]);
const itemVotacaoAtual = ref(null); // { id: 1, tipo: 'Projeto' }
const resultadoVotacao = ref(null);
const loading = ref(false);
const loadingPauta = ref(false);
const error = ref(null);
const controlLoading = ref(false); // Para botões de controle (iniciar/encerrar/abrir/fechar)
const votingLoading = ref(false); // Para botões de voto
const votouItemAtual = ref(false); // Vereador já votou no item atual?

let pollInterval = null;

// --- Funções de Formatação ---
const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return '';
  try {
    const date = new Date(`${dateStr}T${timeStr}`);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch (e) {
    return 'Data/Hora inválida';
  }
};

const getTipoSessaoNome = (tipoId) => {
  // Idealmente, buscar os tipos de sessão e fazer o mapeamento
  // Mock por enquanto
  const tipos = { 1: 'Ordinária', 2: 'Extraordinária', 3: 'Solene' }; 
  return tipos[tipoId] || 'Desconhecido';
};

const formatStatus = (status) => {
  const statusMap = {
    agendada: 'Agendada',
    em_andamento: 'Em Andamento',
    votacao_aberta: 'Votação Aberta',
    encerrada: 'Encerrada',
    cancelada: 'Cancelada',
  };
  return statusMap[status] || status;
};

const statusClass = (status) => {
  switch (status) {
    case 'agendada': return 'text-blue-600 font-semibold';
    case 'em_andamento': return 'text-yellow-600 font-semibold';
    case 'votacao_aberta': return 'text-green-600 font-semibold';
    case 'encerrada': return 'text-gray-600 font-semibold';
    case 'cancelada': return 'text-red-600 font-semibold';
    default: return 'text-gray-600 font-semibold';
  }
};

// --- Funções de Carregamento de Dados ---
const fetchSessaoStatus = async () => {
  if (!sessaoId.value) return;
  try {
    const response = await sessoesService.getStatus(sessaoId.value);
    sessao.value = response.data.sessao; // Assumindo que a API retorna { sessao: {...}, item_votacao: {...}, resultado: {...} }
    itemVotacaoAtual.value = response.data.item_votacao; 
    resultadoVotacao.value = response.data.resultado;
    
    // Resetar flag de voto se o item mudou ou não há votação
    if (!itemVotacaoAtual.value || (itemVotacaoAtual.value.id !== resultadoVotacao.value?.itemId)) {
        votouItemAtual.value = false;
    }
    
    error.value = null;
  } catch (err) {
    console.error('Erro ao buscar status da sessão:', err);
    // Não mostrar toast a cada poll, talvez só no erro inicial
    // error.value = err.response?.data?.message || 'Falha ao buscar status.';
  }
};

const fetchPauta = async () => {
  if (!sessaoId.value) return;
  loadingPauta.value = true;
  try {
    const response = await sessoesService.getPauta(sessaoId.value);
    pauta.value = response.data || [];
  } catch (err) {
    console.error('Erro ao buscar pauta:', err);
    toast.error(err.response?.data?.message || 'Falha ao buscar pauta da sessão.');
  } finally {
    loadingPauta.value = false;
  }
};

const loadInitialData = async () => {
  loading.value = true;
  await fetchSessaoStatus(); // Carrega status inicial
  if (sessao.value) { // Se a sessão foi carregada com sucesso
      await fetchPauta();
      startPolling();
  } else {
      error.value = error.value || 'Sessão não encontrada ou falha ao carregar.';
  }
  loading.value = false;
};

// --- Polling para Atualizações --- 
const startPolling = () => {
  if (pollInterval) clearInterval(pollInterval);
  // Atualiza a cada 5 segundos, ajustar conforme necessário
  pollInterval = setInterval(fetchSessaoStatus, 5000); 
};

const stopPolling = () => {
  if (pollInterval) clearInterval(pollInterval);
  pollInterval = null;
};

onMounted(() => {
  loadInitialData();
});

onUnmounted(() => {
  stopPolling();
});

// --- Handlers de Ações ---

const iniciarSessaoHandler = async () => {
  controlLoading.value = true;
  try {
    await sessoesService.iniciarSessao(sessaoId.value);
    toast.success('Sessão iniciada com sucesso!');
    await fetchSessaoStatus(); // Atualiza status imediatamente
  } catch (err) {
    console.error('Erro ao iniciar sessão:', err);
    toast.error(err.response?.data?.message || 'Falha ao iniciar sessão.');
  } finally {
    controlLoading.value = false;
  }
};

const encerrarSessaoHandler = async () => {
  if (!confirm('Tem certeza que deseja encerrar esta sessão?')) return;
  controlLoading.value = true;
  try {
    await sessoesService.encerrarSessao(sessaoId.value);
    toast.success('Sessão encerrada com sucesso!');
    stopPolling(); // Para de atualizar após encerrar
    await fetchSessaoStatus(); 
  } catch (err) {
    console.error('Erro ao encerrar sessão:', err);
    toast.error(err.response?.data?.message || 'Falha ao encerrar sessão.');
  } finally {
    controlLoading.value = false;
  }
};

const abrirVotacaoHandler = async (item) => {
  controlLoading.value = true;
  try {
    // O backend precisa saber qual o tipo do item (projeto, proposicao, etc)
    // Assumindo que o backend usa o 'id' e 'tipo' do item da pauta
    await sessoesService.abrirVotacao(sessaoId.value, item.id, item.tipo); // Passar tipo se necessário
    toast.success(`Votação aberta para: ${item.titulo || item.numero}`);
    resultadoVotacao.value = null; // Limpa resultado anterior
    votouItemAtual.value = false; // Reseta para todos os vereadores
    await fetchSessaoStatus();
  } catch (err) {
    console.error('Erro ao abrir votação:', err);
    toast.error(err.response?.data?.message || 'Falha ao abrir votação.');
  } finally {
    controlLoading.value = false;
  }
};

const fecharVotacaoHandler = async () => {
  if (!itemVotacaoAtual.value) return;
  controlLoading.value = true;
  try {
    await sessoesService.fecharVotacao(sessaoId.value, itemVotacaoAtual.value.id, itemVotacaoAtual.value.tipo);
    toast.success('Votação encerrada.');
    await fetchSessaoStatus(); // Puxa o resultado final
  } catch (err) {
    console.error('Erro ao fechar votação:', err);
    toast.error(err.response?.data?.message || 'Falha ao fechar votação.');
  } finally {
    controlLoading.value = false;
  }
};

const registrarVotoHandler = async (voto) => {
  if (!itemVotacaoAtual.value || !isVereador.value) return;
  votingLoading.value = true;
  try {
    const votoData = { 
      vereadorId: currentUser.value.id, // ID do vereador logado
      voto: voto // 'sim', 'nao', 'abstencao'
    };
    await sessoesService.registrarVoto(sessaoId.value, itemVotacaoAtual.value.id, itemVotacaoAtual.value.tipo, votoData);
    toast.success('Voto registrado com sucesso!');
    votouItemAtual.value = true; // Marca que o vereador votou
    // Não precisa chamar fetchSessaoStatus aqui, o poll vai atualizar
  } catch (err) {
    console.error('Erro ao registrar voto:', err);
    toast.error(err.response?.data?.message || 'Falha ao registrar voto.');
  } finally {
    votingLoading.value = false;
  }
};

const pedirVistaHandler = async () => {
  if (!itemVotacaoAtual.value || !isVereador.value) return;
  if (!confirm('Tem certeza que deseja pedir vista deste item? A votação será interrompida.')) return;
  controlLoading.value = true; // Usar controlLoading ou votingLoading?
  try {
    await sessoesService.registrarPedidoVista(sessaoId.value, itemVotacaoAtual.value.id, itemVotacaoAtual.value.tipo, currentUser.value.id);
    toast.success('Pedido de vista registrado com sucesso!');
    await fetchSessaoStatus(); // Atualiza o status da sessão/votação
  } catch (err) {
    console.error('Erro ao pedir vista:', err);
    toast.error(err.response?.data?.message || 'Falha ao registrar pedido de vista.');
  } finally {
    controlLoading.value = false;
  }
};

</script>

<style>

</style>

