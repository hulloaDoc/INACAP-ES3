import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { saveSession, getSession, clearSession } from '../utils/localStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (session.token && session.user) {
      setToken(session.token);
      setUser(session.user);
    }
    setLoading(false);
  }, []);

  async function login(username, password) {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post('/api/login', { username, password });
      const { token: newToken, user: userData } = res.data;
      setToken(newToken);
      setUser(userData);
      saveSession(newToken, userData);
      return true;
    } catch (err) {
      const message = err.response?.data?.mensaje || 'Error al iniciar sesion';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    clearSession();
  }

  function clearError() {
    setError(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
