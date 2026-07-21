import { useState } from 'react';

const formularioVacio = {
  nombre: '',
  precio: '',
  stock: '',
  categoria: '',
};

function crearFormularioInicial(producto, categorias) {
  if (producto) {
    return {
      nombre: producto.nombre,
      precio: String(producto.precio),
      stock: String(producto.stock),
      categoria: producto.categoria,
    };
  }

  return {
    ...formularioVacio,
    categoria: categorias[0] || '',
  };
}

function ProductoForm({
  producto,
  categorias,
  onGuardar,
  onCancelar,
  guardando,
}) {
  const [formulario, setFormulario] = useState(() =>
    crearFormularioInicial(producto, categorias)
  );

  const [errores, setErrores] = useState({});

  const cambiarCampo = (event) => {
    const { name, value } = event.target;

    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: value,
    }));

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [name]: '',
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }

    if (
      formulario.precio === '' ||
      Number.isNaN(Number(formulario.precio)) ||
      Number(formulario.precio) <= 0
    ) {
      nuevosErrores.precio =
        'El precio debe ser mayor que cero.';
    }

    if (
      formulario.stock === '' ||
      Number.isNaN(Number(formulario.stock)) ||
      Number(formulario.stock) < 0
    ) {
      nuevosErrores.stock =
        'El stock debe ser igual o mayor que cero.';
    }

    if (!formulario.categoria) {
      nuevosErrores.categoria =
        'Debes seleccionar una categoría.';
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const enviarFormulario = (event) => {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    onGuardar({
      nombre: formulario.nombre.trim(),
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      categoria: formulario.categoria,
    });
  };

  return (
    <form
      className="product-form"
      onSubmit={enviarFormulario}
      noValidate
    >
      <div className="form-group">
        <label htmlFor="nombre">
          Nombre del producto
        </label>

        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={cambiarCampo}
          placeholder="Ejemplo: Fideos 400g"
          disabled={guardando}
        />

        {errores.nombre && (
          <span className="field-error">
            {errores.nombre}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="precio">Precio</label>

          <input
            id="precio"
            name="precio"
            type="number"
            min="1"
            step="1"
            value={formulario.precio}
            onChange={cambiarCampo}
            placeholder="1500"
            disabled={guardando}
          />

          {errores.precio && (
            <span className="field-error">
              {errores.precio}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>

          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formulario.stock}
            onChange={cambiarCampo}
            placeholder="10"
            disabled={guardando}
          />

          {errores.stock && (
            <span className="field-error">
              {errores.stock}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="categoriaFormulario">
          Categoría
        </label>

        <select
          id="categoriaFormulario"
          name="categoria"
          value={formulario.categoria}
          onChange={cambiarCampo}
          disabled={guardando}
        >
          <option value="">
            Selecciona una categoría
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

        {errores.categoria && (
          <span className="field-error">
            {errores.categoria}
          </span>
        )}
      </div>

      <div className="form-buttons">
        <button
          className="secondary-button"
          type="button"
          onClick={onCancelar}
          disabled={guardando}
        >
          Cancelar
        </button>

        <button
          className="primary-button"
          type="submit"
          disabled={guardando}
        >
          {guardando
            ? 'Guardando...'
            : producto
              ? 'Guardar cambios'
              : 'Agregar producto'}
        </button>
      </div>
    </form>
  );
}

export default ProductoForm;