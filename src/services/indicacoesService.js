import api from './api';

const indicacoesService = {
  getAll: (params = {}) => {
    return api.get('/indicacao', { params });
  },

  getById: (id) => {
    return api.get(`/indicacao/${id}`);
  },

  create: (data) => {
    // O backend pode precisar de um endpoint que aceite FormData se houver upload de arquivo inicial
    // Ou pode ser um processo em duas etapas: criar a indicação, depois fazer upload
    return api.post('/indicacao', data);
  },

  update: (id, data) => {
    return api.put(`/indicacao/${id}`, data);
  },

  delete: (id) => {
    return api.delete(`/indicacao/${id}`);
  },

  // Proponentes (assumindo endpoints específicos)
  getProponentes: (indicacaoId) => {
    return api.get(`/indicacao/${indicacaoId}/proponentes`);
  },

  addProponente: (indicacaoId, vereadorId) => {
    return api.post(`/indicacao/${indicacaoId}/proponentes`, { vereador_id: vereadorId });
  },

  removeProponente: (indicacaoId, vereadorId) => {
    // O método pode ser DELETE ou outro, dependendo da API
    return api.delete(`/indicacao/${indicacaoId}/proponentes/${vereadorId}`);
  },

  // Arquivos (assumindo endpoints específicos)
  getArquivos: (indicacaoId) => {
    return api.get(`/indicacao/${indicacaoId}/arquivos`);
  },

  uploadArquivo: (indicacaoId, formData) => {
    // formData deve ser um objeto FormData contendo o arquivo
    return api.post(`/indicacao/${indicacaoId}/arquivos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteArquivo: (indicacaoId, arquivoId) => {
    return api.delete(`/indicacao/${indicacaoId}/arquivos/${arquivoId}`);
  },
};

export default indicacoesService;

