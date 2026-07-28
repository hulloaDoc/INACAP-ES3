function ProductFilters({
  categories,
  selectedCategory,
  stockFilter,
  onCategoryChange,
  onStockFilterChange,
}) {
  return (
    <section className="inventory-toolbar">
      <div className="filter-group">
        <label htmlFor="category-filter">
          Categoría
        </label>

        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
        >
          <option value="Todas">
            Todas las categorías
          </option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="stock-filter">
          Disponibilidad
        </label>

        <select
          id="stock-filter"
          value={stockFilter}
          onChange={(event) =>
            onStockFilterChange(event.target.value)
          }
        >
          <option value="Todos">
            Todos
          </option>

          <option value="En stock">
            En stock
          </option>

          <option value="Sin stock">
            Sin stock
          </option>
        </select>
      </div>

      <div className="inventory-counter">
        <span>Productos visibles</span>
        <strong id="visible-products-count">—</strong>
      </div>
    </section>
  );
}

export default ProductFilters;