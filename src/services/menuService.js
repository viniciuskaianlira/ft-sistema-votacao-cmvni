import axios from 'axios';

export async function fetchMenu() {
  try {
    const token = localStorage.getItem('token');
    // console.log('Token vindo do localStorage:', token);

    const response = await axios.get('http://localhost:3000/api/menu', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.menu;
  } catch (err) {
    if (err.response?.status === 401) {
      // Token expirado ou inválido: limpar storage e redirecionar para login
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
      // window.location.href = '/';
    }
    throw err;
  }
}
