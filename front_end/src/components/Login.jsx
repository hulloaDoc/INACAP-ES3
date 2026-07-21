import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import ErrorAlert from './ErrorAlert';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (event) => {
    event.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Debes completar el usuario y la contraseña.');
      return;
    }

    try {
      setCargando(true);

      const respuestaLogin = await axiosInstance.post('/api/login', {
        username: username.trim(),
        password,
      });

      localStorage.setItem('token', respuestaLogin.data.token);

      const respuestaPerfil = await axiosInstance.get('/api/perfil');

      localStorage.setItem(
        'perfil',
        JSON.stringify(respuestaPerfil.data)
      );

      onLogin(respuestaPerfil.data);
    } catch (errorPeticion) {
      console.error(
      `Error HTTP ${errorPeticion.response?.status || 'sin respuesta'}:`,
      errorPeticion.response?.data?.mensaje || errorPeticion.message
    );

      localStorage.removeItem('token');
      localStorage.removeItem('perfil');

      const mensaje =
        errorPeticion.response?.data?.mensaje ||
        'No fue posible conectarse con el servidor.';

      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="brand-icon">S</div>

          <div>
            <span className="brand-name">StockFlow</span>
            <span className="brand-description">
              Control inteligente de inventario
            </span>
          </div>
        </div>

        <div className="login-heading">
          <span className="login-label">ACCESO AL SISTEMA</span>
          <h1>Bienvenido nuevamente</h1>
          <p>Ingresa tus credenciales para administrar la tienda.</p>
        </div>

        <form className="login-form" onSubmit={iniciarSesion}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>

            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>

            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>

          <ErrorAlert mensaje={error} />

          <button
            className="primary-button"
            type="submit"
            disabled={cargando}
          >
            {cargando ? 'Verificando credenciales...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="login-footer">
          Sistema de administración de inventario
        </p>
      </section>
    </main>
  );
}

export default Login;