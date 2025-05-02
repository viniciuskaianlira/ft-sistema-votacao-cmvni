import api from './api';

const oficiosService = {
  // Funções CRUD básicas
  getOficios: (params) => api.get('/oficios', { params }),
  getOficioById: (id) => api.get(`/oficios/${id}`),
  createOficio: (data) => api.post('/oficios', data),
  updateOficio: (id, data) => api.put(`/oficios/${id}`, data),
  deleteOficio: (id) => api.delete(`/oficios/${id}`),

  // Funções para buscar dados relacionados (Ex: destinatários, tipos)
  // Adapte conforme a necessidade e as rotas do backend
  getDestinatarios: () => api.get('/destinatarios'), // Exemplo

  // Funções para Arquivos (se Ofícios tiverem arquivos associados)
  getArquivosOficio: (oficioId) => api.get(`/oficios/${oficioId}/arquivos`),
  uploadArquivoOficio: (oficioId, formData) => api.post(`/oficios/${oficioId}/arquivos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteArquivoOficio: (oficioId, arquivoId) => api.delete(`/oficios/${oficioId}/arquivos/${arquivoId}`),
};

export default oficiosService;

