import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './componentes/Login';
import Inventario from './componentes/Inventario';
import Navbar from './componentes/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<h3>Bienvenido al sistema de gestión</h3>} />
            <Route path="/login" element={<Login />} />
            <Route path="/inventario" element={<Inventario />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;