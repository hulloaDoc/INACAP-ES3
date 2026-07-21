import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
        config.headers.Authorization = `Basic ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default api;
