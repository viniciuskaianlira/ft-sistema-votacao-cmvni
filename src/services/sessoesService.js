import api from './api';

const sessoesService = {
  getAll: (id = null) => {
    const url = id ? `/sessao/${id}` : '/sessao	'; // Ajustar endpoint se necessário
    return api.get(url);
  },

  create: (data) => {
    // Formato da data/hora pode precisar de ajuste para o backend
    return api.post('/sessao', data);
  },

  update: (id, data) => {
    return api.put(`/sessao/${id}`, data);
  },

  delete: (id) => {
    return api.delete(`/sessao/${id}`);
  },

  // Exemplo: buscar tipos de sessão (se houver endpoint)
  getTiposSessao: () => {
    return api.get('/tiposessao'); // Ajustar endpoint
    // Mock data se não houver endpoint ainda
    return Promise.resolve({ data: [{id: 1, nome: 'Ordinária'}, {id: 2, nome: 'Extraordinária'}, {id: 3, nome: 'Solene'}] });
  },

  // Funções relacionadas ao controle da sessão (iniciar, encerrar, etc.) podem ser adicionadas aqui
  iniciar: (id) => { 
    return api.post(`/sessao/${id}/iniciar`); 
  },
  encerrar: (id) => {
    return api.post( `/sessao/${id}/encerrar`); 
  },
};

export default sessoesService;

