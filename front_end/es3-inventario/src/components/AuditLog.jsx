import './AuditLog.css';

// Muestra en pantalla el historial de acciones que se va guardando
// con el hook useAuditLog.

export default function AuditLog({ historial }) {
  return (
    <section className="audit-log">
      <h3>Historial de Auditoría (LocalStorage)</h3>
      {/* Si aun no hay registro, mostramos un mensaje en vez de una lista vacia */}
      {historial.length === 0 ? (
        <p className="audit-log__empty">Aún no hay acciones registradas en esta sesión.</p>
      ) : (
        <ul>
            {/* Recorre el historial y muestra cada entrada.
                Se usa el index como key debido a que las entradas no tienen un id único propio. */}
          {historial.map((entrada, index) => (
            <li key={index}>
              [{entrada.timestamp}] {entrada.usuario} {entrada.accion}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
