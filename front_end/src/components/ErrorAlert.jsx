function ErrorAlert({ message, type = 'danger', onClose }) {
    if (!message) {
        return null;
    }

    return (
        <div className={`alert alert-${type} d-flex justify-content-between align-items-start`} role="alert">
            <span>{message}</span>
            {onClose ? (
                <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose} />
            ) : null}
        </div>
    );
}

export default ErrorAlert;
