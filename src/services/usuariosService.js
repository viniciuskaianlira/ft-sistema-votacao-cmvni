import api from './api';

const usuariosService = {
  getAll: () => api.get('/users'), // Ajustar endpoint conforme backend
  getById: (id) => api.get(`/users/${id}`), // Ajustar endpoint
  create: (data) => api.post('/users', data), // Ajustar endpoint
  update: (id, data) => api.put(`/users/${id}`, data), // Ajustar endpoint
  delete: (id) => api.delete(`/users/${id}`), // Ajustar endpoint

  // Permissões do usuário
  getUserPermissions: (userId) => api.get(`/users/${userId}/permissions`), // Ajustar endpoint
  updateUserPermissions: (userId, permissionIds) => api.put(`/users/${userId}/permissions`, { permissions: permissionIds }), // Ajustar endpoint
};

export default usuariosService;

