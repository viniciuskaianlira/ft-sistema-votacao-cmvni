import api from './api';

const indicacoesService = {
  getAll: (id = null) => {
    const url = id ? `/indicacao/${id}` : '/indicacao';
    return api.get(url);
  },

  create: (data) => {
    return api.post('/indicacao', data);
  },

  update: (id, data) => {
    return api.put(`/indicacao/${id}`, data);
  },

  delete: (id) => {
    return api.delete(`/indicacao/${id}`);
  },
};

export default indicacoesService;

