import { useState, useEffect } from 'react';

export default function EventForm({ salas, eventoActual, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState({
    nombre_evento: '',
    fecha: '',
    hora: '',
    lugar: '',
    descripcion: '',
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (eventoActual) {
      setForm({
        nombre_evento: eventoActual.nombre_evento || '',
        fecha: eventoActual.fecha || '',
        hora: eventoActual.hora || '',
        lugar: eventoActual.lugar || '',
        descripcion: eventoActual.descripcion || '',
      });
    } else {
      setForm({ nombre_evento: '', fecha: '', hora: '', lugar: '', descripcion: '' });
    }
    setFormError('');
  }, [eventoActual]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formError) setFormError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre_evento.trim() || !form.fecha || !form.hora || !form.lugar || !form.descripcion.trim()) {
      setFormError('Todos los campos son obligatorios.');
      return;
    }
    onSubmit(form);
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{eventoActual ? 'Editar Evento' : 'Agendar Evento'}</h3>
        {formError && (
          <div className="form-error" role="alert">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="nombre_evento">Nombre del Evento</label>
            <input
              id="nombre_evento"
              name="nombre_evento"
              type="text"
              value={form.nombre_evento}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fecha">Fecha</label>
              <input
                id="fecha"
                name="fecha"
                type="date"
                value={form.fecha}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hora">Hora</label>
              <input
                id="hora"
                name="hora"
                type="time"
                value={form.hora}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lugar">Lugar</label>
            <select
              id="lugar"
              name="lugar"
              value={form.lugar}
              onChange={handleChange}
            >
              <option value="">Seleccionar sala...</option>
              {salas.map((sala) => (
                <option key={sala} value={sala}>
                  {sala}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripcion</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Guardando...' : (eventoActual ? 'Guardar Cambios' : 'Agendar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
