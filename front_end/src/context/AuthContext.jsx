import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al arrancar la app, restaura la sesión si existía en LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  // Función asíncrona para enviar credenciales a la API
    const login = async (username, password) => {
    try {
      // Petición HTTP asíncrona enviando credenciales a la API
      const response = await api.post('/login', { username, password });
      
      if (response.data && response.data.token) {
        const { token, user: userData } = response.data;
        
        // Integración y almacenamiento seguro en LocalStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      return { success: false, message: 'Credenciales inválidas.' };
    } catch (error) {
      // Si la API responde con un código de error (como el 401)
      if (error.response && error.response.status === 401) {
        return { success: false, message: 'Usuario o contraseña incorrectos. Inténtalo de nuevo.' };
      }
      // Si es un error de red general (servidor apagado)
      return { success: false, message: 'Error de conexión con el servidor. Verifica que el mock-server esté corriendo.' };
    }
  };

  // Cierre de sesión limpio
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);