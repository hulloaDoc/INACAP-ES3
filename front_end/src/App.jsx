import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="/login" element={<h1>Página de Login</h1>} />
        {/* Aquí agregaremos más rutas conforme avancemos */}
      </Routes>
    </Router>
  );
}

export default App;