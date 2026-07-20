import axios from 'axios';

// El Mock Server (JSON Server) corre en el puerto 3001.
// Ver mock-server/package.json -> script "start".
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
