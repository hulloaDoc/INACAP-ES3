import { useEffect, useState } from 'react';
import ErrorAlert from './ErrorAlert';

const emptyProduct = {
  nombre: '',
  precio: '',
  stock: '',
  categoria: '',
};

function ProductForm({
  product,
  categories,
  onSubmit,
  onCancel,
  saving,
}) {
  const [form, setForm] = useState(emptyProduct);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.nombre || '',
        precio: String(product.precio ?? ''),
        stock: String(product.stock ?? ''),
        categoria: product.categoria || '',
      });
    } else {
      setForm({
        ...emptyProduct,
        categoria: categories[0] || '',
      });
    }

    setErrorMessage('');
  }, [product, categories]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');

    const nombre = form.nombre.trim();
    const precio = Number(form.precio);
    const stock = Number(form.stock);
    const categoria = form.categoria;

    if (!nombre || !categoria) {
      setErrorMessage(
        'El nombre y la categoría son obligatorios.',
      );
      return;
    }

    if (!Number.isFinite(precio) || precio <= 0) {
      setErrorMessage(
        'El precio debe ser un número mayor que cero.',
      );
      return;
    }

    if (
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setErrorMessage(
        'El stock debe ser un número entero igual o mayor que cero.',
      );
      return;
    }

    onSubmit({
      nombre,
      precio,
      stock,
      categoria,
    });
  };

  return (
    <div className="modal-backdrop">
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
      >
        <div className="product-modal__header">
          <div>
            <span>
              {product ? '✏️' : '➕'}
            </span>

            <div>
              <h2 id="product-form-title">
                {product
                  ? 'Editar producto'
                  : 'Agregar producto'}
              </h2>

              <p>
                Completa los datos obligatorios del inventario.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onCancel}
            aria-label="Cerrar formulario"
            disabled={saving}
          >
            ×
          </button>
        </div>

        <ErrorAlert
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />

        <form
          className="product-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group product-form__full">
            <label htmlFor="product-name">
              Nombre
            </label>

            <input
              id="product-name"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ejemplo: Arroz Grano Largo 1kg"
              maxLength={100}
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-price">
              Precio
            </label>

            <input
              id="product-price"
              name="precio"
              type="number"
              min="1"
              step="1"
              value={form.precio}
              onChange={handleChange}
              placeholder="1250"
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-stock">
              Stock
            </label>

            <input
              id="product-stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
              placeholder="45"
              disabled={saving}
            />
          </div>

          <div className="form-group product-form__full">
            <label htmlFor="product-category">
              Categoría
            </label>

            <select
              id="product-category"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              disabled={saving}
            >
              <option value="">
                Selecciona una categoría
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

          <div className="product-form__actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onCancel}
              disabled={saving}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving
                ? 'Guardando...'
                : product
                  ? 'Guardar cambios'
                  : 'Registrar producto'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ProductForm;