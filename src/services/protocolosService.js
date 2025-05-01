import api from './api';

const protocolosService = {
  getAll: (id = null) => {
    const url = id ? `/protocolo/${id}` : '/protocolo';
    return api.get(url);
  },

  create: (data) => {
    return api.post( '/protocolo', data);
  },

  update: (id, data) => {
    return api.put( `/protocolo/${id}`, data);
  },

  delete: (id) => {
    return api.delete(`/protocolo/${id}`);
  },
  
  // Adicionar métodos específicos para histórico se necessário
  getHistorico: (protocoloId) => {
    return api.get( `/protocolo/${protocoloId}/historico`); // Supondo uma rota para histórico
  }
};

export default protocolosService;

