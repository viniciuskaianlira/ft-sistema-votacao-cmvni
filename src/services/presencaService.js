import api from './api';

const presencaService = {
  // Buscar vereadores para listar na tela de presença
  getVereadores: () => api.get('/vereadores'), // Reutilizar serviço existente se possível

  // Buscar status de presença atual para uma sessão
  getPresencaStatus: (sessaoId) => api.get(`/sessoes/${sessaoId}/presenca`),
  // Exemplo de retorno:
  // {
  //   sessaoInfo: { id: 1, data: '...', status: 'em_andamento' },
  //   listaPresenca: [
  //     { vereador: { id: 1, nome: 'Vereador A' }, presente: true, horario_entrada: '...' },
  //     { vereador: { id: 2, nome: 'Vereador B' }, presente: false, horario_entrada: null },
  //     // ...
  //   ]
  // }

  // Registrar presença/ausência de um vereador (manual)
  registrarPresenca: (sessaoId, vereadorId, presente) => api.post(`/sessoes/${sessaoId}/presenca`, { vereadorId, presente }), // presente: true/false

  // Registrar entrada/saída (poderia ser combinado com o acima ou separado)
  registrarEntrada: (sessaoId, vereadorId) => api.post(`/sessoes/${sessaoId}/presenca/entrada`, { vereadorId }),
  registrarSaida: (sessaoId, vereadorId) => api.post(`/sessoes/${sessaoId}/presenca/saida`, { vereadorId }),

};

export default presencaService;

