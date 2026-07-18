import { useEffect, useState } from 'react';
import api from './api/axiosInstance';
import LoginForm from './components/LoginForm';
import {
  clearSession,
  getSession,
  saveSession,
} from './utils/storage';
import './App.css';

function App() {
  const [session, setSession] = useState(() => getSession());
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const validateStoredSession = async () => {
      const storedSession = getSession();

      if (!storedSession?.token) {
        setCheckingSession(false);
        return;
      }

      try {
        const profileResponse = await api.get('/perfil');

        const profile =
          profileResponse.data?.user ||
          profileResponse.data?.perfil ||
          profileResponse.data ||
          {};

        const updatedSession = {
          ...storedSession,
          user: {
            ...storedSession.user,
            ...profile,
          },
        };

        saveSession(updatedSession);
        setSession(updatedSession);
      } catch {
        clearSession();
        setSession(null);
      } finally {
        setCheckingSession(false);
      }
    };

    validateStoredSession();
  }, []);

  const handleLogin = (newSession) => {
    setSession(newSession);
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  if (checkingSession) {
    return (
      <main className="loading-page">
        <div className="loading-spinner" />
        <p>Verificando sesión...</p>
      </main>
    );
  }

  if (!session) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const user = session.user || {};

  const displayName =
    user.nombre ||
    user.name ||
    user.username ||
    'Usuario';

  return (
    <div className="app-shell">
      <header className="main-header">
        <div className="main-header__brand">
          <span>🏪</span>

          <div>
            <strong>INACAP Market</strong>
            <small>Gestor de Inventario</small>
          </div>
        </div>

        <div className="main-header__user">
          <div className="user-avatar">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar del usuario"
              />
            ) : (
              <span>
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="user-information">
            <strong>Bienvenido, {displayName}</strong>

            <span>
              {user.rol ||
                user.role ||
                'Usuario del sistema'}
            </span>

            {user.email && <small>{user.email}</small>}
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="dashboard">
        <section className="welcome-panel">
          <span className="welcome-panel__icon">📦</span>

          <div>
            <h1>Administración de productos</h1>

            <p>
              La autenticación se realizó correctamente.
              Luego agregaremos el listado, los filtros y el
              CRUD de productos.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;