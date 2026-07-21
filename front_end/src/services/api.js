import axios from 'axios';

// Instancia centralizada de Axios para mantener un flujo único de peticiones HTTP.
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
    (error) => {
        let message = 'Ocurrió un error inesperado';
        let status = 500;

        if (error.code === 'ECONNABORTED' || error.message === 'timeout of 10000ms exceeded') {
            message = 'La solicitud tardó demasiado. Inténtelo nuevamente.';
            status = 408;
        } else if (!error.response) {
            message = 'No se pudo conectar con el servidor.';
            status = 0;
        } else {
            status = error.response.status || 500;

            if (status === 400) {
                message = 'Solicitud inválida.';
            } else if (status === 401) {
                message = 'No autorizado. Verifique sus credenciales.';
            } else if (status === 404) {
                message = 'Recurso no encontrado.';
            } else if (status === 500) {
                message = 'Error interno del servidor.';
            }
        }

        return Promise.reject({
            status,
            message,
            originalError: error,
        });
    }
);

export default api;
