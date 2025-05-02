import api from './api';

const cargosService = {
  getAll: (params) => api.get('/cargos', { params }),
  getById: (id) => api.get(`/cargos/${id}`),
  create: (data) => api.post('/cargos', data),
  update: (id, data) => api.put(`/cargos/${id}`, data),
  delete: (id) => api.delete(`/cargos/${id}`),
};

export default cargosService;

