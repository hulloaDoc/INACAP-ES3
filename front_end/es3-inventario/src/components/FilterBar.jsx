import './FilterBar.css';

// barra de filtro que va sobre la tabla de prooductos.
// Permite filtrar por categorias y por estados de stock, ademas
// de tener el boton para agregar un producto nuevo.
export default function FilterBar({ categorias, categoria, onCategoriaChange, filtroStock, onFiltroStockChange, onAgregar }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__filters">
        <label>
          Categoría:
          <select value={categoria} onChange={(e) => onCategoriaChange(e.target.value)}>
            <option value="Todas">Todas</option>
            {/* Opciones dinamicas segun las categorias que existan en el sistema */}
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filtro:
          <select value={filtroStock} onChange={(e) => onFiltroStockChange(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="En stock">En stock</option>
            <option value="Agotado">Agotado</option>
          </select>
        </label>
      </div>
      <button type="button" className="filter-bar__add" onClick={onAgregar}>
        + Agregar Producto
      </button>
    </div>
  );
}
