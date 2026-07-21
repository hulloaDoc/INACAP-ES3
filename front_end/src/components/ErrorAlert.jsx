import React from 'react';

export const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  // Imprime logs explícitos en consola requeridos para tus capturas de pantalla de evidencia
  console.error(`[EVIDENCIA ES3] Excepción HTTP Detectada: Estado ${error.status} - ${error.message}`);

  return (
    <div style={{ 
      backgroundColor: '#fee2e2', 
      border: '1px solid #ef4444', 
      padding: '1rem', 
      marginBottom: '1.5rem', 
      borderRadius: '6px', 
      position: 'relative',
      boxShadow: '0 2px 4px rgba(239, 68, 68, 0.1)'
    }}>
      <strong style={{ color: '#991b1b', display: 'block', marginBottom: '0.25rem' }}>
        ⚠️ Error del Sistema (HTTP {error.status})
      </strong>
      <p style={{ color: '#b91c1c', margin: 0, fontSize: '0.9rem' }}>
        {error.message}
      </p>
      <button 
        onClick={onClose} 
        style={{ 
          position: 'absolute', 
          top: '12px', 
          right: '12px', 
          background: 'none', 
          border: 'none', 
          color: '#991b1b',
          cursor: 'pointer', 
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        ✕
      </button>
    </div>
  );
};
