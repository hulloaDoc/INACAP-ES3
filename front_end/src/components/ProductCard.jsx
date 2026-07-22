import axiosInstance from "../api/axiosInstance";

function ProductCard({ producto }) {
    const eliminarProducto = async () => {
    try {
        await axiosInstance.delete(`/productos/${producto.id}`);
        alert("Producto eliminado");
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
    };

    return (
    <div>
        <h3>{producto.nombre}</h3>
        <button onClick={eliminarProducto}>Eliminar</button>
    </div>
    );
}

export default ProductCard;
