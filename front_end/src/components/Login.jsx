import { useState } from "react";
import api from "../services/api";

function Login({ onLogin }) {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
 const iniciarSesion = async () => {
    try {

        const respuesta = await api.post("/login", {
            username: usuario,
            password: password
        });

        localStorage.setItem("token", respuesta.data.token);
        

        console.log("Token guardado correctamente");

        onLogin();
        
        console.log(respuesta.data);

    } catch (error) {

        console.log(error.response.data);

    }
};

    return (
        <div>
            <h1>Iniciar Sesión</h1>

            <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={iniciarSesion}>
    Ingresar
</button>
        </div>
    );
}

export default Login;