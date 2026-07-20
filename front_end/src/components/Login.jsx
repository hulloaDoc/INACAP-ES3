import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { saveSession } from '../utils/storage';

const Login = ({ onLoginSuccess }) => {
    // 1. estados para los campos de entrada
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // 2. estados para el control visual del login
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 3. funcion para procesar el envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // evitamos que la pagina se recargue sola
        setError(''); // se limpia errores anteriores
        setLoading(true); // activamos el estado de carga (loading)

        try {
            // hacemos el post con los datos ingresados
            const response = await axiosInstance.post('/api/login', {
                username,
                password
            });
            // si el servidor valida las credenciales correctamente
            if (response.data.success) {
                const { token, user } = response.data;

                // se guarda el token y perfil en localstorage
                saveSession(token, user);

                // le avisamos a app.jsx que el login fue exitoso
                onLoginSuccess(token, user);
            }
        } catch (err) {
            // si el servidor responde con error 401 (no autorizado)
            if (err.response && err.response.status === 401) {
                setError('Usuario o contraseña incorrectos.');
            } else {
                setError('no se pudo establecer conexion con el servidor.');
            }
        } finally {
            setLoading(false); // desactivamos el loading al terminar
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>

                {error && <div className="login-error-message">{error}</div>}

                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="ej: admin"
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        disabled={loading}
                        required
                    />
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Cargando...' : 'Entrar'}
                </button>

                <div className="login-hint">
                    <small>Prueba con: <strong>admin</strong> / <strong>admin123</strong></small>
                </div>
            </form>
        </div>
    );
};

export default Login;
