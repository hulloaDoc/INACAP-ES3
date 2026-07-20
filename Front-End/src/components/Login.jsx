import { useState } from 'react';
import axiosInstance from '../api/axiosInstance.js';

const Login = ({ onLoginSuccess }) => {
  // Estado para capturar lo que el usuario escribe
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  // Estado para manejar los mensajes de error en la pantalla
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    setErrorMsg(''); // Limpia cualquier mensaje de error previo

    try {
      // La petición POST al endpoint que se indico
      const response = await axiosInstance.post('/api/login', credentials);
      
      // Extraemos el token y el perfil
      const { token, perfil } = response.data;
      
      // Guardar token y perfil en LocalStorage de forma segura
      localStorage.setItem('authToken', token);
      localStorage.setItem('userProfile', JSON.stringify(perfil));

      // Aviso a la aplicación que el usuario logró entrar
      if (onLoginSuccess) onLoginSuccess();
      
    } catch (error) {
      // Si falla, se muestra una alerta visual en la interfaz
      setErrorMsg('Error 401: Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Inicio de Sesión - Tienda INACAP</h2>
      
      {/* Alerta de error dinámica */}
      {errorMsg && (
        <div style={{ background: '#ffcccc', color: 'red', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Usuario:</label>
          <input 
            type="text" 
            name="username" 
            value={credentials.username} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#0055a4', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;