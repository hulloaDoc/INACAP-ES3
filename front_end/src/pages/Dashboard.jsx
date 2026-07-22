import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { addSearchToHistory } from '../utils/localStorage';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import RoomFilter from '../components/RoomFilter';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';
import SearchHistory from '../components/SearchHistory';

export default function Dashboard() {
  const { logout } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [salaFiltro, setSalaFiltro] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleError = useCallback((err) => {
    if (!err.response) {
      setError('Error de conexion con el servidor. Verifica que este activo.');
      return;
    }
    const status = err.response.status;
    const mensaje = err.response.data?.mensaje || 'Error desconocido';
    if (status === 401) {
      setError('Sesion expirada o credenciales invalidas. Por favor, inicia sesion nuevamente.');
      setTimeout(() => logout(), 3000);
    } else if (status === 404) {
      setError(`Recurso no encontrado: ${mensaje}`);
    } else if (status === 500) {
      setError('Error interno del servidor. Intenta mas tarde.');
    } else if (status === 400) {
      setError(`Solicitud invalida: ${mensaje}`);
    } else {
      setError(mensaje);
    }
  }, [logout]);

  const fetchEventos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get('/api/eventos');
      setEventos(res.data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const fetchSalas = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/api/salas');
      setSalas(res.data);
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  useEffect(() => {
    fetchEventos();
    fetchSalas();
  }, [fetchEventos, fetchSalas]);

  function handleSearch(query) {
    setBusqueda(query);
    if (query.trim()) {
      addSearchToHistory(query);
      setSearchTrigger((prev) => prev + 1);
    }
  }

  function handleRepeatSearch(query) {
    setBusqueda(query);
  }

  async function handleCreate(formData) {
    setError(null);
    setSubmitting(true);
    try {
      await axiosInstance.post('/api/eventos', formData);
      setShowForm(false);
      fetchEventos();
    } catch (err) {
      handleError(err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(formData) {
    setError(null);
    setSubmitting(true);
    try {
      await axiosInstance.put(`/api/eventos/${eventoEditando.id}`, formData);
      setEventoEditando(null);
      setShowForm(false);
      fetchEventos();
    } catch (err) {
      handleError(err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(evento) {
    if (!window.confirm(`Cancelar el evento "${evento.nombre_evento}"?`)) return;
    setError(null);
    try {
      await axiosInstance.delete(`/api/eventos/${evento.id}`);
      fetchEventos();
    } catch (err) {
      handleError(err);
    }
  }

  function handleEdit(evento) {
    setEventoEditando(evento);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setEventoEditando(null);
  }

  function handleFormSubmit(formData) {
    if (eventoEditando) {
      handleUpdate(formData);
    } else {
      handleCreate(formData);
    }
  }

  const eventosFiltrados = eventos.filter((evt) => {
    const coincideSala = salaFiltro === 'todas' || evt.lugar === salaFiltro;
    const coincideBusqueda =
      !busqueda.trim() ||
      evt.nombre_evento.toLowerCase().includes(busqueda.toLowerCase()) ||
      evt.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideSala && coincideBusqueda;
  });

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

        <div className="toolbar">
          <SearchBar onSearch={handleSearch} />
          <RoomFilter
            salas={salas}
            salaSeleccionada={salaFiltro}
            onChange={setSalaFiltro}
          />
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Agendar Evento
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="event-grid">
            {eventosFiltrados.length === 0 ? (
              <p className="empty-state">No se encontraron eventos</p>
            ) : (
              eventosFiltrados.map((evento) => (
                <EventCard
                  key={evento.id}
                  evento={evento}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}

        <SearchHistory onRepeat={handleRepeatSearch} searchTrigger={searchTrigger} />

        {showForm && (
          <EventForm
            salas={salas}
            eventoActual={eventoEditando}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseForm}
            submitting={submitting}
          />
        )}
      </main>
    </div>
  );
}
