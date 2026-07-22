import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = ({ brand }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      background: '#343a40', 
      color: 'white', 
      padding: '10px 20px', 
      borderRadius: '4px' 
    }}>
      <h2 style={{ margin: 0, fontSize: '18px' }}>{brand || '[INACAP] Inventario'}</h2>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span>Bienvenido, <strong>{user?.nombre || user?.username || 'admin'}</strong></span>
        <button 
          onClick={handleLogout}
          style={{ 
            background: '#dc3545', 
            color: 'white', 
            border: 'none', 
            padding: '5px 10px', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold' 
          }}
        >
          [Out]
        </button>
      </div>
    </header>
  );
};