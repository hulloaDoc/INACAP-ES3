import axiosClient from '../api/axiosClient';
import './QATestPanel.css';

// Panel para generar de forma controlada el error 500 exigido como
// evidencia en evidencia_pruebas/ (ver README de esa carpeta). El 404 ya
// no se fuerza aquí: se dispara de forma manual y real cuando el usuario
// busca un producto por ID/nombre/categoría inexistente (ver SearchBar
// en InventoryPage). El 500 sigue simulado porque no hay forma de
// provocar una caída real del servidor desde la UI.
// El error se reporta a través de onError (el mismo estado de error que
// usa el resto de la app), así el banner de alerta que se ve en pantalla
// es el mismo componente e instancia que ya se usa en el flujo real,
// igual que ocurre con el 401.
export default function QATestPanel({ onError }) {
  const ejecutar500 = async () => {
    onError(null);
    try {
      // Le mandamos un header especial al backend para que
      // simule un error interno del servidor
      await axiosClient.get('/productos', { headers: { 'x-simulate-error': '500' } });
    } catch (err) {
      // Reportamos el error al estado compartido de la página,
      // que lo muestra con el mismo <ErrorAlert /> que el resto de la app
      onError({ status: err.status, mensaje: err.mensaje });
    }
  };

  return (
    <section className="qa-panel">
      <h3>Panel de Pruebas QA (solo para evidencia de errores)</h3>
      <p>Usa este botón para forzar el error 500 y capturar consola + interfaz.</p>
      <div className="qa-panel__buttons">
        <button type="button" onClick={ejecutar500}>
          Forzar error 500
        </button>
      </div>
    </section>
  );
}
