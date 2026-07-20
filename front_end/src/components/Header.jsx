import { getSession } from '../utils/localStorage';

/**
 * Header de la aplicación.
 * @param {{ onLogout?: () => void }} props
 */
function Header({ onLogout }) {
  const session = getSession();

  return (
    <header className="app-header">
      <div className="app-header__title">
        <h1>Task Tracker</h1>
        <span className="app-header__subtitle">INACAP · ES3</span>
      </div>

      {session && (
        <div className="app-header__user">
          <span className="app-header__email">{session.email}</span>
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
      )}
    </header>
  );
}

export default Header;
