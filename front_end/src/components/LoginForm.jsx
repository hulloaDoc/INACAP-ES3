import { useState } from 'react';

function LoginForm() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className="w-100">
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
