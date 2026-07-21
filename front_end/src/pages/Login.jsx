import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorLocal, setErrorLocal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLocal('');
    setLoading(true);

    try {
      const result = await login(username, password);
      if (!result.success) {
        setErrorLocal(result.message || 'Credenciales inválidas.');
      }
    } catch (err) {
      setErrorLocal('Error de conexión con el servidor. Verifica que el mock-server esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#1e293b', padding: '2.5rem', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#f8fafc', margin: '0 0 1.5rem 0', textAlign: 'center' }}>🔒 Iniciar Sesión</h2>
        
        {errorLocal && (
          <div style={{ backgroundColor: '#fee2e2', border: '1px solid #ef4444', color: '#991b1b', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
            ⚠️ {errorLocal}
          </div>
        )}

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Usuario</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ej: admin" required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#334155', color: '#f8fafc', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#334155', color: '#f8fafc', boxSizing: 'border-box' }} />
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: loading ? '#64748b' : '#3b82f6', color: 'white', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem' }}>
          {loading ? 'Autenticando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};
