import api from './api';

const legislaturasService = {
  getAll: () => api.get('/legislatura'), // Ajustar endpoint conforme backend
  getById: (id) => api.get(`/legislatura/${id}`), // Ajustar endpoint
  create: (data) => api.post('/legislatura', data), // Ajustar endpoint
  update: (id, data) => api.put(`/legislatura/${id}`, data), // Ajustar endpoint
  delete: (id) => api.delete(`/legislatura/${id}`), // Ajustar endpoint
};

export default legislaturasService;

