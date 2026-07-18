import { useEffect, useMemo, useState } from 'react';
import {
  getCategories,
  getProducts,
} from '../services/productService';
import ErrorAlert from './ErrorAlert';
import ProductTable from './ProductTable';

function InventoryDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState('Todas');
  const [stockFilter, setStockFilter] =
    useState('Todos');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] =
    useState('');

  useEffect(() => {
    const loadInventory = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const [productsData, categoriesData] =
          await Promise.all([
            getProducts(),
            getCategories(),
          ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        setErrorMessage(
          error.userMessage ||
            'No fue posible cargar el inventario.',
        );
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todas' ||
        product.categoria === selectedCategory;

      const stock = Number(product.stock) || 0;

      const matchesStock =
        stockFilter === 'Todos' ||
        (stockFilter === 'En stock' && stock > 0) ||
        (stockFilter === 'Sin stock' && stock === 0);

      return matchesCategory && matchesStock;
    });
  }, [
    products,
    selectedCategory,
    stockFilter,
  ]);

  return (
    <main className="dashboard">
      <section className="dashboard-title">
        <div>
          <span className="dashboard-title__icon">
            📦
          </span>

          <div>
            <h1>Administración de productos</h1>

            <p>
              Consulta y filtra el inventario disponible.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="primary-button"
          disabled
          title="Se habilitará en el próximo paso"
        >
          + Agregar producto
        </button>
      </section>

      <ErrorAlert
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />

      <section className="inventory-toolbar">
        <div className="filter-group">
          <label htmlFor="category-filter">
            Categoría
          </label>

          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
          >
            <option value="Todas">
              Todas las categorías
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
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
              setStockFilter(event.target.value)
            }
          >
            <option value="Todos">Todos</option>
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
          <strong>
            {filteredProducts.length}
          </strong>
        </div>
      </section>

      {loading ? (
        <section className="inventory-loading">
          <div className="loading-spinner" />
          <p>Cargando productos...</p>
        </section>
      ) : (
        <ProductTable
          products={filteredProducts}
        />
      )}
    </main>
  );
}

export default InventoryDashboard;