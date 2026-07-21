import { useState } from 'react';
import Login from './components/Login';
import InventarioPage from './pages/InventarioPage';
import './App.css';

function obtenerPerfilGuardado() {
  try {
    const perfilGuardado = localStorage.getItem('perfil');

    return perfilGuardado
      ? JSON.parse(perfilGuardado)
      : null;
  } catch (error) {
    console.error('El perfil guardado no es válido:', error);

    localStorage.removeItem('perfil');
    localStorage.removeItem('token');

    return null;
  }
}

function App() {
  const [usuario, setUsuario] = useState(
    () => obtenerPerfilGuardado()
  );

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
    setUsuario(null);
  };

  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <div className="brand-icon brand-icon-small">S</div>

          <div>
            <span className="brand-name">StockFlow</span>
            <span className="topbar-subtitle">
              Gestor de inventario
            </span>
          </div>
        </div>

        <div className="user-area">
          <img
            className="user-avatar"
            src={usuario.avatar}
            alt={`Avatar de ${usuario.nombre}`}
          />

          <div className="user-details">
            <strong>{usuario.nombre}</strong>
            <span>{usuario.rol}</span>
            <span>{usuario.correo}</span>
          </div>

          <button
            className="logout-button"
            type="button"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <InventarioPage />
    </div>
  );
}

export default App;