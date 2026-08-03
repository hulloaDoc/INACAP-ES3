import { useState, useEffect } from "react";

function ProductForm({ onGuardar, productoEditar }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre);
      setPrecio(productoEditar.precio);
      setStock(productoEditar.stock);
      setCategoria(productoEditar.categoria);
    }
  }, [productoEditar]);

  const guardar = (e) => {
    e.preventDefault();

    onGuardar({
      nombre,
      precio,
      stock,
      categoria,
    });

    setNombre("");
    setPrecio("");
    setStock("");
    setCategoria("");
  };

  return (
    <form onSubmit={guardar}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <input
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <button type="submit">
        {productoEditar ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

export default ProductForm;