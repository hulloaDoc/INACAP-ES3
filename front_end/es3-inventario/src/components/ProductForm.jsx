import { useState } from 'react';
import './ProductForm.css';

// Objeto "plantilla" para cuando el formulario está vacio
// (caso de "Agregar Producto" nuevo)
const VACIO = { nombre: '', precio: '', stock: '', categoria: '' };

// Formulario para crear o editar un producto
export default function ProductForm({ producto, categorias, onGuardar, onCancelar }) {
    // Inicia el estado del formulario segun si es esdición o creación
    // La función en useState para que este cálculo se haga
    // solo una vez, no cafa render
  const [valores, setValores] = useState(
    producto
      ? { nombre: producto.nombre, precio: producto.precio, stock: producto.stock, categoria: producto.categoria }
      : { ...VACIO, categoria: categorias[0] ?? '' },
  );
  // Aca se guardan los mensajes de error de validación uno por campo
  const [errores, setErrores] = useState({});

  // Revisa que los campos obligatorios estén completos y sean válidos.
  // Devuelve true si todo sale bien, false en caso de un error.
  const validar = () => {
    const nuevosErrores = {};
    if (!valores.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (valores.precio === '' || Number(valores.precio) < 0) nuevosErrores.precio = 'Ingresa un precio válido.';
    if (valores.stock === '' || Number(valores.stock) < 0) nuevosErrores.stock = 'Ingresa un stock válido.';
    if (!valores.categoria) nuevosErrores.categoria = 'Selecciona una categoría.';
    setErrores(nuevosErrores);

    // Si el objeto de errores no tienen ninguna llave significa
    // que no hubo errores
    return Object.keys(nuevosErrores).length === 0;
  };

  // Se ejecuta al enviar formiulario
  const handleSubmit = (e) => {
    // Evita que la pagina se recargue
    e.preventDefault();
    // Si la validación falla, no sigue (quedando los errores guardados en validar() )
    if (!validar()) return;

    // convierte precio y stock a número antes de mandarlos,
    // porque los inputs siempre entregan strings
    onGuardar({
      nombre: valores.nombre.trim(),
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      categoria: valores.categoria,
    });
  };
  // Función "generadora" de handlers: en vez de escribir un onChange
  // distinto para cada input, se genera un dinamico según el campo.
  const handleChange = (campo) => (e) => {
    setValores((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  return (
    <div className="product-form__overlay">
      <form className="product-form" onSubmit={handleSubmit}>
        {/* El titulo cambia segun si estamos editando o creando */}
        <h2>{producto ? 'Editar Producto' : 'Agregar Producto'}</h2>

        <label>
          Nombre
          <input type="text" value={valores.nombre} onChange={handleChange('nombre')} />
          {errores.nombre && <span className="product-form__error">{errores.nombre}</span>}
        </label>

        <label>
          Precio
          <input type="number" min="0" value={valores.precio} onChange={handleChange('precio')} />
          {errores.precio && <span className="product-form__error">{errores.precio}</span>}
        </label>

        <label>
          Stock
          <input type="number" min="0" value={valores.stock} onChange={handleChange('stock')} />
          {errores.stock && <span className="product-form__error">{errores.stock}</span>}
        </label>

        <label>
          Categoría
          <select value={valores.categoria} onChange={handleChange('categoria')}>
            <option value="">Selecciona...</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errores.categoria && <span className="product-form__error">{errores.categoria}</span>}
        </label>

        <div className="product-form__actions">
          <button type="button" className="btn-eliminar" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="btn-editar">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
