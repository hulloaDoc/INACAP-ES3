import axios from 'axios';

// Creamos una instancia de Axios apuntando al servidor backend del profesor (puerto 3000 o el que uses)
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // <-- Debe apuntar al puerto 4000 del mock-server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional para inyectar el token si existe en localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;