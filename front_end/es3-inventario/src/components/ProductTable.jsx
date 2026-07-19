 import './ProductTable.css';

 // Se formatea la moneda una sola vez fuera del componente
 // (con la finalidad de no tener que crear uno nuevo en cada render)
 // asi mostramos los precio en formato de pesos chilenos
const formatoPrecio = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

// Tabla que muestra el listado de productos con botones
// para editar o eliminar cada uno 
export default function ProductTable({ productos, onEditar, onEliminar }) {

    // En caso de no haber productos (por un filtro que no encontro resultados)
    // se muestra un mensaje en vez de una tabla vacia.
  if (productos.length === 0) {
    return <p className="product-table__empty">No hay productos que coincidan con el filtro seleccionado.</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        { /* Estos botones solo avisan al componente padre 
            que producto se quiere editar/eliminar, la logica
            real vive arriba (dentro del hook useProductos) */}
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{formatoPrecio.format(producto.precio)}</td>
            <td>{producto.stock} u.</td>
            <td>{producto.categoria}</td>
            <td className="product-table__actions">
              <button type="button" className="btn-editar" onClick={() => onEditar(producto)}>
                Editar
              </button>
              <button type="button" className="btn-eliminar" onClick={() => onEliminar(producto)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
