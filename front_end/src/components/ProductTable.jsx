function formatPrice(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '$0';
  }

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(numericValue);
}

function ProductTable({ products }) {
  if (products.length === 0) {
    return (
      <section className="empty-state">
        <span>📭</span>
        <h2>No hay productos para mostrar</h2>
        <p>
          No existen productos que coincidan con los filtros seleccionados.
        </p>
      </section>
    );
  }

  return (
    <section className="table-card">
      <div className="table-responsive">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const stock = Number(product.stock) || 0;

              return (
                <tr key={product.id}>
                  <td>{product.id}</td>

                  <td>
                    <strong>{product.nombre}</strong>
                  </td>

                  <td>{formatPrice(product.precio)}</td>

                  <td>{stock} u.</td>

                  <td>{product.categoria}</td>

                  <td>
                    <span
                      className={
                        stock > 0
                          ? 'stock-badge stock-badge--available'
                          : 'stock-badge stock-badge--empty'
                      }
                    >
                      {stock > 0
                        ? 'En stock'
                        : 'Sin stock'}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="edit-button"
                        disabled
                        title="Se habilitará en el próximo paso"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        disabled
                        title="Se habilitará en el próximo paso"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProductTable;