<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-semibold mb-6">Relatório de Votos da Sessão</h1>

    <!-- Seleção da Sessão -->
    <div class="mb-6">
      <label for="sessaoSelect" class="block text-sm font-medium text-gray-700 mb-1">Selecione a Sessão Encerrada</label>
      <select 
        id="sessaoSelect" 
        v-model="selectedSessaoId" 
        @change="loadRelatorioVotos" 
        class="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        :disabled="loadingSessoes"
      >
        <option value="" disabled>{{ loadingSessoes ? 'Carregando sessões...' : 'Selecione...' }}</option>
        <option v-for="sessao in sessoesEncerradas" :key="sessao.id" :value="sessao.id">
          {{ formatSessaoOption(sessao) }}
        </option>
      </select>
    </div>

    <!-- Conteúdo do Relatório -->
    <div v-if="loadingRelatorio" class="text-center py-10 text-gray-500">
      <p>Carregando relatório...</p>
      <!-- Adicionar spinner -->
    </div>
    <div v-else-if="errorRelatorio" class="text-red-600">
      <p>Erro ao carregar relatório: {{ errorRelatorio }}</p>
    </div>
    <div v-else-if="relatorioData" class="border rounded-lg shadow-sm overflow-hidden">
      <!-- Cabeçalho do Relatório -->
      <div class="bg-gray-100 p-4 border-b">
        <h2 class="text-xl font-semibold">Sessão {{ getTipoSessaoNome(relatorioData.sessaoInfo.tipo_sessao_id) }} - {{ formatDateTime(relatorioData.sessaoInfo.data_sessao, relatorioData.sessaoInfo.hora_inicio) }}</h2>
        <div class="mt-4 flex space-x-3">
          <button @click="exportRelatorio('pdf')" :disabled="exporting" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50">            {{ exporting ? 'Exportando PDF...' : 'Exportar PDF' }}
          </button>
          <button @click="exportRelatorio('xlsx')" :disabled="exporting" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50">
             {{ exporting ? 'Exportando Excel...' : 'Exportar Excel' }}          </button>
        </div>
      </div>

      <!-- Itens Votados -->
      <div v-if="relatorioData.itensVotados && relatorioData.itensVotados.length > 0" class="p-4">
        <h3 class="text-lg font-medium mb-4">Itens Votados</h3>
        <div v-for="(itemVotado, index) in relatorioData.itensVotados" :key="index" class="mb-6 pb-4 border-b last:border-b-0">
          <h4 class="font-semibold mb-1">{{ itemVotado.itemInfo.titulo || itemVotado.itemInfo.numero }} ({{ itemVotado.itemInfo.tipo }})</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm">
            <div><span class="font-medium">Sim:</span> {{ itemVotado.resultado.sim }}</div>
            <div><span class="font-medium">Não:</span> {{ itemVotado.resultado.nao }}</div>
            <div><span class="font-medium">Abstenções:</span> {{ itemVotado.resultado.abstencoes }}</div>
            <div class="md:col-span-3"><span class="font-medium">Resultado Final:</span> <span class="font-semibold">{{ itemVotado.resultado.resultado }}</span></div>
          </div>
          
          <!-- Table of Individual Votes -->
        <details class="mt-2">
          <summary class="cursor-pointer text-blue-600 hover:underline text-sm">Ver votos individuais</summary>
          <div class="mt-2 overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Vereador</th>
                  <th scope="col" class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Voto</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="voto in itemVotado.votosIndividuais" :key="voto.vereador.id">
                  <td class="px-4 py-2 whitespace-nowrap">{{ voto.vereador.nome }}</td>
                  <td class="px-4 py-2 whitespace-nowrap uppercase" :class="votoClass(voto.voto)">{{ voto.voto }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        </div>
      </div>
      <div v-else class="p-4 text-gray-500">
        Nenhum item foi votado nesta sessão.
      </div>
    </div>
    <div v-else-if="selectedSessaoId" class="p-4 text-gray-500">
        Nenhum dado de votação encontrado para a sessão selecionada.
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import relatoriosService from '@/services/relatoriosService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import FileSaver from 'file-saver'; // Para salvar arquivos exportados

const toast = useToast();
const sessoesEncerradas = ref([]);
const selectedSessaoId = ref('');
const relatorioData = ref(null);
const loadingSessoes = ref(false);
const loadingRelatorio = ref(false);
const errorRelatorio = ref(null);
const exporting = ref(false);

// --- Funções de Formatação ---
const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr) return '';
  const timeSuffix = timeStr ? ` às ${timeStr.substring(0, 5)}` : '';
  try {
    // Adiciona T00:00:00 para garantir que a data seja interpretada corretamente
    const date = new Date(`${dateStr}T00:00:00`); 
    return format(date, "dd/MM/yyyy", { locale: ptBR }) + timeSuffix;
  } catch (e) {
    return 'Data inválida';
  }
};

