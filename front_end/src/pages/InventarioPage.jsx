import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import axiosInstance from '../api/axiosInstance';
import ErrorAlert from '../components/ErrorAlert';
import ProductoCard from '../components/ProductoCard';
import ProductoForm from '../components/ProductoForm';

function obtenerBitacoraGuardada() {
  try {
    const bitacoraGuardada = localStorage.getItem(
      'bitacoraInventario'
    );

    return bitacoraGuardada
      ? JSON.parse(bitacoraGuardada)
      : [];
  } catch (error) {
    console.error(
      'La bitácora guardada no es válida:',
      error
    );

    localStorage.removeItem('bitacoraInventario');

    return [];
  }
}

function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [
    categoriaSeleccionada,
    setCategoriaSeleccionada,
  ] = useState('Todas');

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [productoEditando, setProductoEditando] =
    useState(null);

  const [bitacora, setBitacora] = useState(
    obtenerBitacoraGuardada
  );

  const manejarError = useCallback((errorPeticion) => {
    const estado =
      errorPeticion.response?.status || 'sin respuesta';

    const mensaje =
      errorPeticion.response?.data?.mensaje ||
      errorPeticion.response?.data?.error ||
      errorPeticion.message ||
      'Ocurrió un error inesperado.';

    console.error(`Error HTTP ${estado}:`, mensaje);

    setError(`HTTP ${estado}: ${mensaje}`);
  }, []);

  const cargarInventario = useCallback(async () => {
    setCargando(true);
    setError('');

    try {
      const [
        respuestaProductos,
        respuestaCategorias,
      ] = await Promise.all([
        axiosInstance.get('/api/productos'),
        axiosInstance.get('/api/categorias'),
      ]);

      setProductos(respuestaProductos.data);
      setCategorias(respuestaCategorias.data);
    } catch (errorPeticion) {
      manejarError(errorPeticion);
    } finally {
      setCargando(false);
    }
  }, [manejarError]);

  /*
   * Carga inicial.
   *
   * No se llama directamente a cargarInventario() dentro
   * del efecto para evitar la advertencia de ESLint sobre
   * actualizaciones síncronas de estado en useEffect.
   */
  useEffect(() => {
    let componenteActivo = true;

    Promise.all([
      axiosInstance.get('/api/productos'),
      axiosInstance.get('/api/categorias'),
    ])
      .then(
        ([
          respuestaProductos,
          respuestaCategorias,
        ]) => {
          if (!componenteActivo) {
            return;
          }

          setProductos(respuestaProductos.data);
          setCategorias(respuestaCategorias.data);
        }
      )
      .catch((errorPeticion) => {
        if (!componenteActivo) {
          return;
        }

        manejarError(errorPeticion);
      })
      .finally(() => {
        if (componenteActivo) {
          setCargando(false);
        }
      });

    return () => {
      componenteActivo = false;
    };
  }, [manejarError]);

  const registrarOperacion = (accion, producto) => {
    const nuevaOperacion = {
      id: Date.now(),
      accion,
      producto: producto.nombre,
      fecha: new Date().toLocaleString('es-CL'),
    };

    setBitacora((bitacoraActual) => {
      const bitacoraActualizada = [
        nuevaOperacion,
        ...bitacoraActual,
      ].slice(0, 20);

      localStorage.setItem(
        'bitacoraInventario',
        JSON.stringify(bitacoraActualizada)
      );

      return bitacoraActualizada;
    });
  };

  const abrirFormularioNuevo = () => {
    setProductoEditando(null);
    setError('');
    setMensajeExito('');
    setMostrarFormulario(true);
  };

  const abrirFormularioEdicion = (producto) => {
    setProductoEditando(producto);
    setError('');
    setMensajeExito('');
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setProductoEditando(null);
    setMostrarFormulario(false);
  };

  const guardarProducto = async (datosProducto) => {
    setGuardando(true);
    setError('');
    setMensajeExito('');

    try {
      if (productoEditando) {
        await axiosInstance.put(
          `/api/productos/${productoEditando.id}`,
          datosProducto
        );

        registrarOperacion(
          'Producto editado',
          datosProducto
        );

        setMensajeExito(
          `Producto "${datosProducto.nombre}" editado correctamente.`
        );
      } else {
        await axiosInstance.post(
          '/api/productos',
          datosProducto
        );

        registrarOperacion(
          'Producto agregado',
          datosProducto
        );

        setMensajeExito(
          `Producto "${datosProducto.nombre}" agregado correctamente.`
        );
      }

      cerrarFormulario();
      await cargarInventario();
    } catch (errorPeticion) {
      manejarError(errorPeticion);
    } finally {
      setGuardando(false);
    }
  };

  const eliminarProducto = async (producto) => {
    const confirmarEliminacion = window.confirm(
      `¿Seguro que quieres eliminar "${producto.nombre}"?`
    );

    if (!confirmarEliminacion) {
      return;
    }

    setError('');
    setMensajeExito('');

    try {
      await axiosInstance.delete(
        `/api/productos/${producto.id}`
      );

      registrarOperacion(
        'Producto eliminado',
        producto
      );

      setMensajeExito(
        `Producto "${producto.nombre}" eliminado correctamente.`
      );

      await cargarInventario();
    } catch (errorPeticion) {
      manejarError(errorPeticion);
    }
  };

  const probarError404 = async () => {
    setError('');
    setMensajeExito('');

    try {
      await axiosInstance.get(
        '/api/productos/9999'
      );
    } catch (errorPeticion) {
      manejarError(errorPeticion);
    }
  };

  const probarError500 = async () => {
    setError('');
    setMensajeExito('');

    try {
      await axiosInstance.get('/api/productos', {
        headers: {
          'x-simulate-error': '500',
        },
      });
    } catch (errorPeticion) {
      manejarError(errorPeticion);
    }
  };

  const productosFiltrados = useMemo(() => {
    if (categoriaSeleccionada === 'Todas') {
      return productos;
    }

    return productos.filter(
      (producto) =>
        producto.categoria === categoriaSeleccionada
    );
  }, [productos, categoriaSeleccionada]);

  const productosSinStock = productos.filter(
    (producto) => producto.stock === 0
  ).length;

  const unidadesTotales = productos.reduce(
    (total, producto) =>
      total + Number(producto.stock),
    0
  );

  const limpiarBitacora = () => {
    localStorage.removeItem('bitacoraInventario');
    setBitacora([]);
  };

  return (
    <main className="dashboard">
      <section className="welcome-panel">
        <div>
          <span className="section-label">
            PANEL PRINCIPAL
          </span>

          <h1>Inventario de tienda</h1>

          <p>
            Revisa y administra los productos, precios,
            categorías y disponibilidad.
          </p>
        </div>

        <div className="status-badge">
          <span className="status-dot"></span>
          API conectada
        </div>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <span className="summary-card-label">
            Productos registrados
          </span>

          <strong>{productos.length}</strong>

          <p>Total de productos de la API.</p>
        </article>

        <article className="summary-card">
          <span className="summary-card-label">
            Unidades disponibles
          </span>

          <strong>{unidadesTotales}</strong>

          <p>Suma del stock actual.</p>
        </article>

        <article className="summary-card">
          <span className="summary-card-label">
            Productos sin stock
          </span>

          <strong>{productosSinStock}</strong>

          <p>Productos que necesitan reposición.</p>
        </article>
      </section>

      <section className="content-panel">
        <div className="panel-heading">
          <div>
            <span className="section-label">
              INVENTARIO
            </span>

            <h2>Productos registrados</h2>
          </div>

          <div className="inventory-actions">
            <div className="filter-group">
              <label htmlFor="categoria">
                Categoría
              </label>

              <select
                id="categoria"
                value={categoriaSeleccionada}
                onChange={(event) =>
                  setCategoriaSeleccionada(
                    event.target.value
                  )
                }
              >
                <option value="Todas">
                  Todas
                </option>

                {categorias.map((categoria) => (
                  <option
                    key={categoria}
                    value={categoria}
                  >
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="primary-button"
              type="button"
              onClick={abrirFormularioNuevo}
            >
              Agregar producto
            </button>
          </div>
        </div>

        {mensajeExito && (
          <div
            className="success-alert"
            role="status"
          >
            {mensajeExito}
          </div>
        )}

        <ErrorAlert mensaje={error} />

        <details className="test-panel">
          <summary>
            Pruebas de manejo de errores
          </summary>

          <div className="test-actions">
            <button
              className="test-button"
              type="button"
              onClick={probarError404}
            >
              Probar error 404
            </button>

            <button
              className="test-button test-button-danger"
              type="button"
              onClick={probarError500}
            >
              Probar error 500
            </button>
          </div>
        </details>

        {cargando ? (
          <p className="loading-message">
            Cargando productos...
          </p>
        ) : (
          <div className="products-grid">
            {productosFiltrados.map((producto) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
                onEditar={abrirFormularioEdicion}
                onEliminar={eliminarProducto}
              />
            ))}
          </div>
        )}

        {!cargando &&
          productosFiltrados.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                📦
              </div>

              <h3>
                No hay productos en esta categoría
              </h3>

              <p>
                Selecciona otra categoría o agrega un
                producto.
              </p>
            </div>
          )}
      </section>

      <section className="content-panel audit-panel">
        <div className="panel-heading">
          <div>
            <span className="section-label">
              LOCALSTORAGE
            </span>

            <h2>Bitácora de operaciones</h2>
          </div>

          {bitacora.length > 0 && (
            <button
              className="secondary-button"
              type="button"
              onClick={limpiarBitacora}
            >
              Limpiar bitácora
            </button>
          )}
        </div>

        {bitacora.length === 0 ? (
          <p className="audit-empty">
            Todavía no se han registrado operaciones.
          </p>
        ) : (
          <ul className="audit-list">
            {bitacora.map((operacion) => (
              <li key={operacion.id}>
                <div>
                  <strong>
                    {operacion.accion}
                  </strong>

                  <span>
                    {operacion.producto}
                  </span>
                </div>

                <time>{operacion.fecha}</time>
              </li>
            ))}
          </ul>
        )}
      </section>

      {mostrarFormulario && (
        <div
          className="modal-backdrop"
          onMouseDown={cerrarFormulario}
        >
          <section
            className="modal-card"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-heading">
              <div>
                <span className="section-label">
                  {productoEditando
                    ? 'EDITAR'
                    : 'NUEVO PRODUCTO'}
                </span>

                <h2>
                  {productoEditando
                    ? 'Editar producto'
                    : 'Agregar producto'}
                </h2>
              </div>

              <button
                className="close-modal-button"
                type="button"
                onClick={cerrarFormulario}
                aria-label="Cerrar formulario"
              >
                ×
              </button>
            </div>

            <ProductoForm
              key={
                productoEditando
                  ? `editar-${productoEditando.id}`
                  : 'nuevo'
              }
              producto={productoEditando}
              categorias={categorias}
              onGuardar={guardarProducto}
              onCancelar={cerrarFormulario}
              guardando={guardando}
            />
          </section>
        </div>
      )}
    </main>
  );
}

export default InventarioPage;