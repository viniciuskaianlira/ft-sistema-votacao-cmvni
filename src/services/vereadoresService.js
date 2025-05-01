import api from './api';

const vereadoresService = {
  getAll: (id = null) => {
    const url = id ? `/vereador/${id}` : '/vereador';
    return api.get(url);
  },

  create: (data) => {
    return api.post('/vereador', data);
  },

  update: (id, data) => {
    return api.put(`/vereador/${id}`, data);
  },

  delete: (id) => {
    return api.delete(`/vereador/${id}`);
  },
};

export default vereadoresService;

