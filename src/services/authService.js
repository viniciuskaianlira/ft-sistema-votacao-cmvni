import api from './api.js';
import jwtDecode from 'jwt-decode';

const authService = {
  login: (credentials) => {
    return api.post('/login', credentials)
      .then(response => {
        authService.setToken(response.data.token);
        return response;
      });
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isTokenExpired: () => {
    const token = authService.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true; // Invalid token
    }
  },

  refreshToken: () => {
    // Assuming there's a /refresh endpoint
    return api.post('/refresh')
      .then(response => {
        authService.setToken(response.data.token);
        return response;
      })
      .catch(error => {
        authService.logout();
        return Promise.reject(error);
      });
  },

  // Função para obter dados do usuário logado (exemplo, pode precisar ajustar)
  getMe: () => {
    // Supondo que o backend tenha uma rota /me ou similar para obter dados do usuário autenticado
    return api.get('/me');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //Redirect to login
    window.location.href = '/login';
    return Promise.resolve();
  },

  isTokenAboutToExpire: () => {
    const token = authService.getToken();
    if (!token) return false;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const tenMinutesInSeconds = 600;
    return decoded.exp - currentTime < tenMinutesInSeconds;
  }
};

export default authService;

