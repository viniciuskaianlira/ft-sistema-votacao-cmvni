import api from './api';

const sessoesService = {
  // Funções CRUD existentes
  getAll: () => api.get('/sessoes'),
  getById: (id) => api.get(`/sessoes/${id}`),
  create: (data) => api.post('/sessoes', data),
  update: (id, data) => api.put(`/sessoes/${id}`, data),
  delete: (id) => api.delete(`/sessoes/${id}`),
  getTiposSessao: () => api.get('/tipos_sessao'), // Assumindo que existe

  // --- Novas Funções para Controle da Sessão ---

  // Iniciar/Encerrar Sessão
  iniciarSessao: (id) => api.post(`/sessoes/${id}/iniciar`),
  encerrarSessao: (id) => api.post(`/sessoes/${id}/encerrar`),

  // Controle de Votação (Exemplos)
  abrirVotacao: (sessaoId, itemId) => api.post(`/sessoes/${sessaoId}/votacao/${itemId}/abrir`),
  fecharVotacao: (sessaoId, itemId) => api.post(`/sessoes/${sessaoId}/votacao/${itemId}/fechar`),
  registrarVoto: (sessaoId, itemId, votoData) => api.post(`/sessoes/${sessaoId}/votacao/${itemId}/votar`, votoData), // votoData = { vereadorId: x, voto: 'sim'/'nao'/'abstencao' }
  getResultadoVotacao: (sessaoId, itemId) => api.get(`/sessoes/${sessaoId}/votacao/${itemId}/resultado`),

  // Pedido de Vista
  registrarPedidoVista: (sessaoId, itemId, vereadorId) => api.post(`/sessoes/${sessaoId}/votacao/${itemId}/pedir_vista`, { vereadorId }),

  // Obter Pauta/Itens da Sessão
  getPauta: (sessaoId) => api.get(`/sessoes/${sessaoId}/pauta`), // Retorna itens a serem votados

  // Obter Status da Sessão (incluindo votação atual, se houver)
  getStatus: (sessaoId) => api.get(`/sessoes/${sessaoId}/status`),

};

export default sessoesService;

