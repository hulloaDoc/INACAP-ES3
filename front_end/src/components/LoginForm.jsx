import { useState } from 'react';
import api from '../api/axiosInstance';
import { clearSession, saveSession } from '../utils/storage';
import ErrorAlert from './ErrorAlert';

const initialForm = {
  username: '',
  password: '',
};

function LoginForm({ onLogin }) {
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const username = form.username.trim();
    const password = form.password;

    if (!username || !password) {
      setErrorMessage('Debes ingresar el usuario y la contraseña.');
      return;
    }

    setLoading(true);

    try {
      clearSession();

      const loginResponse = await api.post('/login', {
        username,
        password,
      });

      const generatedToken = `Basic ${btoa(`${username}:${password}`)}`;

      const token = loginResponse.data?.token || generatedToken;

      // Se guarda temporalmente para autorizar GET /perfil.
      localStorage.setItem('authToken', token);

      const profileResponse = await api.get('/perfil');

      const loginUser = loginResponse.data?.user || {};

      const profileUser =
        profileResponse.data?.user ||
        profileResponse.data?.perfil ||
        profileResponse.data ||
        {};

      const session = {
        token,
        user: {
          ...loginUser,
          ...profileUser,
          username:
            profileUser.username ||
            loginUser.username ||
            username,
        },
      };

      saveSession(session);
      onLogin(session);
    } catch (error) {
      clearSession();

      setErrorMessage(
        error.userMessage || 'No fue posible iniciar sesión.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <span className="login-brand__icon">🏪</span>

          <div>
            <p className="login-brand__institution">INACAP</p>
            <h1>Gestor de Inventario</h1>
          </div>
        </div>

        <p className="login-description">
          Inicia sesión para administrar los productos y el stock de la tienda.
        </p>

        <ErrorAlert
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>

            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="primary-button login-button"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="login-help">
          <strong>Credenciales de prueba</strong>
          <span>Usuario: admin</span>
          <span>Contraseña: admin123</span>
        </div>
      </section>
    </main>
  );
}

export default LoginForm;