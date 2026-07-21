import axios from 'axios';

// Instancia centralizada conectada al servidor mock de INACAP
const api = axios.create({
  baseURL: 'http://localhost:4000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitudes para inyectar automáticamente el Token de seguridad
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

