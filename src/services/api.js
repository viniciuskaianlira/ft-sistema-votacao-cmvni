import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    // pega o token que você salvou no LoginView.vue
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export default api
