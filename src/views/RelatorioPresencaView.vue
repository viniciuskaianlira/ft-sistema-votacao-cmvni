<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-semibold mb-6">Relatório de Presença da Sessão</h1>

    <!-- Seleção da Sessão -->
    <div class="mb-6">
      <label for="sessaoSelect" class="block text-sm font-medium text-gray-700 mb-1">Selecione a Sessão Encerrada</label>
      <select 
        id="sessaoSelect" 
        v-model="selectedSessaoId" 
        @change="loadRelatorioPresenca" 
        class="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        :disabled="loadingSessoes"
      >
        <option value="" disabled>{{ loadingSessoes ? 'Carregando sessões...' : 'Selecione...' }}</option>
        <option v-for="sessao in sessoesEncerradas" :key="sessao.id" :value="sessao.id">
          {{ formatSessaoOption(sessao) }}
        </option>
      </select>
    </div>

    <div v-if="loadingRelatorio" class="text-center py-10">
      <p class="text-gray-600">Carregando relatório...</p>
    </div>
    <div v-else-if="errorRelatorio" class="text-red-600 p-4">
      <p>Erro ao carregar relatório: {{ errorRelatorio }}</p>
    </div>
    <div v-else-if="relatorioData" class="border rounded-lg shadow-sm overflow-hidden">
      <!-- Cabeçalho do Relatório -->
      <div class="bg-gray-50 p-4 border-b">
        <h2 class="text-xl font-semibold">Sessão {{ getTipoSessaoNome(relatorioData.sessaoInfo.tipo_sessao_id) }} - {{ formatDateTime(relatorioData.sessaoInfo.data_sessao, relatorioData.sessaoInfo.hora_inicio) }}</h2>
        <div class="mt-4 flex space-x-3">
          <button @click="exportRelatorio('pdf')" :disabled="exporting" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition">
            {{ exporting ? 'Exportando PDF...' : 'Exportar PDF' }}
          </button>
          <button @click="exportRelatorio('xlsx')" :disabled="exporting" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition">
             {{ exporting ? 'Exportando Excel...' : 'Exportar Excel' }}
          </button>
         </div>
      </div>

      <!-- Lista de Presentes -->
      <div class="p-4">
        <h3 class="text-lg font-medium mb-4">Vereadores Presentes ({{ relatorioData.presentes?.length || 0 }})</h3>
        <div v-if="relatorioData.presentes && relatorioData.presentes.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Vereador</th>
                <th scope="col" class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                <th scope="col" class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Saída</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="presenca in relatorioData.presentes" :key="presenca.vereador.id">
                <td class="px-4 py-2 whitespace-nowrap">{{ presenca.vereador.nome }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ formatTime(presenca.horario_entrada) || '-' }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ formatTime(presenca.horario_saida) || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="text-gray-500">Nenhum vereador presente registrado.</p>
      </div>

      <!-- Lista de Ausentes -->
      <div class="p-4 border-t">
        <h3 class="text-lg font-medium mb-4">Vereadores Ausentes ({{ relatorioData.ausentes?.length || 0 }})</h3>
        <div v-if="relatorioData.ausentes && relatorioData.ausentes.length > 0">
          <ul class="list-disc list-inside text-sm">
            <li v-for="ausente in relatorioData.ausentes" :key="ausente.vereador.id">
              {{ ausente.vereador.nome }}
            </li>
          </ul>
        </div>
        <p v-else class="text-gray-500">Nenhum vereador ausente registrado.</p>
      </div>

      </div>
     <div v-else-if="selectedSessaoId" class="p-4 text-gray-500">
        Nenhum dado de presença encontrado para a sessão selecionada.
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import relatoriosService from '@/services/relatoriosService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import FileSaver from 'file-saver';

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
    const date = new Date(`${dateStr}T00:00:00`);
    return format(date, "dd/MM/yyyy", { locale: ptBR }) + timeSuffix;
  } catch (e) {
    return 'Data inválida';
  }
};

const formatTime = (dateTimeStr) => {
    if (!dateTimeStr) return null;
    try {
        const date = new Date(dateTimeStr);
        return format(date, "HH:mm:ss", { locale: ptBR });
    } catch (e) {
        return '-';
    }
};

const formatSessaoOption = (sessao) => {
    return `${getTipoSessaoNome(sessao.tipo_sessao_id)} - ${formatDateTime(sessao.data_sessao, sessao.hora_inicio)}`;
};

const getTipoSessaoNome = (tipoId) => {
  // Mock
  const tipos = { 1: 'Ordinária', 2: 'Extraordinária', 3: 'Solene' }; 
  return tipos[tipoId] || 'Desconhecido';
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

const loadRelatorioPresenca = async () => {
  if (!selectedSessaoId.value) {
    relatorioData.value = null;
    errorRelatorio.value = null;
    return;
  }
  loadingRelatorio.value = true;
  errorRelatorio.value = null;
  relatorioData.value = null;
  try {
    const response = await relatoriosService.getRelatorioPresenca(selectedSessaoId.value);
    relatorioData.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar relatório de presença:', error);
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
        const response = await relatoriosService.exportRelatorioPresenca(selectedSessaoId.value, formato);
        
        const contentDisposition = response.headers['content-disposition'];
        let filename = `relatorio_presenca_sessao_${selectedSessaoId.value}.${formato}`;
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
