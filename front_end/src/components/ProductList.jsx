import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ErrorAlert from "./ErrorAlert";
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";

export default function ProductList() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    const fetchProductos = () => {
    axiosInstance.get("/productos")
        .then(res => setProductos(res.data))
        .catch(err => {
            setError(err.response?.status || "Error desconocido");
            console.error("Error API:", err);
        });
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleDelete = (id) => {
        setProductos(productos.filter(p => p.id !== id));
    };

    return (
        <div>
            {error && <ErrorAlert codigo={error} />}
            <ProductForm onSuccess={fetchProductos} />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {productos.map(p => (
                <ProductCard key={p.id} producto={p} onDelete={handleDelete} />
        ))}
        </div>
    </div>
    );
}
