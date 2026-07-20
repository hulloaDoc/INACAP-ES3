import api from "../services/api";
import { guardarHistorial } from "../utils/historial";

function TablaProductos({
    productos,
    cargarProductos,
    setProductoEditar
}) {

    const eliminarProducto = async (id) => {

        const confirmar = window.confirm(
            "¿Desea eliminar este producto?"
        );

        if (!confirmar) {

            return;

        }

        try {

            await api.delete(`/productos/${id}`);

            const producto = productos.find(p => p.id === id);

            guardarHistorial(`Se eliminó el producto "${producto.nombre}"`);

            alert("Producto eliminado correctamente.");

            await cargarProductos();

        } catch (error) {

            console.log(error);

            alert("No se pudo eliminar el producto.");

        }

    };

    return (

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

                            <button
                                onClick={() => setProductoEditar(producto)}
                            >
                                Editar
                            </button>{" "}

                            <button
                                onClick={() => eliminarProducto(producto.id)}
                            >
                                Eliminar
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default TablaProductos;