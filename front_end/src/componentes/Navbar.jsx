import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header style={{ padding: '10px 20px', background: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
      <h2>Gengibre SPA</h2>
      <nav style={{ display: 'flex', gap: '15px' }}>
        <Link to="/">Inicio</Link>
        <Link to="/login">Login</Link>
        <Link to="/inventario">Inventario</Link>
      </nav>
    </header>
  );
};

export default Navbar;