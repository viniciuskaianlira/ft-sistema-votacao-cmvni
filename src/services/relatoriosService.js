import api from './api';

const relatoriosService = {
  // Buscar lista de sessões encerradas (para seleção no relatório)
  getSessoesEncerradas: () => api.get('/sessoes', { params: { status: 'encerrada' } }), // Filtrar por status encerrada

  // Buscar relatório de votos de uma sessão específica
  getRelatorioVotos: (sessaoId) => api.get(`/relatorios/sessoes/${sessaoId}/votos`),
  // Exemplo de retorno esperado:
  // {
  //   sessaoInfo: { id: 1, data: '...', tipo: '...' },
  //   itensVotados: [
  //     { 
  //       itemInfo: { id: 10, tipo: 'Projeto', titulo: '...' },
  //       resultado: { sim: 8, nao: 2, abstencoes: 1, total: 11, resultado: 'Aprovado' },
  //       votosIndividuais: [
  //         { vereador: { id: 1, nome: 'Vereador A' }, voto: 'sim' },
  //         { vereador: { id: 2, nome: 'Vereador B' }, voto: 'nao' },
  //         // ...
  //       ]
  //     },
  //     // ... outros itens
  //   ]
  // }

  // Buscar relatório de presença de uma sessão específica
  getRelatorioPresenca: (sessaoId) => api.get(`/relatorios/sessoes/${sessaoId}/presenca`),
  // Exemplo de retorno esperado:
  // {
  //   sessaoInfo: { id: 1, data: '...', tipo: '...' },
  //   presentes: [
  //     { vereador: { id: 1, nome: 'Vereador A' }, horario_entrada: '...', horario_saida: '...' },
  //     // ...
  //   ],
  //   ausentes: [
  //     { vereador: { id: 5, nome: 'Vereador E' } },
  //     // ...
  //   ]
  // }

  // --- Funções de Exportação (Exemplos - dependem do backend) ---
  
  // Exportar Relatório de Votos (PDF/Excel)
  exportRelatorioVotos: (sessaoId, formato = 'pdf') => api.get(`/relatorios/sessoes/${sessaoId}/votos/export?formato=${formato}`, {
    responseType: 'blob', // Importante para download de arquivos
  }),

  // Exportar Relatório de Presença (PDF/Excel)
  exportRelatorioPresenca: (sessaoId, formato = 'pdf') => api.get(`/relatorios/sessoes/${sessaoId}/presenca/export?formato=${formato}`, {
    responseType: 'blob',
  }),
};

export default relatoriosService;

