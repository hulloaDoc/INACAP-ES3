function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio);
}

function ProductoCard({ producto, onEditar, onEliminar }) {
  const sinStock = producto.stock === 0;

  return (
    <article
      className={`product-card ${
        sinStock ? 'product-card-empty' : ''
      }`}
    >
      <div className="product-card-header">
        <span className="product-id">
          Producto #{producto.id}
        </span>

        <span
          className={`stock-badge ${
            sinStock ? 'stock-empty' : 'stock-ok'
          }`}
        >
          {sinStock
            ? 'Sin stock'
            : `${producto.stock} unidades`}
        </span>
      </div>

      <h3>{producto.nombre}</h3>
      <p className="product-category">{producto.categoria}</p>

      <strong className="product-price">
        {formatearPrecio(producto.precio)}
      </strong>

      <div className="product-actions">
        <button
          className="edit-button"
          type="button"
          onClick={() => onEditar(producto)}
        >
          Editar
        </button>

        <button
          className="delete-button"
          type="button"
          onClick={() => onEliminar(producto)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default ProductoCard;