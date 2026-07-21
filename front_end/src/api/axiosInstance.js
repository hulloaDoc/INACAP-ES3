import axios from 'axios';
import { getSession, clearSession } from '../utils/localStorage';

// El Mock API real (mock_api_server.js) corre en el puerto 4000 y expone
// sus recursos bajo el prefijo /api. Requiere cabecera Authorization
// (Basic Auth) en todas las rutas salvo /api/login.
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de petición: adjunta el token Basic Auth guardado en
// LocalStorage tras el login (ver services/authService.js).
axiosInstance.interceptors.request.use((config) => {
  const session = getSession();
  if (session?.token) {
    config.headers.Authorization = session.token;
  }
  return config;
});

// Mensajes por defecto para cada código de error, usados cuando la API
// no entrega un campo "mensaje" explícito en el cuerpo de la respuesta.
const DEFAULT_MESSAGES = {
  400: 'Solicitud inválida: revisa los datos enviados.',
  401: 'Sesión inválida o expirada. Inicia sesión nuevamente.',
  404: 'El recurso solicitado no existe.',
  500: 'Error interno del servidor. Intenta nuevamente más tarde.',
};

// Interceptor de respuesta: centraliza el manejo de errores HTTP
// (400/401/404/500 y fallos de red) para toda la aplicación. Registra
// la evidencia en consola (requisito de la pauta) y normaliza el error
// para que los servicios/componentes solo necesiten leer `error.status`
// y `error.mensaje`. El mensaje siempre incluye el código HTTP explícito
// (ej. "Error 401: ...") para que sea visible también en la interfaz,
// no solo en la consola.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const apiMensaje = error.response?.data?.mensaje;
    const detalle = apiMensaje || DEFAULT_MESSAGES[status] || 'No fue posible conectar con el servidor.';
    const mensaje = status ? `Error ${status}: ${detalle}` : `Error de conexión: ${detalle}`;

    // Evidencia obligatoria en consola del navegador (ver evidencia_pruebas/).
    console.error(`[API Error] ${status ?? 'NETWORK'} - ${detalle}`, error);

    if (status === 401) {
      // Token inválido o ausente: se limpia la sesión para forzar
      // un nuevo login y evitar peticiones repetidas con credenciales rotas.
      clearSession();
    }

    return Promise.reject({ status, mensaje, original: error });
  }
);

export default axiosInstance;
