import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ErrorAlert from './ErrorAlert';

export default function LoginForm() {
  const { login, loading, error, clearError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError('');

    if (!username.trim()) {
      setLocalError('El usuario es obligatorio');
      return;
    }
    if (!password.trim()) {
      setLocalError('La contrasena es obligatoria');
      return;
    }

    await login(username, password);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span className="login-logo">INACAP</span>
          <h1>Agenda de Eventos</h1>
          <p>Inicia sesion para continuar</p>
        </div>

        {(error || localError) && (
          <ErrorAlert
            message={error || localError}
            onClose={() => {
              clearError();
              setLocalError('');
            }}
          />
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contrasena</label>
            <input
              id="password"
              type="password"
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesion'}
          </button>
        </form>
      </div>
    </div>
  );
}
