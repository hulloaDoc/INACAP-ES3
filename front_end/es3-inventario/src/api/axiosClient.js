import axios from 'axios';

const SESSION_KEY = 'inv_session';

export const API_BASE_URL = 'http://localhost:4000/api';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function readSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        localStorage.removeItem(SESSION_KEY);
        return null;

    }
}

// Interceptor de solicitud: adjunta el token Basic Auth guardado en LocalStorage.
axiosClient.interceptors.request.use((config) => {
  const session = readSession();
  if (session?.token) {
    config.headers.Authorization = session.token;
  }
  return config;
});

const MENSAJES_POR_STATUS = {
  400: 'Solicitud inválida: revisa los datos ingresados.',
  401: 'Sesión inválida o expirada. Vuelve a iniciar sesión.',
  404: 'El recurso solicitado no existe.',
  500: 'Error interno del servidor. Intenta nuevamente más tarde.',
};


// Interceptor de respuesta: normaliza y registra en consola cada error de red
// para dejar evidencia estructurada (Manejo de Errores & Evidencia de Logs).
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? null;
    const mensaje =
      error.response?.data?.mensaje ||
      MENSAJES_POR_STATUS[status] ||
      'No fue posible conectar con el servidor.';

    console.error('[API ERROR]', {
      status,
      url: error.config?.url,
      method: error.config?.method,
      mensaje,
      detalle: error.response?.data,
    });

    if (status === 401) {
      localStorage.removeItem(SESSION_KEY);
    }

    return Promise.reject({ status, mensaje, original: error });
  },
);

export default axiosClient;