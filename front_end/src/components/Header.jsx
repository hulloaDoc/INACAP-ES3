import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: '#1e293b', 
      color: 'white', 
      padding: '1rem 2rem', 
      borderRadius: '6px',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Renderiza el avatar devuelto por la API o un placeholder por defecto si viene vacío */}
        <img 
          src={user?.avatar || 'https://placeholder.com'} 
          alt="Avatar de Usuario" 
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #3b82f6' }} 
        />
        <div>
          <h2 style={{ margin: 0, fontSize: '1.1rem', letterSpacing: '0.5px' }}>🏬 INACAP Market</h2>
          <small style={{ color: '#94a3b8', display: 'block' }}>{user?.correo || 'usuario@inacapmail.cl'}</small>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ textAlign: 'right' }}>
          <span style={{ display: 'block', fontSize: '0.95rem' }}>Hola, <strong>{user?.nombre || user?.username}</strong></span>
          <span style={{ 
            fontSize: '0.75rem', 
            backgroundColor: '#38bdf8', 
            color: '#0f172a', 
            padding: '2px 8px', 
            borderRadius: '10px', 
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {user?.rol || 'Estudiante'}
          </span>
        </div>
        
        <button 
          onClick={logout} 
          style={{ 
            backgroundColor: '#ef4444', 
            color: 'white', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            fontSize: '0.85rem',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};
