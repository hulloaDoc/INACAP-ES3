import axios from 'axios';

// 1. Primero creas la instancia configurando la URL base de tu servidor mock
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 2. Después la exportas para poder usarla en tus componentes (como Login.jsx)
export default axiosInstance;