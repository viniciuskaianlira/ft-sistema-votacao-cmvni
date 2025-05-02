import api from './api';

const permissionsService = {
  getAll: () => api.get('/permissions'), // Ajustar endpoint conforme backend
};

export default permissionsService;

