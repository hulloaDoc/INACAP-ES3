import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import ErrorAlert from './ErrorAlert';

function LoginForm() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        const success = await login(user, password);
        if (!success) {
            setErrorMessage('No se pudo iniciar sesión.');
        }
    };

    return (
        <form className="w-100" onSubmit={handleSubmit}>
            {errorMessage ? <ErrorAlert message={errorMessage} onClose={() => setErrorMessage('')} /> : null}
            <div className="mb-3">
                <label htmlFor="usuario" className="form-label">
                    Usuario
                </label>
                <input
                    id="usuario"
                    type="text"
                    className="form-control"
                    placeholder="Ingrese su usuario"
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
            </button>
        </form>
    );
}

export default LoginForm;
