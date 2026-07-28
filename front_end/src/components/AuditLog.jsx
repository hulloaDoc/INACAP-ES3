function formatAuditDate(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return 'Fecha desconocida';
  }

  return new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(date);
}

function AuditLog({ entries, onClear }) {
  return (
    <section className="audit-card">
      <div className="audit-card__header">
        <div>
          <h2>📋 Bitácora de auditoría</h2>

          <p>
            Historial persistente almacenado en LocalStorage.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={onClear}
          disabled={entries.length === 0}
        >
          Limpiar historial
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="audit-empty">
          Todavía no se han registrado transacciones.
        </div>
      ) : (
        <ol className="audit-list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <time dateTime={entry.timestamp}>
                {formatAuditDate(entry.timestamp)}
              </time>

              <span>
                <strong>{entry.username}</strong>{' '}
                {entry.action} el producto ID{' '}
                <strong>{entry.productId}</strong>{' '}
                ({entry.productName}).
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default AuditLog;