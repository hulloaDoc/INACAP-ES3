import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { ProductForm } from '../components/ProductForm';
import { ErrorAlert } from '../components/ErrorAlert';

export const InventoryManager = () => {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bitacora, setBitacora] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [errorHttp, setErrorHttp] = useState(null);

  // Estados para los filtros reactivos requeridos
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroStock, setFiltroStock] = useState('Todos');
 
  //
  const procesarErrorHttp = (errorAxios) => {
  const status = errorAxios.response?.status || 500;
  let mensajePersonalizado = 'Ocurrió un error inesperado en la comunicación de red.';

  if (status === 401) {
    mensajePersonalizado = 'No autorizado. Sus credenciales expiraron o el token es inválido.';
  } else if (status === 404) {
    mensajePersonalizado = 'El recurso solicitado no fue encontrado en el servidor central.';
  } else if (status === 500) {
    mensajePersonalizado = 'Error interno del servidor mock simulación (?error=500).';
  }

  setErrorHttp({ status, message: mensajePersonalizado });
};

  // Carga inicial de datos desde la API y LocalStorage
  useEffect(() => {
    const cargarDatosIniciales = async () => {
    try {
    const respuestaProductos = await api.get('/productos');
    setProductos(respuestaProductos.data);
    const respuestaCategorias = await api.get('/categorias');
    setCategorias(respuestaCategorias.data);
    } catch (error) {
    procesarErrorHttp(error);
    } finally {
    setLoading(false);
    }};

    cargarDatosIniciales();

    // Recuperar el historial de auditoría de forma segura
    const registrosGuardados = localStorage.getItem('bitacora_inventario');
    if (registrosGuardados) {
      try {
        setBitacora(JSON.parse(registrosGuardados));
      } catch (e) {
        localStorage.removeItem('bitacora_inventario');
      }
    }
  }, []);

  // Función para registrar eventos en la Bitácora local
  const registrarAccionEnBitacora = (mensajeAccion) => {
    const horaExacta = new Date().toLocaleTimeString();
    const nuevaEntrada = `[${horaExacta}] El usuario ${user?.username} ${mensajeAccion}`;
    const nuevaListaBitacora = [nuevaEntrada, ...bitacora];
    
    setBitacora(nuevaListaBitacora);
    // Mitigación XSS: se procesa y serializa estrictamente como JSON estructurado
    localStorage.setItem('bitacora_inventario', JSON.stringify(nuevaListaBitacora));
  };

  // Función asíncrona para eliminar un producto del stock
  const handleEliminarProducto = async (id, nombreProducto) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto "${nombreProducto}" del stock?`)) {
      try {
        await api.delete(`/productos/${id}`);
        // Actualización reactiva del estado local
        setProductos(productos.filter((producto) => producto.id !== id));
        registrarAccionEnBitacora(`eliminó el producto "${nombreProducto}" (ID: ${id}) del inventario.`);
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  // Lógica de filtrado dinámico en memoria
  const productosFiltrados = productos.filter((p) => {
    const cumpleCategoria = filtroCategoria === 'Todas' || p.categoria === filtroCategoria;
    
    let cumpleStock = true;
    if (filtroStock === 'En stock') cumpleStock = p.stock > 0;
    if (filtroStock === 'Sin stock') cumpleStock = p.stock === 0;

    return cumpleCategoria && cumpleStock;
  });

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#cbd5e1' }}>Cargando inventario...</div>;
  }

  const handleGuardarProducto = async (datosProducto) => {
  try {
    if (productoEditando) {
      // Lógica PUT: Editar producto existente en la API
      await api.put(`/productos/${productoEditando.id}`, datosProducto);
      setProductos(productos.map(p => p.id === productoEditando.id ? { ...p, ...datosProducto } : p));
      registrarAccionEnBitacora(`modificó los datos del producto "${datosProducto.nombre}" (ID: ${productoEditando.id}).`);
      setProductoEditando(null);
    } else {
      // Lógica POST: Crear nuevo producto en la API
      const respuesta = await api.post('/productos', datosProducto);
      // La API mock nos devuelve el producto con su nuevo ID generado
      setProductos([...productos, respuesta.data]);
      registrarAccionEnBitacora(`registró un nuevo producto: "${datosProducto.nombre}" con stock inicial de ${datosProducto.stock} u.`);
    }
  } catch (error) {
    console.error('Error al procesar la operación:', error);
  }};
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', fontFamily: 'sans-serif' }}>
      {/* Barra superior con los datos de autenticación del usuario */}
      <Header />
      <main style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: '0 0 1.5rem 0', color: '#1e293b' }}>🏬 Control de Stock Físico</h2>
        <ErrorAlert error={errorHttp} onClose={() => setErrorHttp(null)} />
        <ProductForm 
        categorias={categorias} 
        onSave={handleGuardarProducto} 
        productoEditando={productoEditando} 
        onCancelar={() => setProductoEditando(null)} 
        />
        {/* Sección de Filtros Dinámicos */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '1.5rem', backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '6px' }}>
          <div>
            <label style={{ marginRight: '8px', fontWeight: 'bold', color: '#475569' }}>Categoría:</label>
            <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
              <option value="Todas">Todas las categorías</option>
              {categorias.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label style={{ marginRight: '8px', fontWeight: 'bold', color: '#475569' }}>Filtro de Existencias:</label>
            <select value={filtroStock} onChange={(e) => setFiltroStock(e.target.value)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
              <option value="Todos">Todos los productos</option>
              <option value="En stock">Con existencias (Disponibles)</option>
              <option value="Sin stock">Agotados (Stock 0)</option>
            </select>
          </div>
        </div>

        {/* Tabla Principal de Productos */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '2.5rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', color: '#64748b' }}>ID</th>
              <th style={{ padding: '12px', color: '#64748b' }}>Nombre Producto</th>
              <th style={{ padding: '12px', color: '#64748b' }}>Categoría</th>
              <th style={{ padding: '12px', color: '#64748b' }}>Precio</th>
              <th style={{ padding: '12px', color: '#64748b' }}>Stock Disponible</th>
              <th style={{ padding: '12px', color: '#64748b', textCenter: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No se encontraron artículos en el stock con los filtros aplicados.</td>
              </tr>
            ) : (
              productosFiltrados.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#64748b' }}>#{p.id}</td>
                  <td style={{ padding: '12px', color: '#334155', fontWeight: '500' }}>{p.nombre}</td>
                  <td style={{ padding: '12px', color: '#475569' }}><span style={{ backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>{p.categoria}</span></td>
                  <td style={{ padding: '12px', color: '#0f172a', fontWeight: 'bold' }}>${p.precio.toLocaleString('es-CL')}</td>
                  <td style={{ padding: '12px', color: p.stock === 0 ? '#ef4444' : '#22c55e', fontWeight: 'bold' }}>
                    {p.stock === 0 ? '❌ Agotado (0 u.)' : `${p.stock} unidades`}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => handleEliminarProducto(p.id, p.nombre)}
                      style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
                    >
                      🗑️ Eliminar
                    </button>
                    <button 
                    onClick={() => setProductoEditando(p)}
                    style={{ backgroundColor: '#e0f2fe', color: '#0369a1', border: '1px solid #7dd3fc', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', marginRight: '5px' }}
                    >
                    ✏️ Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Módulo de Bitácora Histórica (LocalStorage) */}
        <section style={{ backgroundColor: '#fafafa', padding: '1.5rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#475569' }}>📋 Historial de Auditoría Interna (LocalStorage)</h4>
          <div style={{ maxHeight: '150px', overflowY: 'auto', backgroundColor: '#ffffff', padding: '1rem', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
            {bitacora.length === 0 ? (
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>No hay registros en la sesión actual.</p>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: '0.9rem', lineHeigh: '1.6' }}>
                {bitacora.map((registro, indice) => <li key={indice} style={{ marginBottom: '4px' }}>{registro}</li>)}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
