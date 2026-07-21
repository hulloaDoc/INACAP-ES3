import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  
  // 1. Estado inicial de la bitácora cargado desde LocalStorage
  const [bitacora, setBitacora] = useState(() => {
    try {
      const guardado = localStorage.getItem('bitacora_inventario');
      return guardado ? JSON.parse(guardado) : [];
    } catch (e) {
      console.error("Error al leer la bitácora de LocalStorage", e);
      return [];
    }
  });

  // Función auxiliar para registrar acciones y guardarlas en LocalStorage
  const registrarAccion = (accion) => {
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nuevoRegistro = `${horaActual} admin ${accion}`;
    const nuevaBitacora = [nuevoRegistro, ...bitacora];
    
    setBitacora(nuevaBitacora);
    localStorage.setItem('bitacora_inventario', JSON.stringify(nuevaBitacora));
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axiosInstance.get('/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Ejemplo de acción al eliminar (puedes adaptarlo a tus funciones actuales)
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/productos/${id}`);
      registrarAccion(`eliminó el producto ID ${id}`);
      obtenerProductos(); // Recargar lista
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestor de Inventario de Tienda</h2>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
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
                <td style={{ textAlign: 'center' }}>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td style={{ textAlign: 'right' }}>${prod.precio}</td>
                <td style={{ textAlign: 'center' }}>{prod.stock}</td>
                <td>{prod.categoria}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => registrarAccion(`editó el producto ID ${prod.id}`)} style={{ marginRight: '5px' }}>Editar</button>
                  <button onClick={() => handleDelete(prod.id)}>Eliminar</button>
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

      {/* SECCIÓN DE LA BITÁCORA EXIGIDA POR LA PAUTA */}
      <div style={{ marginTop: '40px', padding: '15px', background: '#f8f9fa', border: '1px solid #dee2e6' }}>
        <h3>BITÁCORA DE AUDITORÍA (LocalStorage)</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {bitacora.length === 0 ? (
            <li>No hay registros en la sesión actual.</li>
          ) : (
            bitacora.map((log, index) => (
              <li key={index}>- [{log}]</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Inventario;