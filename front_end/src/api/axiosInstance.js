import axios from 'axios';

// creamos la isntancia de axios apuntnado al servidor mock
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});
// interceptor de solicitudes: adjuntar el token del local en cada peticion 
axionsInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;

    }
    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);
// captura de errores HTTP
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // hacemos el log en la consola para mostrar evidencia 
    console.error('API error interceptado', error.responde || error);

    if (error.response) {
      const { status, data } = error.response;

      // creamos un evento llamado "api-error" en el navegador para que el componente visual <erroralert> se entere

      const apiEvent = new CustomEvent('api-error', {
        detail: {
          status,
          mensaje: data?.mensaje || "ha ocurrido un error inesperado.",
          error: data?.error || "Error del servidor",
        }
      });
      window.dispatchEvent(apiEvent)
    } else {
      // en caso que el servidor mock no responde (error de red)
      const apiEvent = new CustomEvent('api-error', {
        detail: {
          status: 500,
          mensaje: 'no se puede establecer conexion con el servidor. verifique que el servidor este corriendo',
          error: 'Network Error',
        }
      });
      window.dispatchEvent(apiEvent);
    }
    // devolvemos el error como rechazado para que el try local del componente tambien lo maneje
    return Promise.reject(error);
  }
);
export default axiosInstance; 