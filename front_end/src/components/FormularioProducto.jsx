import { useEffect, useState } from "react";
import api from "../services/api";
import { guardarHistorial } from "../utils/historial";

function FormularioProducto({
    cargarProductos,
    productoEditar,
    setProductoEditar
}) {

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState("");

    useEffect(() => {

        if (productoEditar) {

            setNombre(productoEditar.nombre);
            setPrecio(productoEditar.precio);
            setStock(productoEditar.stock);
            setCategoria(productoEditar.categoria);

        }

    }, [productoEditar]);

    const guardarProducto = async (e) => {

        e.preventDefault();

        if (!nombre || !precio || !stock || !categoria) {

            alert("Debe completar todos los campos.");
            return;

        }

        try {

            if (productoEditar) {

                await api.put(`/productos/${productoEditar.id}`, {

                    nombre,
                    precio: Number(precio),
                    stock: Number(stock),
                    categoria

                });
                guardarHistorial(`Se editó el producto "${nombre}"`);

                alert("Producto actualizado correctamente.");

            } else {

                await api.post("/productos", {

                    nombre,
                    precio: Number(precio),
                    stock: Number(stock),
                    categoria

                });

                alert("Producto agregado correctamente.");
                guardarHistorial(`Se agregó el producto "${nombre}"`);

            }

            setNombre("");
            setPrecio("");
            setStock("");
            setCategoria("");

            setProductoEditar(null);

            await cargarProductos();

        } catch (error) {

            console.log(error);

            alert("No se pudo guardar el producto.");

        }

    };

    return (

        <div>

            <h3>
                {productoEditar ? "Editar Producto" : "Nuevo Producto"}
            </h3>

            <form onSubmit={guardarProducto}>

                <div>

                    <label>Nombre</label>
                    <br />

                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                </div>

                <br />

                <div>

                    <label>Precio</label>
                    <br />

                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />

                </div>

                <br />

                <div>

                    <label>Stock</label>
                    <br />

                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />

                </div>

                <br />

                <div>

                    <label>Categoría</label>
                    <br />

                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />

                </div>

                <br />

                <button type="submit">
                    {productoEditar ? "Actualizar" : "Guardar"}
                </button>

            </form>

        </div>

    );

}

export default FormularioProducto;