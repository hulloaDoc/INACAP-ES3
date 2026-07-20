import { useEffect, useState } from 'react';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import { getSession, clearSession } from './utils/localStorage';
import { logout as authLogout } from './services/authService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkedSession, setCheckedSession] = useState(false);

  useEffect(() => {
    // Si no existe sesión, se mantiene al usuario en el Login (redirección automática).
    const session = getSession();
    setIsAuthenticated(!!session);
    setCheckedSession(true);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authLogout();
    clearSession();
    setIsAuthenticated(false);
  };

  if (!checkedSession) {
    return null;
  }

  return isAuthenticated ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
}

export default App;
