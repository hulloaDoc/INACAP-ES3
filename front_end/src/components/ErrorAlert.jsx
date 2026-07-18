import React, { useState, useEffect } from 'react';

const ErrorAlert = () => {
    //1. estado para almacenar la informacion del error actual
    const [error, setError] = useState(null);

    //2. useeffect para escuchar el evento de error de axios

    useEffect(() => {
        const handleApiError = (event) => {
            setError(event.detail);
        };
        window.addEventListener('api-error', handleApiError);

        return () => {
            window.removeEventListener('api-error', handleApiError);
        }
    }, []);
    if (!error) return null;

    return (
        <div className="error-toast-card">
            <div className='error-toast-body'>
                <strong className='error-toast-title'>
                    Error {error.status}
                </strong>
                <p className='error-toast-message'> {error.mensaje}</p>
                {error.error && <small className="error-toast-detail">Detalle: {error.error}</small>}
            </div>
            <button
                className="error-toast-close"
                onClick={() => setError(null)}>
                X
            </button>
        </div>
    );
};
export default ErrorAlert;