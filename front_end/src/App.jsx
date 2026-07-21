import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Login from './componentes/Login';
import Inventario from './componentes/Inventario';

const NotFound = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1 style={{ color: '#dc3545', fontSize: '48px' }}>404</h1>
    <h2>Página No Encontrada</h2>
    <p>El recurso o ruta al que intentas acceder no existe en el sistema.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;