const formatSessaoOption = (sessao) => {
    return `${getTipoSessaoNome(sessao.tipo_sessao_id)} - ${formatDateTime(sessao.data_sessao, sessao.hora_inicio)}`;
};

const getTipoSessaoNome = (tipoId) => {
  // Mock - Idealmente viria do backend ou de um enum/constante
  const tipos = { 1: 'Ordinária', 2: 'Extraordinária', 3: 'Solene' }; 
  return tipos[tipoId] || 'Desconhecido';
};

const votoClass = (voto) => {
    switch (voto?.toLowerCase()) {
        case 'sim': return 'text-green-600 font-semibold';
        case 'nao': return 'text-red-600 font-semibold';
        case 'abstencao': return 'text-gray-500 font-semibold';
        default: return '';
    }
};

// --- Carregamento de Dados ---
const loadSessoesEncerradas = async () => {
  loadingSessoes.value = true;
  try {
    const response = await relatoriosService.getSessoesEncerradas();
    sessoesEncerradas.value = response.data || [];
  } catch (error) {
    console.error('Erro ao buscar sessões encerradas:', error);
    toast.error('Falha ao carregar lista de sessões.');
  } finally {
    loadingSessoes.value = false;
  }
};

const loadRelatorioVotos = async () => {
  if (!selectedSessaoId.value) {
    relatorioData.value = null;
    errorRelatorio.value = null;
    return;
  }
  loadingRelatorio.value = true;
  errorRelatorio.value = null;
  relatorioData.value = null;
  try {
    const response = await relatoriosService.getRelatorioVotos(selectedSessaoId.value);
    relatorioData.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar relatório de votos:', error);
    errorRelatorio.value = error.response?.data?.message || 'Falha ao carregar dados do relatório.';
    toast.error(errorRelatorio.value);
  } finally {
    loadingRelatorio.value = false;
  }
};

onMounted(() => {
  loadSessoesEncerradas();
});

// --- Exportação ---
const exportRelatorio = async (formato) => {
    if (!selectedSessaoId.value) return;
    exporting.value = true;
    try {
        const response = await relatoriosService.exportRelatorioVotos(selectedSessaoId.value, formato);
        
        // Extrai o nome do arquivo do header Content-Disposition, se disponível
        const contentDisposition = response.headers['content-disposition'];
        let filename = `relatorio_votos_sessao_${selectedSessaoId.value}.${formato}`;
        if (contentDisposition) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) { 
                filename = matches[1].replace(/['"]/g, '');
            }
        }

        FileSaver.saveAs(response.data, filename);
        toast.success(`Relatório exportado como ${filename}`);

    } catch (error) {
        console.error(`Erro ao exportar relatório em ${formato}:`, error);
        toast.error(`Falha ao exportar relatório em ${formato}.`);
    } finally {
        exporting.value = false;
    }
};

</script>
<style>
  details > summary {
    list-style: none;
  }
  details > summary::-webkit-details-marker {
    display: none;
  }
</style>

