import React, { useState, useEffect } from 'react';

export const ProductForm = ({ categorias, onSave, productoEditando, onCancelar }) => {
  const [formData, setFormData] = useState({ nombre: '', precio: '', stock: '', categoria: '' });

  // Si cambia el producto seleccionado para editar, rellena el formulario automáticamente
  useEffect(() => {
    if (productoEditando) {
      setFormData(productoEditando);
    } else {
      setFormData({ nombre: '', precio: '', stock: '', categoria: categorias[0] || '' });
    }
  }, [productoEditando, categorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Mitigación nativa XSS: se parsea estrictamente como tipos de datos primitivos correctos
    setFormData({
      ...formData,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || formData.precio === '' || !formData.categoria) return;
    onSave(formData);
    // Limpia el formulario solo si es una creación nueva
    if (!productoEditando) {
      setFormData({ nombre: '', precio: '', stock: '', categoria: categorias[0] || '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>
        {productoEditando ? '✏️ Editar Producto Seleccionado' : '➕ Registrar Nuevo Producto en Stock'}
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Categoría:</label>
          <select name="categoria" value={formData.categoria} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Precio ($):</label>
          <input type="number" name="precio" value={formData.precio} onChange={handleChange} min="0" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Stock Inicial:</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {productoEditando ? 'Actualizar Producto' : 'Guardar Producto'}
        </button>
        {productoEditando && (
          <button type="button" onClick={onCancelar} style={{ backgroundColor: '#64748b', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
