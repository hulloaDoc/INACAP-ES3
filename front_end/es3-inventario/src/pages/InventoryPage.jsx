import { useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useProductos from '../hooks/useProductos';
import useAuditLog from '../hooks/useAuditLog';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import AuditLog from '../components/AuditLog';
import ErrorAlert from '../components/ErrorAlert';
import QATestPanel from '../components/QATestPanel';
import './InventoryPage.css';

export default function InventoryPage() {
  const { user } = useAuth();
  const { productos, categorias, loading, error, setError, crear, actualizar, eliminar, buscarPorId } = useProductos();
  const { historial, registrar } = useAuditLog();

  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [filtroStock, setFiltroStock] = useState('Todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [accionError, setAccionError] = useState(null);

  const productosFiltrados = useMemo(() => {
    const termino = terminoBusqueda.trim().toLowerCase();
    return productos.filter((p) => {
      const coincideCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro;
      const coincideStock =
        filtroStock === 'Todos' ||
        (filtroStock === 'En stock' && p.stock > 0) ||
        (filtroStock === 'Agotado' && p.stock === 0);
      const coincideBusqueda =
        !termino ||
        String(p.id) === termino ||
        p.nombre.toLowerCase().includes(termino) ||
        p.categoria.toLowerCase().includes(termino);
      return coincideCategoria && coincideStock && coincideBusqueda;
    });
  }, [productos, categoriaFiltro, filtroStock, terminoBusqueda]);

  // Búsqueda de productos: si el texto es un número, se interpreta como ID
  // y se consulta directamente al backend (GET /productos/:id). Un ID
  // inexistente produce un 404 real del servidor, que se muestra en el
  // mismo <ErrorAlert /> que usa el resto de la app. Si no es un número,
  // se filtra localmente por nombre o categoría (el backend no tiene un
  // endpoint de búsqueda por texto), y si no hay coincidencias se genera
  // un error 404 equivalente, con el mismo tratamiento visual (ErrorAlert)
  // y de consola ([API ERROR]) que un 404 real, para mantener consistencia.
  const handleBuscar = async (texto) => {
    setAccionError(null);
    setTerminoBusqueda(texto);

    const termino = texto.trim();
    if (!termino) return;

    if (/^\d+$/.test(termino)) {
      try {
        await buscarPorId(termino);
      } catch (err) {
        setAccionError({ status: err.status, mensaje: err.mensaje });
      }
      return;
    }

    const terminoNormalizado = termino.toLowerCase();
    const hayCoincidencias = productos.some(
      (p) =>
        p.nombre.toLowerCase().includes(terminoNormalizado) ||
        p.categoria.toLowerCase().includes(terminoNormalizado),
    );

    if (!hayCoincidencias) {
      const mensaje = `No se encontró ningún producto con nombre o categoría "${termino}".`;
      // Mismo formato que usa el interceptor de axiosClient para errores
      // de la API, así el log es reconocible en consola aunque esta
      // búsqueda no haga una petición de red real.
      console.error('[API ERROR]', { status: 404, url: '/productos (búsqueda local)', method: 'get', mensaje, detalle: { termino } });
      setAccionError({ status: 404, mensaje });
    }
  };

  const abrirCrear = () => {
    setAccionError(null);
    setProductoEditando(null);
    setFormularioAbierto(true);
  };

  const abrirEditar = (producto) => {
    setAccionError(null);
    setProductoEditando(producto);
    setFormularioAbierto(true);
  };

  const cerrarFormulario = () => {
    setFormularioAbierto(false);
    setProductoEditando(null);
    setAccionError(null);
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
        <SearchBar onBuscar={handleBuscar} />
        <FilterBar
          categorias={categorias}
          categoria={categoriaFiltro}
          onCategoriaChange={setCategoriaFiltro}
          filtroStock={filtroStock}
          onFiltroStockChange={setFiltroStock}
          onAgregar={abrirCrear}
        />

        <div className="inventory-page__content">
          {/* accionError (crear/editar/eliminar) se muestra dentro del
              ProductForm cuando el modal está abierto; aquí solo se
              muestra si no hay formulario abierto (ej: error al eliminar) */}
          {accionError && !formularioAbierto && (
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
        <QATestPanel onError={setAccionError} />
      </div>

      {formularioAbierto && (
        <ProductForm
          producto={productoEditando}
          categorias={categorias}
          error={accionError}
          onGuardar={handleGuardar}
          onCancelar={cerrarFormulario}
        />
      )}
    </div>
  );
}
