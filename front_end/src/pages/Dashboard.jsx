import { useEffect, useState } from 'react';
import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import ErrorAlert from '../components/ErrorAlert';
import Loading from '../components/Loading';
import eventService from '../services/eventService';
import useStorage from '../hooks/useStorage';

function Dashboard() {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { searchHistory, addSearch, clearHistory } = useStorage();

    const loadEvents = async () => {
        setIsLoading(true);
        try {
            const data = await eventService.getEvents();
            setEvents(data);
            setErrorMessage('');
        } catch {
            setErrorMessage('No se pudieron cargar los eventos.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleCreate = async (event) => {
        setIsLoading(true);
        try {
            await eventService.createEvent(event);
            await loadEvents();
        } catch {
            setErrorMessage('No se pudo crear el evento.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (event) => {
        setIsLoading(true);
        try {
            await eventService.updateEvent(event.id, event);
            await loadEvents();
            setEditingEvent(null);
        } catch {
            setErrorMessage('No se pudo actualizar el evento.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await eventService.deleteEvent(id);
            await loadEvents();
            if (editingEvent?.id === id) {
                setEditingEvent(null);
            }
        } catch {
            setErrorMessage('No se pudo eliminar el evento.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
    };

    return (
        <section className="container py-4">
            <div className="row g-4">
                <div className="col-12">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                        <h1 className="h3 mb-0">Dashboard</h1>
                        <span className="text-muted">Gestión de eventos</span>
                    </div>
                </div>
                <div className="col-12">
                    {errorMessage ? <ErrorAlert message={errorMessage} onClose={() => setErrorMessage('')} /> : null}
                    {isLoading ? <Loading message="Procesando operación..." /> : null}
                </div>
                <div className="col-12 col-lg-4">
                    <SearchBar />
                    <SearchHistory history={searchHistory} onClear={clearHistory} />
                </div>
                <div className="col-12 col-lg-8">
                    <EventForm
                        initialEvent={editingEvent}
                        onSubmit={editingEvent ? handleUpdate : handleCreate}
                        onCancel={() => setEditingEvent(null)}
                    />
                </div>
                <div className="col-12">
                    <EventTable events={events} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
