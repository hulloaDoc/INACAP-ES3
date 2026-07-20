import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Petición POST usando tu axiosInstance configurada previamente
      const response = await axiosInstance.post('/api/login', { email, password });
      localStorage.setItem('token', response.data.token)
      setMensaje('¡Inicio de sesión exitoso!');
      console.log('Datos de respuesta:', response.data);
    } catch (error) {
      setMensaje('Error al iniciar sesión. Revisa tus credenciales.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Correo electrónico:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      {mensaje && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{mensaje}</p>}
    </div>
  );
};

export default Login;