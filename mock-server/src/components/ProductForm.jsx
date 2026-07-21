import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ProductForm({ onSuccess }) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState("Abarrotes");

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axiosInstance.post("/productos", {
        nombre,
        precio: Number(precio),
        stock: Number(stock),
        categoria,
        });

      // Bitácora en LocalStorage
        const log = JSON.parse(localStorage.getItem("bitacora") || "[]");
        log.push(`[${new Date().toLocaleTimeString()}] admin agregó producto ID ${res.data.id}`);
        localStorage.setItem("bitacora", JSON.stringify(log));

      onSuccess(); // refresca la lista
        setNombre(""); setPrecio(""); setStock(""); setCategoria("Abarrotes");
    } catch (err) {
        console.error("Error al agregar producto:", err);
    }
    };

    return (
    <form onSubmit={handleSubmit}>
        <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
        <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="Precio" required />
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock" required />
        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option>Abarrotes</option>
        <option>Lácteos</option>
        <option>Limpieza</option>
        <option>Electrónica</option>
        <option>Hogar</option>
        </select>
        <button type="submit">Agregar Producto</button>
    </form>
    );
}
