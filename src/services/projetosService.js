import api from './api';

const projetosService = {
  getAll: (id = null) => {
    const url = id ? `/projeto/${id}` : '/projeto';
    return api.get(url);
  },

  create: (data) => {
    // Pode precisar ajustar para enviar como FormData se houver upload de arquivos
    return api.post('/projeto', data);
  },

  update: (id, data) => {
    // Pode precisar ajustar para enviar como FormData se houver upload de arquivos
    return api.put(`/projeto/${id}`, data);
  },

  delete: (id) => {
    return api.delete(`/projeto/${id}`);
  },

  // Exemplo: buscar tipos de projeto (se houver endpoint)
  getTipos: () => {
    return api.get('/tipoprojeto');
  },

  // Exemplo: buscar proponentes (vereadores) (se houver endpoint)
  getProponentes: () => {
    return api.get('/vereador'); // Ajustar se a rota for diferente
  }
};

export default projetosService;

