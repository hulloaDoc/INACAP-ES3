import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { ErrorAlert } from '../components/ErrorAlert';
import { ProductForm } from '../components/ProductForm';
import { getProducts, deleteProduct, getCategories } from '../services/api';
import { getLogs, logTransaction } from '../services/logger';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  
  // Estados de datos
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [logs, setLogs] = useState([]);
  
  // Estados de UI y Filtros
  const [apiError, setApiError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStock, setFilterStock] = useState('');

  // Carga inicial
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    refreshLogs();
  }, []);

  const fetchProducts = async () => {
    try {
      setApiError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setApiError({ status: 500, message: 'Error al cargar los productos.' });
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error cargando categorías", error);
    }
  };

  const refreshLogs = () => {
    setLogs(getLogs().reverse());
  };

  const handleDelete = async (id) => {
    if (window.confirm(`¿Seguro que deseas eliminar el producto ID ${id}?`)) {
      try {
        await deleteProduct(id);
        logTransaction(user?.username || 'admin', `eliminó el producto ID ${id}`);
        fetchProducts();
        refreshLogs();
      } catch (error) {
        setApiError({ status: 500, message: 'Error al eliminar el producto.' });
      }
    }
  };

  const openCreateForm = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchProducts();
    refreshLogs();
  };

  // Lógica de filtrado
  const filteredProducts = products.filter(p => {
    const matchCategory = filterCategory === '' || p.categoria === filterCategory;
    const matchStock = filterStock === '' 
      ? true 
      : filterStock === 'En stock' ? p.stock > 0 : p.stock === 0;
    return matchCategory && matchStock;
  });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* 1. HEADER */}
      <Header brand="[INACAP] Inventario de Tienda" />

      {/* ALERTA DE ERRORES */}
      <ErrorAlert error={apiError} onClose={() => setApiError(null)} />

      {/* CONTENEDOR PRINCIPAL */}
      <div style={{ border: '1px solid #ccc', marginTop: '10px', background: 'white' }}>
        
        {/* 2. BARRA DE FILTROS */}
        <div style={{ background: '#f8f9fa', padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', gap: '20px' }}>
          <div>
            <label>Categoría: </label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">Todas</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label>Filtrar por stock: </label>
            <select value={filterStock} onChange={(e) => setFilterStock(e.target.value)}>
              <option value="">Todos</option>
              <option value="En stock">En stock</option>
              <option value="Sin stock">Sin stock</option>
            </select>
          </div>
        </div>

        {/* 3. ACCIONES Y FORMULARIO */}
        <div style={{ padding: '15px' }}>
          {!isFormOpen ? (
            <button 
              onClick={openCreateForm}
              style={{ background: '#28a745', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', marginBottom: '15px', borderRadius: '4px' }}
            >
              + Agregar Producto
            </button>
          ) : (
            <div style={{ marginBottom: '20px' }}>
              <ProductForm 
                initialData={productToEdit} 
                onSuccess={handleFormSuccess} 
                onCancel={() => setIsFormOpen(false)} 
              />
            </div>
          )}

          {/* 4. TABLA DE DATOS */}
          <table border="1" width="100%" style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: '#e9ecef' }}>
                <th style={{ padding: '8px', border: '1px solid #ccc' }}>ID</th>
                <th style={{ padding: '8px', border: '1px solid #ccc' }}>Nombre</th>
                <th style={{ padding: '8px', border: '1px solid #ccc' }}>Precio</th>
                <th style={{ padding: '8px', border: '1px solid #ccc' }}>Stock</th>
                <th style={{ padding: '8px', border: '1px solid #ccc' }}>Cat.</th>
                <th style={{ padding: '8px', border: '1px solid #ccc' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'center' }}>{p.id}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{p.nombre}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>${p.precio}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'center' }}>{p.stock}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{p.categoria}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'center' }}>
                      <button onClick={() => openEditForm(p)} style={{ marginRight: '5px', padding: '4px 8px', cursor: 'pointer' }}>[E]</button> 
                      <button onClick={() => handleDelete(p.id)} style={{ padding: '4px 8px', cursor: 'pointer', background: '#dc3545', color: 'white', border: 'none' }}>[X]</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    No hay productos que coincidan con los filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. BITÁCORA DE AUDITORÍA */}
        <div style={{ background: '#343a40', color: '#fff', padding: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', textTransform: 'uppercase', fontSize: '14px' }}>
            BITÁCORA DE AUDITORÍA (LocalStorage)
          </h4>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '13px', maxHeight: '150px', overflowY: 'auto' }}>
            {logs.length > 0 ? (
              logs.map(log => (
                <li key={log.id} style={{ marginBottom: '5px', color: '#adb5bd' }}>
                  - [{log.time}] {log.message}.
                </li>
              ))
            ) : (
              <li style={{ color: '#adb5bd' }}>No hay transacciones recientes.</li>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
};