import api from './api';

const mesaDiretoraService = {
  get: (id = null) => {
    // A rota exata pode variar dependendo da implementação do backend
    // Exemplo: buscar a composição atual ou por legislatura
    const url = id ? `/mesadiretora/${id}` :  '/mesadiretora/atual'; // Ajustar conforme necessário
    return api.get(url);
  },

  // Pode haver outras operações como criar/atualizar composição, dependendo dos requisitos
  create: (data) => {
    return api.post('/mesadiretora', data);
  },

  update: (id, data) => {
    return api.put(`/mesadiretora/${id}`, data);
  },
};

export default mesaDiretoraService;

