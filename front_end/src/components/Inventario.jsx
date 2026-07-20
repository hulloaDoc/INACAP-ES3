import { useEffect, useState } from "react";
import api from "../services/api";
import TablaProductos from "./TablaProductos";
import FormularioProducto from "./FormularioProducto";

function Inventario() {

    const [productos, setProductos] = useState([]);
    const [productoEditar, setProductoEditar] = useState(null);

    const cargarProductos = async () => {

        try {

            const respuesta = await api.get("/productos");

            setProductos(respuesta.data);

            console.log(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        cargarProductos();

    }, []);

    return (
        <div>

            <h1>Sistema de Inventario</h1>

            <p>Bienvenido al sistema.</p>

            <hr />

            <h2>Productos</h2>

            <button>+ Nuevo Producto</button>

            <FormularioProducto
                cargarProductos={cargarProductos}
                productoEditar={productoEditar}
                setProductoEditar={setProductoEditar}
            />

            <br />
            <br />

            <TablaProductos
                productos={productos}
                cargarProductos={cargarProductos}
                setProductoEditar={setProductoEditar}

                
            />
                <hr />

            <h3>Historial de acciones</h3>

            <ul>

        {(JSON.parse(localStorage.getItem("historial")) || []).map((item, index) => (

        <li key={index}>{item}</li>

        ))}

        </ul>
        </div>
    );
}

export default Inventario;