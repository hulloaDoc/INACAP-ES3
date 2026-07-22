import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; // Importamos tu instancia de Axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Al recargar la página, si hay token, podríamos obtener el perfil.
  // Por ahora mantenemos la sesión activa si el token existe.
  useEffect(() => {
    if (token && !user) {
      // Recuperamos el perfil desde localStorage para persistencia visual rápida
      const savedUser = JSON.parse(localStorage.getItem('user_profile'));
      if (savedUser) setUser(savedUser);
    }
  }, [token, user]);

  const login = async (username, password) => {
    // 1. Hacemos la petición HTTP real al mock-server
    const response = await axiosInstance.post('/login', { username, password });

    // 2. Si el servidor responde correctamente (cualquier respuesta válida 2xx)
    if (response.data) {
      // Extraemos el token y el usuario (adaptado a la respuesta común del mock)
      const rawToken = response.data.token || 'token-mock';
      const cleanToken = typeof rawToken === 'string' ? rawToken.replace('Basic ', '') : 'token-mock';
      const userData = response.data.user || response.data.profile || { username };
      
      // Guardamos en LocalStorage
      localStorage.setItem('token', cleanToken);
      localStorage.setItem('user_profile', JSON.stringify(userData));
      
      // Actualizamos los estados globales de React
      setToken(cleanToken);
      setUser(userData);
      
      return true;
    }
    
    throw new Error('Error de autenticación desconocido');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_profile');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};