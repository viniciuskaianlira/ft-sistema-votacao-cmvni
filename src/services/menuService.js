import axios from 'axios';

export async function fetchMenu() {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:3000/api/menu', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.menu;
}
