import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstances';

const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axiosInstance.get('/api/productos');
        setProductos(response.data);
        setCargando(false);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError('No se pudo cargar el inventario. Verifica que el servidor esté encendido.');
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  const guardarPreferencias = () => {
    const preferencias = { 
      vista: 'tabla_completa', 
      ultimaModificacion: new Date().toISOString() 
    };
    localStorage.setItem('preferenciasApp', JSON.stringify(preferencias));
    alert('Preferencias guardadas localmente.');
  };

  const cargarPreferencias = () => {
    try {
      const data = localStorage.getItem('preferenciasApp');
      if (data) {
        const preferenciasParseadas = JSON.parse(data); 
        console.log("Preferencias cargadas de forma segura:", preferenciasParseadas);
        alert('Preferencias cargadas en consola.');
      } else {
        alert('No hay preferencias guardadas.');
      }
    } catch (error) {

      console.error("Error de integridad: Datos corruptos en LocalStorage");
      localStorage.removeItem('preferenciasApp'); 
    }
  };

  const borrarPreferencias = () => {
    localStorage.removeItem('preferenciasApp');
    alert('Preferencias borradas del sistema.');
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmar) return;

    try {
      await axiosInstance.delete(`/api/productos/${id}`);
      setProductos(productos.filter(producto => producto.id !== id));
      alert('Producto eliminado exitosamente');
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert('Hubo un error al eliminar el producto.');
    }
  };

  if (cargando) return <p style={{ padding: '20px' }}>Cargando inventario...</p>;
  if (error) return <p style={{ color: 'red', padding: '20px' }}>{error}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Gestión de Productos</h2>
        <button style={{ padding: '10px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + Nuevo Producto
        </button>
        <button onClick={guardarPreferencias} style={{ padding: '5px', marginLeft: '10px' }}>Guardar Pref</button>
        <button onClick={cargarPreferencias} style={{ padding: '5px', marginLeft: '10px' }}>Cargar Pref</button>
        <button onClick={borrarPreferencias} style={{ padding: '5px', marginLeft: '10px' }}>Borrar Pref</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #ddd' }}>
        <thead style={{ backgroundColor: '#0055a4', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Nombre</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Categoría</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Precio</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Stock</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
              <td style={{ padding: '12px' }}>{producto.id}</td>
              <td style={{ padding: '12px' }}><strong>{producto.nombre}</strong></td>
              <td style={{ padding: '12px' }}>{producto.categoria}</td>
              <td style={{ padding: '12px' }}>${producto.precio}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  backgroundColor: producto.stock < 10 ? '#ffcccc' : '#d4edda',
                  color: producto.stock < 10 ? '#cc0000' : '#155724'
                }}>
                  {producto.stock}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <button style={{ marginRight: '10px', padding: '5px 10px', background: '#ffc107', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Editar</button>
                <button onClick={() => eliminarProducto(producto.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Eliminar</button>
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No hay productos registrados en el inventario.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;