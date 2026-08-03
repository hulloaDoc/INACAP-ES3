import axiosInstance from "../api/axiosInstance";

export const obtenerProductos = async () => {
  const response = await axiosInstance.get("/api/productos");
  return response.data;
};

export const crearProducto = async (producto) => {
  const response = await axiosInstance.post("/api/productos", producto);
  return response.data;
};

export const editarProducto = async (id, producto) => {
  const response = await axiosInstance.put(`/api/productos/${id}`, producto);
  return response.data;
};

export const eliminarProducto = async (id) => {
  const response = await axiosInstance.delete(`/api/productos/${id}`);
  return response.data;
};