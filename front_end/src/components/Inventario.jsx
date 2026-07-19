import { useEffect, useState } from "react";
import api from "../services/api";

function Inventario() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {

        const obtenerProductos = async () => {

            try {

                const respuesta = await api.get("/productos");

                setProductos(respuesta.data);

                console.log(respuesta.data);

            } catch (error) {

                console.log(error);

            }

        };

        obtenerProductos();

    }, []);

    return (
        <div>

            <h1>Sistema de Inventario</h1>

            <p>Bienvenido al sistema.</p>

            <hr />

            <h2>Productos</h2>

            <button>+ Nuevo Producto</button>

            <br />
            <br />

            <table border="1" cellPadding="10">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {productos.map((producto) => (

                        <tr key={producto.id}>

                            <td>{producto.id}</td>

                            <td>{producto.nombre}</td>

                            <td>${producto.precio}</td>

                            <td>{producto.stock}</td>

                            <td>{producto.categoria}</td>

                            <td>

                                <button>Editar</button>{" "}

                                <button>Eliminar</button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Inventario;