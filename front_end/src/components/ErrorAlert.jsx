/**
 * Alerta reutilizable para mostrar mensajes de error o éxito.
 * @param {{ mensaje: string, tipo?: 'error' | 'exito', onClose?: () => void }} props
 */
function ErrorAlert({ mensaje, tipo = 'error', onClose }) {
  if (!mensaje) return null;

  const alertClass = tipo === 'exito' ? 'alert alert--success' : 'alert alert--error';

  return (
    <div className={alertClass} role="alert">
      <span>{mensaje}</span>
      {onClose && (
        <button
          type="button"
          className="alert__close"
          onClick={onClose}
          aria-label="Cerrar mensaje"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default ErrorAlert;
