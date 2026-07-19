import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import ErrorAlert from './ErrorAlert';
import './QATestPanel.css';

// Panel exclusivo para generar de forma controlada los errores 400/404/500
// exigidos como evidencia en evidencia_pruebas/ (ver README de esa carpeta).
export default function QATestPanel() {
  const [resultado, setResultado] = useState(null);

  // Ejecuta una petición que sabemos que va a fallar a propósito,
  // según qué botón se apretó (400, 404 o 500)
  const ejecutar = async (accion) => {
    setResultado(null);
    try {
      if (accion === '404') {

        // Pedimos un producto con un id que no existe -> error 404
        await axiosClient.get('/productos/999999');
      } else if (accion === '500') {

        // Le mandamos un header especial al backend para que
        // simule un error interno del servidor
        await axiosClient.get('/productos', { headers: { 'x-simulate-error': '500' } });
      } else if (accion === '400') {

        // Mandamos un producto vacío a propósito, para que
        // la validación del backend lo rechace -> error 400
        await axiosClient.post('/productos', {});
      }

      // Si llegamos hasta acá sin que salte el catch, es porque
      // la petición no falló (cosa que no debería pasar en esta prueba)
      setResultado({ status: 'OK', mensaje: 'La solicitud se completó sin errores (inesperado para esta prueba).' });
    } catch (err) {
      
      // Guardamos el error para mostrarlo con el componente ErrorAlert
      setResultado({ status: err.status, mensaje: err.mensaje });
    }
  };

  return (
    <section className="qa-panel">
      <h3>Panel de Pruebas QA (solo para evidencia de errores)</h3>
      <p>Usa estos botones para forzar los errores controlados y capturar consola + interfaz.</p>
      <div className="qa-panel__buttons">
        <button type="button" onClick={() => ejecutar('400')}>
          Forzar error 400
        </button>
        <button type="button" onClick={() => ejecutar('404')}>
          Forzar error 404
        </button>
        <button type="button" onClick={() => ejecutar('500')}>
          Forzar error 500
        </button>
      </div>

      {/* Mostramos el resultado (éxito o error) usando el mismo
          componente de alerta que se usa en el resto de la app */}
      {resultado && (
        <ErrorAlert status={resultado.status} mensaje={resultado.mensaje} onClose={() => setResultado(null)} />
      )}
    </section>
  );
}