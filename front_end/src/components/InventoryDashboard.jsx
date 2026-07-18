import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  updateProduct,
} from '../services/productService';

import ErrorAlert from './ErrorAlert';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

function InventoryDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState('Todas');

  const [stockFilter, setStockFilter] =
    useState('Todos');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [errorMessage, setErrorMessage] =
    useState('');

  const [successMessage, setSuccessMessage] =
    useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState(null);

  const loadInventory = useCallback(
    async (showLoading = true) => {
      if (showLoading) {
        setLoading(true);
      }

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
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

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

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);

    window.setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setErrorMessage('');
    setSuccessMessage('');
    setFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setErrorMessage('');
    setSuccessMessage('');
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    if (saving) {
      return;
    }

    setFormOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (productData) => {
    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (editingProduct) {
        await updateProduct(
          editingProduct.id,
          productData,
        );

        showSuccessMessage(
          `El producto "${productData.nombre}" fue actualizado correctamente.`,
        );
      } else {
        await createProduct(productData);

        showSuccessMessage(
          `El producto "${productData.nombre}" fue registrado correctamente.`,
        );
      }

      await loadInventory(false);

      setFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      setErrorMessage(
        error.userMessage ||
          'No fue posible guardar el producto.',
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${product.nombre}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(product.id);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await deleteProduct(product.id);
      await loadInventory(false);

      showSuccessMessage(
        `El producto "${product.nombre}" fue eliminado correctamente.`,
      );
    } catch (error) {
      setErrorMessage(
        error.userMessage ||
          'No fue posible eliminar el producto.',
      );
    } finally {
      setDeletingId(null);
    }
  };

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
              Registra, consulta, modifica y elimina
              productos del inventario.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={handleOpenCreate}
        >
          + Agregar producto
        </button>
      </section>

      <ErrorAlert
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />

      {successMessage && (
        <div
          className="success-alert"
          role="status"
        >
          <span>✅</span>
          <span>{successMessage}</span>
        </div>
      )}

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
          onEdit={handleOpenEdit}
          onDelete={handleDeleteProduct}
          deletingId={deletingId}
        />
      )}

      {formOpen && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={handleSaveProduct}
          onCancel={handleCloseForm}
          saving={saving}
        />
      )}
    </main>
  );
}

export default InventoryDashboard;