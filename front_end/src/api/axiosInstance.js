import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
});

// Interceptor de request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
    config.headers.Authorization = `Basic ${btoa(token)}`;
    }
    return config;
});

// Interceptor de response
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
    const status = error.response?.status;

    const logs = JSON.parse(localStorage.getItem("bitacora") || "[]");
    logs.push(`[${new Date().toLocaleTimeString()}] Error HTTP ${status}`);
    localStorage.setItem("bitacora", JSON.stringify(logs));

    return Promise.reject(error);
    }
);

export default axiosInstance;
