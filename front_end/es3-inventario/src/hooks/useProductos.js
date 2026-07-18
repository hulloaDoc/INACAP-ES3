import { useCallback, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

// Hooks personalizado para manejar todo lo relacionado a productos:
// traerlos desde la API, crear, actualizar, eliminar, etc.
// permitiendo no repartir esta logica a cada componente que necesite
// mostrar o modificar productos.
export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true); // permite mostrar un "cargando..." en la interfaz
  const [error, setError] = useState(null); // por si la peticion falla
  const [version, setVersion] = useState(0); // truco para forzar que se vuelva a cargar la data

  useEffect(() => {
    let cancelado = false;
    // Patrón estándar de fetch-en-efecto (react.dev/learn/synchronizing-with-effects):
    // el reset síncrono de loading/error es intencional, no un efecto en cascada.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);
    // Pedimos productos y categorias al mismo tiempo con Promise.all,
    // asi no se espera un peticion y depsues la otra
    Promise.all([axiosClient.get('/productos'), axiosClient.get('/categorias')])
    .then(([productosRes, categoriasRes]) => {
        // Si ya se cancelo (el componente se desmonto), no hace nada
        if (cancelado) return;
        setProductos(productosRes.data);
        setCategorias(categoriasRes.data);
    })
    .catch((err) => {
        if (!cancelado) setError(err);
    })
    .finally(() => {
        // finally se ejecuta siempre, haya salido bien o mal la petición
        if (!cancelado) setLoading(false);
    });

    // permite la limpieza que React ejecuta cuando el
    // componente se desmontra o antes de volver a correr el efecto
    return () => {
        cancelado = true;
    };

    // El efecto se vuelve a ejecutar cada vez que se cambia de "version", 
    // es lo mismo que se usa para recarga() forzando un refresh 
  }, [version]);
  // Función para forzar que se vuelva a pedir la data a la API,
  // por ejemplo después de crear un producto nuevo
  const recargar = useCallback (() => setVersion((v) => v + 1), []);
  
  //Crea un producto nuevo llmando a la API y lo agrega al arreglo
  // local de productos, asi no hay que esperar a recargar todo otra vez

  const crear = useCallback(async (producto) => {
    const {data} = await axiosClient.post('/productos', producto);
    setProductos((prev) =>[...prev, data]);
    return data;
  }, []);
  
  // Actualiza un producto existente, se busca el producto por id 
  // dentro del arreglo y se reemplaza con la data que devuelve la API
  const actualizar = useCallback(async (id, producto) => {
    const {data} = await axiosClient.post(`/productos/${id}`, producto);
    setProductos((prev) => prev.filter((p) => (p.id === id ? data : p)));
    return data;
  }, []);

  // Elimina un producto: primero se le pide a la API (DELETE)
  // y si sale bien, se saca tambien del arreglo local con filter
  const eliminar = useCallback(async (id) => {
    await axiosClient.delete(`/productos/${id}`);
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }, []);
  // Retorna todos lo que un componente podria necesitar:
  // datos, estados de carga/error y las funciones para
  // modificar los productos
  return {productos, categorias, loading, error, setError, recargar, crear, actualizar, eliminar};


}


