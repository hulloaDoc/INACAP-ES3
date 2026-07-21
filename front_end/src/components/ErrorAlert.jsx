export default function ErrorAlert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="error-alert" role="alert">
      <span className="error-alert-text">{message}</span>
      <button className="error-alert-close" onClick={onClose} aria-label="Cerrar">
        X
      </button>
    </div>
  );
}
