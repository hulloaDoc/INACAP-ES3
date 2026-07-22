export const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '1rem', 
      background: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 'bold', color: '#666' }}>ID: {product.id}</span>
          <span style={{ background: '#e9ecef', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
            {product.categoria}
          </span>
        </div>
        
        <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.nombre}</h3>
        <p style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', color: '#28a745' }}>${product.precio}</p>
        
        <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold', color: product.stock === 0 ? '#dc3545' : '#212529' }}>
          Stock: {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => onEdit(product)}
          style={{ flex: 1, padding: '0.5rem', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(product.id)}
          style={{ flex: 1, padding: '0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};