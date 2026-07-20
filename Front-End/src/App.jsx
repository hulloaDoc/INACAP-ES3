import { useState, useEffect } from 'react';
import Login from 'src/components/Login.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Se ejecuta al cargar la página para ver si ya hay una sesión guardada
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const profileString = localStorage.getItem('userProfile');

    if (token && profileString) {
      try {
        // Validación segura al usar JSON
        const parsedProfile = JSON.parse(profileString);
        setUserProfile(parsedProfile);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al leer el perfil del LocalStorage");
        localStorage.clear(); // Limpiamos datos corruptos
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    // Se actualiza el estado de autenticación y se obtiene el perfil del usuario desde LocalStorage
    const profileString = localStorage.getItem('userProfile');
    if (profileString) {
      setUserProfile(JSON.parse(profileString));
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Cerramos sesión borrando los datos
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          {/* Header Condicional Requerido */}
          <header style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: '#f4f4f4', borderBottom: '2px solid #0055a4' }}>
            <h1 style={{ margin: 0 }}>Gestor de Inventario</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span>Bienvenido, <strong>{userProfile?.nombre}</strong> ({userProfile?.rol})</span>
              <button onClick={handleLogout} style={{ padding: '5px 10px', background: '#d9534f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cerrar Sesión
              </button>
            </div>
          </header>
          
          <main style={{ padding: '20px' }}>
            <h2>Dashboard</h2>
            <p>Aquí construiremos la tabla de productos y el filtro de categorías.</p>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;