import React from 'react';
import { useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { InventoryManager } from './pages/InventoryManager';

function App() {
  const { user } = useAuth();

  // Si no está autenticado, fuerza la pantalla de ingreso
  if (!user) {
    return <Login />;
  }

  // Al autenticarse con éxito, accede directo al módulo de inventario
  return <InventoryManager />;
}

export default App;
