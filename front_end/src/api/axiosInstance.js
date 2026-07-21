import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token && !config.url?.includes('/api/login')) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
