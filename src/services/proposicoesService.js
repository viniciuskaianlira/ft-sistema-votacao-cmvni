import api from './api';

const proposicoesService = {
  // Funções CRUD básicas
  getProposicoes: (params) => api.get('/proposicoes', { params }), // Adicionado params para filtros/paginaçãose necessário
  getProposicaoById: (id) => api.get(`/proposicoes/${id}`),
  createProposicao: (data) => api.post('/proposicoes', data),
  updateProposicao: (id, data) => api.put(`/proposicoes/${id}`, data),
  deleteProposicao: (id) => api.delete(`/proposicoes/${id}`),

  // Funções para buscar dados relacionados (Ex: tipos, vereadores para proponentes)
  // Adapte conforme a necessidade e as rotas do backend
  getTiposProposicao: () => api.get('/tipos_proposicao'), // Exemplo
  getVereadores: () => api.get('/vereadores'), // Reutilizar se já existir

  // Funções para Proponentes (similar a Projetos, se aplicável)
  getProponentesProposicao: (proposicaoId) => api.get(`/proposicoes/${proposicaoId}/proponentes`),
  updateProponentesProposicao: (proposicaoId, proponentesIds) => api.put(`/proposicoes/${proposicaoId}/proponentes`, { proponentes: proponentesIds }),

  // Funções para Arquivos (similar a Projetos, se aplicável)
  getArquivosProposicao: (proposicaoId) => api.get(`/proposicoes/${proposicaoId}/arquivos`),
  uploadArquivoProposicao: (proposicaoId, formData) => api.post(`/proposicoes/${proposicaoId}/arquivos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteArquivoProposicao: (proposicaoId, arquivoId) => api.delete(`/proposicoes/${proposicaoId}/arquivos/${arquivoId}`),
};

export default proposicoesService;

