import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-logo">INACAP</span>
        <h2 className="header-title">Agenda de Eventos</h2>
      </div>
      {user && (
        <div className="header-right">
          <div className="header-user">
            <img
              src={user.avatar}
              alt={user.nombre}
              className="header-avatar"
            />
            <div className="header-user-info">
              <span className="header-welcome">Bienvenido, {user.nombre}</span>
              <span className="header-role">{user.rol}</span>
              <span className="header-email">{user.correo}</span>
            </div>
          </div>
          <button className="btn btn-logout" onClick={logout}>
            Cerrar Sesion
          </button>
        </div>
      )}
    </header>
  );
}
