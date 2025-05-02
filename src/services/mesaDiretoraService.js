import api from './api';

const mesaDiretoraService = {
  // Busca a composição da mesa para uma legislatura específica
  getByLegislatura: (legislaturaId) => {
    return api.get(`/mesadiretora/legislatura/${legislaturaId}`); // Ajustar endpoint conforme backend
  },

  // Salva ou atualiza a composição da mesa para uma legislatura
  saveComposition: (legislaturaId, composicao) => {
    // O backend pode usar PUT ou POST dependendo se é criação ou atualização
    // Este exemplo usa PUT para atualizar a composição de uma legislatura existente
    return api.put(`/mesadiretora/legislatura/${legislaturaId}`, { composicao }); // Ajustar endpoint e payload
  },

  // Manter métodos antigos se ainda forem úteis ou remover
  // get: (id = null) => { ... }, 
  // create: (data) => { ... },
  // update: (id, data) => { ... },
};

export default mesaDiretoraService;

