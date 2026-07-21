import { getSession } from '../utils/localStorage';

/**
 * Header de la aplicación.
 * @param {{ onLogout?: () => void, theme?: 'light' | 'dark', onToggleTheme?: () => void }} props
 */
function Header({ onLogout, theme = 'light', onToggleTheme }) {
  const session = getSession();
  const user = session?.user;

  return (
    <header className="app-header">
      <div className="app-header__title">
        <h1>Task Tracker</h1>
        <span className="app-header__subtitle">INACAP · ES3</span>
      </div>

      <div className="app-header__user">
        {onToggleTheme && (
          <button
            type="button"
            className="btn btn--outline btn--small"
            onClick={onToggleTheme}
            aria-label="Cambiar tema"
            title="Cambiar tema claro/oscuro"
          >
            {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        )}

        {user && (
          <span className="app-header__email">
            Bienvenido, {user.nombre || user.username}
            {user.rol ? ` (Rol: ${user.rol})` : ''}
          </span>
        )}

        {onLogout && (
          <button
            type="button"
            className="btn btn--outline"
            onClick={onLogout}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
