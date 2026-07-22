export const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div style={{
      background: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
      padding: '12px 20px',
      borderRadius: '4px',
      margin: '10px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <strong>Error {error.status}: </strong> {error.message}
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#721c24',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};