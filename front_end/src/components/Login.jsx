import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

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

      const respuesta = await axiosInstance.post('/api/login', {
        username: username.trim(),
        password,
      });

      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem(
        'perfil',
        JSON.stringify(respuesta.data.user)
      );

      onLogin(respuesta.data.user);
    } catch (errorPeticion) {
      console.error('Error de autenticación:', errorPeticion);

      const mensaje =
        errorPeticion.response?.data?.mensaje ||
        'No fue posible conectarse con el servidor.';

      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main>
      <form onSubmit={iniciarSesion}>
        <h1>Gestor de Inventario</h1>
        <p>Inicia sesión para administrar los productos.</p>

        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <br />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && (
          <p role="alert" style={{ color: 'red' }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </main>
  );
}

export default Login;