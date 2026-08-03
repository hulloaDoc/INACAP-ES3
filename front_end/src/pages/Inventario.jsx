import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import ErrorAlert from "../components/ErrorAlert";

import {
  obtenerProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
} from "../services/productosService";

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [mensajeError, setMensajeError] = useState("");

  const guardarBitacora = (mensaje) => {
    const historial = JSON.parse(localStorage.getItem("bitacora")) || [];

    historial.unshift(
      `[${new Date().toLocaleTimeString()}] ${mensaje}`
    );

    localStorage.setItem("bitacora", JSON.stringify(historial));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
      setMensajeError("");
    } catch (error) {
      setMensajeError("No fue posible cargar los productos.");
      console.log(error);
    }
  };

  const guardarProducto = async (producto) => {
    try {
      if (productoEditar) {
        await editarProducto(productoEditar.id, producto);
        guardarBitacora(`Se editó el producto ${producto.nombre}`);
        setProductoEditar(null);
      } else {
        await crearProducto(producto);
        guardarBitacora(`Se agregó el producto ${producto.nombre}`);
      }

      setMensajeError("");
      cargarProductos();
    } catch (error) {
      setMensajeError("No fue posible guardar el producto.");
      console.log(error);
    }
  };

  const borrarProducto = async (id) => {
    try {
      await eliminarProducto(id);
      guardarBitacora(`Se eliminó el producto ID ${id}`);
      setMensajeError("");
      cargarProductos();
    } catch (error) {
      setMensajeError("No fue posible eliminar el producto.");
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <ErrorAlert mensaje={mensajeError} />

      <h1>Inventario</h1>

      <ProductForm
        onGuardar={guardarProducto}
        productoEditar={productoEditar}
      />

      <br />

      <ProductTable
        productos={productos}
        onEditar={setProductoEditar}
        onEliminar={borrarProducto}
      />
    </>
  );
}

export default Inventario;