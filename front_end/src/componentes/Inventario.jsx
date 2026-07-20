import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axiosInstance.get('/api/productos');
        setProductos(response.data);
      } catch (err) {
        setError('Error al cargar el inventario desde el servidor.');
        console.error(err);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Gestor de Inventario de Tienda</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>{prod.stock}</td>
                <td>{prod.categoria}</td>
                <td>
                  <button>Editar</button> <button>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>Cargando productos o sin registros...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Inventario;