import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Consumimos la función de login desde nuestro contexto global
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Intentamos iniciar sesión con los datos ingresados
      await login(username, password);
      // Si todo sale bien, React Router nos lleva a la pantalla principal
      navigate('/');
    } catch (error) {
      // Si el backend rechaza las credenciales (Error 401)
      setErrorMsg('Credenciales inválidas. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f4f4' }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '320px' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Iniciar Sesión</h2>
        
        {/* Alerta de Error Dinámica */}
        {errorMsg && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', textAlign: 'center', border: '1px solid #ffcdd2' }}>
            {errorMsg}
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Usuario:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ width: '100%', padding: '0.75rem', background: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          {isLoading ? 'Autenticando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};