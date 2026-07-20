import './ErrorAlert.css';
 // Componnete reutilizable para mostrar mensaje de error en la interfaz.
 // se usa, por ejemplo cuando falla una peición a la API
export default function ErrorAlert({ status, mensaje, onClose }) {
    // Si no hay mensaje, no mostramos nada (evita renderizar una alaerta vacia )
    if (!mensaje) return null;

  return (
    // role=alert ayuda a la accesibilidad, permitiendo avisar al usuario que apareció algo importante.
    <div className="error-alert" role="alert">
      <span className="error-alert__icon">⚠</span>
      <div className="error-alert__body">
        {/* El status (ej: 404, 500) es opcional pero eso el && */}
        {status && <strong className="error-alert__status">Error {status}</strong>}
        <span>{mensaje}</span>
      </div>
      {/* El boton de cerrar solo aparece si nos pasaron la función onClose */}
      {onClose && (
        <button type="button" className="error-alert__close" onClick={onClose} aria-label="Cerrar">
          x
        </button>
      )}
    </div>
  );
}
