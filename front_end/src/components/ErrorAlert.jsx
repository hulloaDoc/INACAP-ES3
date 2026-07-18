function ErrorAlert({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className="error-alert" role="alert">
      <span>{message}</span>

      {onClose && (
        <button
          type="button"
          className="error-alert__close"
          onClick={onClose}
          aria-label="Cerrar alerta"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default ErrorAlert;