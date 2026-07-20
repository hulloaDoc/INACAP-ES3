import { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Inventario from "./components/Inventario";

function App() {

    const [logueado, setLogueado] = useState(false);

    return (
        <>
            {
                logueado
                    ? <Inventario />
                    : <Login onLogin={() => setLogueado(true)} />
            }
        </>
    );
}

export default App;