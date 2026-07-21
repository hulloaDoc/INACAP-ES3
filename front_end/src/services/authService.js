import axiosInstance from '../api/axiosInstance';
import { saveSession, clearSession } from '../utils/localStorage';

/**
 * Inicia sesión contra el Mock API real (POST /api/login) y persiste
 * el token Basic Auth junto con los datos de perfil en LocalStorage.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>} datos del usuario autenticado
 */
export const login = async (username, password) => {
  const response = await axiosInstance.post('/login', { username, password });
  const { token, user } = response.data;

  saveSession({ token, user });
  return user;
};

/**
 * Consulta el perfil del usuario autenticado (GET /api/perfil).
 * Requiere que exista una sesión con token válido.
 * @returns {Promise<object>}
 */
export const getPerfil = async () => {
  const response = await axiosInstance.get('/perfil');
  return response.data;
};

/**
 * Cierra la sesión actual.
 */
export const logout = () => {
  clearSession();
};
