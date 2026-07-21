import { useState } from 'react';
import { login } from '../services/authService';
import ErrorAlert from './ErrorAlert';

/**
 * Formulario de inicio de sesión.
 * @param {{ onLoginSuccess: () => void }} props
 */
function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    login(usuario, contrasena)
      .then(() => {
        onLoginSuccess();
      })
      .catch((err) => {
        setError(err.mensaje || err.message || 'No fue posible iniciar sesión.');
      });
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <p className="login-card__hint">Task Tracker · INACAP</p>

        <ErrorAlert mensaje={error} tipo="error" onClose={() => setError('')} />

        <label className="field">
          <span>Usuario</span>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="admin"
            required
          />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="••••••"
            required
          />
        </label>

        <button type="submit" className="btn btn--primary btn--full">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
