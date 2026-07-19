import { useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useProductos from '../hooks/useProductos';
import useAuditLog from '../hooks/useAuditLog';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import AuditLog from '../components/AuditLog';
import ErrorAlert from '../components/ErrorAlert';
import QATestPanel from '../components/QATestPanel';
import './InventoryPage.css';

export default function InventoryPage() {
  const { user } = useAuth();
  const { productos, categorias, loading, error, setError, crear, actualizar, eliminar } = useProductos();
  const { historial, registrar } = useAuditLog();

  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [filtroStock, setFiltroStock] = useState('Todos');
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [accionError, setAccionError] = useState(null);

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro;
      const coincideStock =
        filtroStock === 'Todos' ||
        (filtroStock === 'En stock' && p.stock > 0) ||
        (filtroStock === 'Agotado' && p.stock === 0);
      return coincideCategoria && coincideStock;
    });
  }, [productos, categoriaFiltro, filtroStock]);

  const abrirCrear = () => {
    setProductoEditando(null);
    setFormularioAbierto(true);
  };

  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    setFormularioAbierto(true);
  };

  const cerrarFormulario = () => {
    setFormularioAbierto(false);
    setProductoEditando(null);
  };

  const handleGuardar = async (datos) => {
    setAccionError(null);
    try {
      if (productoEditando) {
        await actualizar(productoEditando.id, datos);
        registrar(user?.username, `editó el stock del producto ID ${productoEditando.id}.`);
      } else {
        const nuevo = await crear(datos);
        registrar(user?.username, `registró el producto ID ${nuevo.id} (${nuevo.nombre}).`);
      }
      cerrarFormulario();
    } catch (err) {
      setAccionError({ status: err.status, mensaje: err.mensaje });
    }
  };

  const handleEliminar = async (producto) => {
    const confirmado = window.confirm(`¿Eliminar el producto "${producto.nombre}" (ID ${producto.id})?`);
    if (!confirmado) return;
    setAccionError(null);
    try {
      await eliminar(producto.id);
      registrar(user?.username, `eliminó el producto ID ${producto.id} (${producto.nombre}).`);
    } catch (err) {
      setAccionError({ status: err.status, mensaje: err.mensaje });
    }
  };

  return (
    <div className="inventory-page">
      <div className="inventory-card">
        <Header />
        <FilterBar
          categorias={categorias}
          categoria={categoriaFiltro}
          onCategoriaChange={setCategoriaFiltro}
          filtroStock={filtroStock}
          onFiltroStockChange={setFiltroStock}
          onAgregar={abrirCrear}
        />

        <div className="inventory-page__content">
          {accionError && (
            <ErrorAlert status={accionError.status} mensaje={accionError.mensaje} onClose={() => setAccionError(null)} />
          )}
          {error && (
            <ErrorAlert
              status={error.status}
              mensaje={error.mensaje ?? 'No fue posible cargar el inventario.'}
              onClose={() => setError(null)}
            />
          )}

          {loading ? (
            <p className="inventory-page__loading">Cargando productos...</p>
          ) : (
            <ProductTable productos={productosFiltrados} onEditar={abrirEditar} onEliminar={handleEliminar} />
          )}
        </div>

        <AuditLog historial={historial} />
        <QATestPanel />
      </div>

      {formularioAbierto && (
        <ProductForm
          producto={productoEditando}
          categorias={categorias}
          onGuardar={handleGuardar}
          onCancelar={cerrarFormulario}
        />
      )}
    </div>
  );
}
