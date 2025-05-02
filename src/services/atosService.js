import api from './api';

const atosService = {
  // Funções CRUD básicas
  getAtos: (params) => api.get('/atos', { params }),
  getAtoById: (id) => api.get(`/atos/${id}`),
  createAto: (data) => api.post('/atos', data),
  updateAto: (id, data) => api.put(`/atos/${id}`, data),
  deleteAto: (id) => api.delete(`/atos/${id}`),

  // Funções para buscar dados relacionados (Ex: tipos de ato)
  getTiposAto: () => api.get('/tipos_ato'), // Exemplo, adaptar se necessário

  // Funções para Arquivos (se Atos tiverem arquivos associados)
  getArquivosAto: (atoId) => api.get(`/atos/${atoId}/arquivos`),
  uploadArquivoAto: (atoId, formData) => api.post(`/atos/${atoId}/arquivos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteArquivoAto: (atoId, arquivoId) => api.delete(`/atos/${atoId}/arquivos/${arquivoId}`),
};

export default atosService;

