import { useState } from 'react';
import './SearchBar.css';

// Barra de búsqueda de productos. Si el texto ingresado es un número,
// se interpreta como ID y se consulta directamente contra el backend
// (GET /productos/:id), por lo que un ID inexistente produce un 404
// real del servidor. Si no es un número, se busca por nombre o
// categoría dentro de los productos ya cargados.
export default function SearchBar({ onBuscar }) {
  const [texto, setTexto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(texto.trim());
  };

  const handleLimpiar = () => {
    setTexto('');
    onBuscar('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar por ID, nombre o categoría..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button type="submit" className="search-bar__btn">
        Buscar
      </button>
      <button type="button" className="search-bar__btn search-bar__btn--limpiar" onClick={handleLimpiar}>
        Limpiar
      </button>
    </form>
  );
}
