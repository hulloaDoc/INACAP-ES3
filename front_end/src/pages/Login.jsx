import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const { login: guardarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await login(username, password);

      guardarSesion(respuesta.user, respuesta.token);

      navigate("/inventario");
    } catch (error) {
      setMensaje("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <h1>Inicio de Sesión</h1>

      <form onSubmit={iniciarSesion}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Ingresar</button>

        <br />
        <br />

        <p>{mensaje}</p>
      </form>
    </div>
  );
}

export default Login;