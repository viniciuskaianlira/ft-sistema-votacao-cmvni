// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  // demais configurações (timeout, headers, etc)
})

export default api
