import api from './api';

const legislaturasService = {
  getAll: () => api.get('/legislaturas'), // Ajustar endpoint conforme backend
  getById: (id) => api.get(`/legislaturas/${id}`), // Ajustar endpoint
  create: (data) => api.post('/legislaturas', data), // Ajustar endpoint
  update: (id, data) => api.put(`/legislaturas/${id}`, data), // Ajustar endpoint
  delete: (id) => api.delete(`/legislaturas/${id}`), // Ajustar endpoint
};

export default legislaturasService;

