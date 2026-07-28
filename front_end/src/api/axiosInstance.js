import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agrega automáticamente el token a las peticiones protegidas.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token && !config.url?.includes('/login')) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const errorMessages = {
  400: 'La solicitud contiene datos inválidos.',
  401: 'Credenciales incorrectas o sesión no autorizada.',
  404: 'El recurso solicitado no fue encontrado.',
  500: 'Ocurrió un error interno en el servidor.',
};

// Captura y clasifica los errores de la API.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    const serverMessage =
      error.response?.data?.mensaje ||
      error.response?.data?.message ||
      error.response?.data?.error;

    error.userMessage =
      serverMessage ||
      errorMessages[status] ||
      'No fue posible comunicarse con el servidor.';

    console.error(`[API ${status ?? 'NETWORK'}]`, {
      url: error.config?.url,
      method: error.config?.method,
      status,
      message: error.userMessage,
      details: error.response?.data,
    });

    return Promise.reject(error);
  },
);

export default api;