import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Inventario = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: 'Abarrotes'
  });

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

  const iniciarEdicion = (prod) => {
    setProductoEditandoId(prod.id);
    setNuevoProducto({
      nombre: prod.nombre,
      precio: prod.precio,
      stock: prod.stock,
      categoria: prod.categoria
    });
    setMostrarFormulario(true);
  };

  const abrirFormularioCreacion = () => {
    setProductoEditandoId(null);
    setNuevoProducto({ nombre: '', precio: '', stock: '', categoria: 'Abarrotes' });
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    registrarAccion('cerró sesión en el sistema');
    navigate('/login');
  };

  const handleGuardarProducto = async (e) => {
    e.preventDefault();
    setMensajeError("");
    
    if (Number(nuevoProducto.precio) < 0 || Number(nuevoProducto.stock) < 0) {
      alert("El precio y el stock no pueden ser valores negativos.");
      return;
    }

    try {
      if (productoEditandoId) {
        await axiosInstance.put(`/api/productos/${productoEditandoId}`, {
          nombre: nuevoProducto.nombre,
          precio: Number(nuevoProducto.precio),
          stock: Number(nuevoProducto.stock),
          categoria: nuevoProducto.categoria
        });
        registrarAccion(`editó el producto ID ${productoEditandoId}`);
      } else {
        await axiosInstance.post('/api/productos', {
          nombre: nuevoProducto.nombre,
          precio: Number(nuevoProducto.precio),
          stock: Number(nuevoProducto.stock),
          categoria: nuevoProducto.categoria
        });
        registrarAccion(`creó el producto ${nuevoProducto.nombre}`);
      }

      setNuevoProducto({ nombre: '', precio: '', stock: '', categoria: 'Abarrotes' });
      setProductoEditandoId(null);
      setMostrarFormulario(false);
      obtenerProductos();
    } catch (error) {
      console.error("Error al guardar el producto", error);
      const mensajeServidor = error.response?.data?.message || "Error interno del servidor";
      setMensajeError(mensajeServidor);
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Cabecera que oculta el bloque de usuario/logout si no hay sesión activa */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: '#f8f9fa', 
        padding: '12px 20px', 
        border: '1px solid #dee2e6',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <div style={{ width: '80px' }}></div>
        <h2 style={{ margin: 0, fontSize: '1.25rem', textAlign: 'center' }}>Inventario de Tienda</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {isLoggedIn ? (
            <>
              <span>Bienvenido, admin</span>
              <button 
                onClick={handleLogout}
                style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                [Logout]
              </button>
            </>
          ) : null}
        </div>
      </div>

      <button 
        onClick={abrirFormularioCreacion}
        style={{ margin: '10px 0', padding: '8px 12px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
      >
        {mostrarFormulario ? 'Cancelar' : '+ Agregar Producto'}
      </button>

      {mensajeError && (
        <div style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #f5c6cb" }}>
          {mensajeError}
        </div>
      )}

      {mostrarFormulario && (
        <form onSubmit={handleGuardarProducto} style={{ background: '#f1f1f1', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
          <h3>{productoEditandoId ? `Editar Producto ID ${productoEditandoId}` : 'Registrar Nuevo Producto'}</h3>
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
          <button type="submit" style={{ padding: '6px 12px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            {productoEditandoId ? 'Actualizar Producto' : 'Guardar Producto'}
          </button>
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
                  <button onClick={() => iniciarEdicion(prod)} style={{ marginRight: '5px', padding: '4px 8px' }}>[E]</button>
                  <button onClick={() => handleDelete(prod.id)} style={{ padding: '4px 8px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>[X]</button>
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

      <div style={{ marginTop: '40px', padding: '15px', background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '5px' }}>
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