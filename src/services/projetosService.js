
import api from './api';

const projetosService = {
  // Funções CRUD existentes (simplificadas para exemplo)
  getProjetos: () => api.get('/projetos'),
  getProjetoById: (id) => api.get(`/projetos/${id}`),
  createProjeto: (data) => api.post('/projetos', data),
  updateProjeto: (id, data) => api.put(`/projetos/${id}`, data),
  deleteProjeto: (id) => api.delete(`/projetos/${id}`),

  // Função para buscar tipos de projeto (já existente)
  getTiposProjeto: () => api.get('/tipos_projeto'), // Assumindo que existe essa rota

  // --- Novas Funções --- 

  // Funções para Proponentes
  getProponentesProjeto: (projetoId) => api.get(`/projetos/${projetoId}/proponentes`),
  addProponenteProjeto: (projetoId, vereadorId) => api.post(`/projetos/${projetoId}/proponentes`, { vereadorId }),
  removeProponenteProjeto: (projetoId, vereadorId) => api.delete(`/projetos/${projetoId}/proponentes/${vereadorId}`),
  updateProponentesProjeto: (projetoId, proponentesIds) => api.put(`/projetos/${projetoId}/proponentes`, { proponentes: proponentesIds }), // Rota para atualizar todos de uma vez

  // Funções para Arquivos
  getArquivosProjeto: (projetoId) => api.get(`/projetos/${projetoId}/arquivos`),
  uploadArquivoProjeto: (projetoId, formData) => api.post(`/projetos/${projetoId}/arquivos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteArquivoProjeto: (projetoId, arquivoId) => api.delete(`/projetos/${projetoId}/arquivos/${arquivoId}`),
};

export default projetosService;

