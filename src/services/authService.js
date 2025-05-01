import api from './api.js';
// import api from '/src/services/api.js'

const authService = {
  login: (credentials) => {
    return api.post('/login', credentials);
  },

  // Função para obter dados do usuário logado (exemplo, pode precisar ajustar)
  getMe: () => {
    // Supondo que o backend tenha uma rota /me ou similar para obter dados do usuário autenticado
    return api.get('/me'); 
  },

  // Função de logout (exemplo)
  logout: () => {
    // Limpar token e dados do usuário do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Pode ser necessário invalidar o token no backend também
    // return api.post('/logout'); // Se houver endpoint de logout
    return Promise.resolve(); // Retorna uma promessa resolvida para consistência
  }
};

export default authService;

