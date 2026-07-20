import axios from 'axios';

// Se crea la instancia centralizada apuntando al servidor Mock
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor de peticiones
// Se ejecuta "ANTES" de que la petición salga de react hacia el servidor
axiosInstance.interceptors.request.use(
  (config) => {
    // Token de LocalStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Autenticación HTTP de dinámica
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor de Respuestas
axiosInstance.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, se devuelve la respuesta.
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      
      // Control de errores
      switch (status) {
        case 400:
          console.error("Error 400: Petición incorrecta. Faltan datos en el envío.");
          break;
        case 401:
          console.error("Error 401: No autorizado. Credenciales inválidas.");
          // aqui hacer que se borre el LocalStorage y se redirija al Login
          break;
        case 404:
          console.error("Error 404: Recurso no encontrado en el servidor mock.");
          break;
        case 500:
          console.error("Error 500: Error interno del servidor mock.");
          break;
        default:
          console.error(`Error HTTP no manejado: ${status}`);
      }
    } else {
      console.error("Error de red: El servidor mock probablemente no está corriendo.");
    }
    
    // Rechazamos la promesa para que tus componentes
    // Muestren las Alertas en la interfaz.
    return Promise.reject(error);
  }
);

export default axiosInstance;