import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // Estado para el formulario de nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: 'Abarrotes'
  });

  // Estado inicial de la bitácora cargado desde LocalStorage
  const [bitacora, setBitacora] = useState(() => {
    try {
      const guardado = localStorage.getItem('bitacora_inventario');
      return guardado ? JSON.parse(guardado) : [];
    } catch (e) {
      console.error("Error al leer la bitácora de LocalStorage", e);
      return [];
    }
  });

  const registrarAccion = (accion) => {
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nuevoRegistro = `${horaActual} admin ${accion}`;
    const nuevaBitacora = [nuevoRegistro, ...bitacora];
    
    setBitacora(nuevaBitacora);
    localStorage.setItem('bitacora_inventario', JSON.stringify(nuevaBitacora));
  };

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axiosInstance.get('/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const response = await axiosInstance.get('/api/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  // Manejar el envío del formulario para crear un producto (POST)
  const handleCrearProducto = async (e) => {
    e.preventDefault();
    
    if (Number(nuevoProducto.precio) < 0 || Number(nuevoProducto.stock) < 0) {
      alert("El precio y el stock no pueden ser valores negativos.");
      return;
    }

    try {
      await axiosInstance.post('/api/productos', {
        nombre: nuevoProducto.nombre,
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock),
        categoria: nuevoProducto.categoria
      });

      registrarAccion(`creó el producto ${nuevoProducto.nombre}`);
      setNuevoProducto({ nombre: '', precio: '', stock: '', categoria: 'Abarrotes' });
      setMostrarFormulario(false);
      obtenerProductos();
    } catch (error) {
      console.error("Error al crear el producto", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/productos/${id}`);
      registrarAccion(`eliminó el producto ID ${id}`);
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestor de Inventario de Tienda</h2>

      {/* Botón para abrir/cerrar formulario */}
      <button 
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        style={{ margin: '10px 0', padding: '8px 12px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        {mostrarFormulario ? 'Cancelar' : '+ Agregar Producto'}
      </button>

          {/* Formulario de creación con validación de valores no negativos */}
      {mostrarFormulario && (
      <form onSubmit={handleCrearProducto} style={{ background: '#f1f1f1', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
          <h3>Registrar Nuevo Producto</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <input 
              type="text" 
              placeholder="Nombre" 
              value={nuevoProducto.nombre} 
              onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} 
              required 
              style={{ padding: '6px' }}
          />
          <input 
              type="number" 
              placeholder="Precio" 
              min="0" 
              value={nuevoProducto.precio} 
              onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})} 
              required 
              style={{ padding: '6px' }}
          />
          <input 
              type="number" 
              placeholder="Stock" 
              min="0" 
              value={nuevoProducto.stock} 
              onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})} 
              required 
              style={{ padding: '6px' }}
          />
          <select 
              value={nuevoProducto.categoria} 
              onChange={(e) => setNuevoProducto({...nuevoProducto, categoria: e.target.value})}
              style={{ padding: '6px' }}
          >
              {categorias.length > 0 ? (
              categorias.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)
              ) : (
              <option value="Abarrotes">Abarrotes</option>
              )}
          </select>
          </div>
          <button type="submit" style={{ padding: '6px 12px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Guardar Producto</button>
      </form>
      )}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
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

      {/* SECCIÓN DE LA BITÁCORA */}
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