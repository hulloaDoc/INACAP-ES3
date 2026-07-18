import { useState } from 'react';
import Login from './components/Login';

function App() {
  const [usuario, setUsuario] = useState(null);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
    setUsuario(null);
  };

  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  return (
    <main>
      <h1>Inventario de Tienda</h1>

      <img
        src={usuario.avatar}
        alt={`Avatar de ${usuario.nombre}`}
        width="80"
      />

      <p>Bienvenido, {usuario.nombre}</p>
      <p>Rol: {usuario.rol}</p>
      <p>Correo: {usuario.correo}</p>

      <button type="button" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </main>
  );
}

export default App;