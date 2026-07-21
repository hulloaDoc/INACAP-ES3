import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
    config.headers.Authorization = `Basic ${btoa(token)}`;
    }
    return config;
});

export default axiosInstance;
// mock-server/src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
});

// Interceptor de request (ya lo tienes con token)
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
    config.headers.Authorization = `Basic ${btoa(token)}`;
    }
    return config;
});

// Interceptor de response para errores
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
    const status = error.response?.status;

    // Guardar en bitácora
    const logs = JSON.parse(localStorage.getItem("bitacora") || "[]");
    logs.push(`[${new Date().toLocaleTimeString()}] Error HTTP ${status}`);
    localStorage.setItem("bitacora", JSON.stringify(logs));

    // Propagar el error para que lo capture el componente
    return Promise.reject(error);
    }
);

export default axiosInstance;
