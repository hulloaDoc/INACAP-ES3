import React from 'react';
import { clearSession } from '../utils/storage';
import { Sun, Moon } from 'lucide-react';

const Header = ({ user, onLogout, theme, onToggleTheme }) => {
    // funcion que limpia el localstorage y avisa a app.jsx para cerrar sesion
    const handleLogout = () => {
        clearSession(); // borramos token y perfil de localstorage
        onLogout(); // reseteamos el estado en app.jsx para volver al login
    };

    return (
        <header className="main-header">
            <div className="header-logo">
                <h2>Task Tracker</h2>
            </div>
            {/* si hay un usuario logeado, mostramos su avatar y nombre*/}
            {user && (
                <div className='header-user'>
                    <img
                        src={user.avatar}
                        alt='avatar de usuario'
                        className='user-avatar'
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                    <div className='user-text'>
                        <span>Bienvenido, <strong>{user.nombre}</strong></span>
                        <small style={{ display: 'block', color: '#666' }}>{user.rol}</small>
                    </div>
                </div>
            )}
            <div className='header-actions'>
                {/* boton para cambiar de tema */}
                <button onClick={onToggleTheme} className='theme-btn'>
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Tema
                </button>
                {/* boton para cerrar sesion */}
                <button onClick={handleLogout} className="logout-btn">
                    Cerrar Sesión
                </button>
            </div>
        </header>
    );
};

export default Header;
