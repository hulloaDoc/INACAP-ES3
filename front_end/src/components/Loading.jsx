function Loading({ message = 'Cargando...' }) {
    return (
        <div className="d-flex align-items-center justify-content-center py-4" role="status">
            <div className="spinner-border text-primary me-2" aria-hidden="true" />
            <span>{message}</span>
        </div>
    );
}

export default Loading;
