import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { logTransaction } from '../services/logger';

export const ProductForm = ({ initialData, onSuccess, onCancel }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Si recibe initialData, significa que estamos editando (PUT), si no, estamos creando (POST)
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '');
      setPrecio(initialData.precio || '');
      setStock(initialData.stock || '');
      setCategoria(initialData.categoria || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const productPayload = {
      nombre,
      precio: Number(precio),
      stock: Number(stock),
      categoria
    };

    try {
      if (initialData && initialData.id) {
        // Petición PUT para actualizar
        await axiosInstance.put(`/productos/${initialData.id}`, productPayload);
        logTransaction('admin', `editó el producto ID ${initialData.id}`);
      } else {
        // Petición POST para crear
        await axiosInstance.post('/productos', productPayload);
        logTransaction('admin', `creó un nuevo producto: ${nombre}`);
      }

      // Notificamos éxito para cerrar formulario y recargar lista
      onSuccess();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setErrorMsg('No se pudo guardar el producto. Verifica los datos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', border: '1px solid #ddd' }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
        {initialData ? `Editar Producto (ID: ${initialData.id})` : 'Agregar Nuevo Producto'}
      </h3>

      {errorMsg && (
        <div style={{ background: '#f8fdca', color: '#856404', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ffeeba' }}>
          {errorMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Nombre:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Precio ($):</label>
          <input 
            type="number" 
            value={precio} 
            onChange={(e) => setPrecio(e.target.value)} 
            required 
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Stock:</label>
          <input 
            type="number" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)} 
            required 
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Categoría:</label>
          <input 
            type="text" 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)} 
            required 
            placeholder="Ej. Abarrotes, Lácteos"
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button 
          type="button" 
          onClick={onCancel}
          style={{ background: '#6c757d', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ background: '#28a745', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </div>
    </form>
  );
};