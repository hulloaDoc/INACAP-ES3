import './Header.css';
import useAuth from '../hooks/useAuth';
 // Componente de la cabecera de la app. se muestra en todas las paginas
 // (una vez logeado) con le nombre del sistema y los datos de la sesión
export default function Header() {
  // Se saca al usuario logado y la función logout desde el hook
  // de la autenticación (asi no se repite la logica del contexto)
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__icon"></span>
        <span>INACAP Market</span>
      </div>
      <div className="app-header__session">
        {/* Se aplica ?. por si user aun no esta cargado asi no explota la app
        tratando de leer username de undefined */}
        <span>
          Bienvenido, {user?.username} (Rol: {user?.rol})
        </span>
        <button type="button" className="app-header__logout" onClick={logout}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}
