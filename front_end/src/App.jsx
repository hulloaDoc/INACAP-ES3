import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Login from './componentes/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h2 style={{ padding: '20px' }}>Bienvenido al Inicio</h2>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;