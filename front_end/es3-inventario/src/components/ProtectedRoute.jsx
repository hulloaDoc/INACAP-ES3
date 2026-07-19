import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

 // Componente que envuelve las rutas que requieren estar logeado.
 // Si el usuario no esta autenticado, lo redirige al login en vez 
 // de dejarlo ver el contenido protegido.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // "replace" evita que la ruta protegida quede en el historial
    // del navegador 
    return <Navigate to="/login" replace />;
  }
  // Si se esta autentiucado, se muestra con normalidad lo que venia
  // dentro de ProtectedRouter
  return children;
}
