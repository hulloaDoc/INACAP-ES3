import { useEffect, useState } from 'react';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import { getSession, clearSession, getPreferences, savePreferences } from './utils/localStorage';
import { logout as authLogout, getPerfil } from './services/authService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkedSession, setCheckedSession] = useState(false);
  const [theme, setTheme] = useState(() => getPreferences().theme);

  useEffect(() => {
    // Si no existe sesión (o el token quedó inválido), se mantiene al
    // usuario en el Login (redirección automática).
    const session = getSession();
    if (!session) {
      setCheckedSession(true);
      return;
    }

    // Se valida el token contra el endpoint de perfil real. Si el token
    // fue revocado o el servidor lo rechaza, el interceptor de Axios
    // limpia la sesión automáticamente (ver api/axiosInstance.js).
    getPerfil()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setCheckedSession(true));
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authLogout();
    clearSession();
    setIsAuthenticated(false);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      savePreferences({ theme: next });
      return next;
    });
  };

  if (!checkedSession) {
    return null;
  }

  return (
    <div data-theme={theme}>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} theme={theme} onToggleTheme={handleToggleTheme} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
