import axiosInstance from "../api/axiosInstance";

export default function ProductCard({ producto, onDelete }) {
    const handleDelete = async () => {
    try {
        await axiosInstance.delete(`/productos/${producto.id}`);

      // Bitácora en LocalStorage
        const log = JSON.parse(localStorage.getItem("bitacora") || "[]");
        log.push(`[${new Date().toLocaleTimeString()}] admin eliminó producto ID ${producto.id}`);
        localStorage.setItem("bitacora", JSON.stringify(log));

        onDelete(producto.id);
    } catch (err) {
        console.error("Error al eliminar producto:", err);
    }
    };

    return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "5px" }}>
        <h4>{producto.nombre}</h4>
        <p>Precio: ${producto.precio}</p>
        <p>Stock: {producto.stock}</p>
        <p>Categoría: {producto.categoria}</p>
        <button onClick={handleDelete}>Eliminar</button>
    </div>
    );
}
