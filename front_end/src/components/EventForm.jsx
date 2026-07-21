import { useState, useEffect } from 'react';

export default function EventForm({ salas, eventoActual, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    nombre_evento: '',
    fecha: '',
    hora: '',
    lugar: '',
    descripcion: '',
  });

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
  }, [eventoActual]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre_evento || !form.fecha || !form.hora || !form.lugar || !form.descripcion) {
      return;
    }
    onSubmit(form);
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{eventoActual ? 'Editar Evento' : 'Agendar Evento'}</h3>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="nombre_evento">Nombre del Evento</label>
            <input
              id="nombre_evento"
              name="nombre_evento"
              type="text"
              value={form.nombre_evento}
              onChange={handleChange}
              required
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
                required
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
                required
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
              required
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
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {eventoActual ? 'Guardar Cambios' : 'Agendar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
