import { useEffect, useState } from 'react';
import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import ErrorAlert from '../components/ErrorAlert';
import eventService from '../services/eventService';
import useStorage from '../hooks/useStorage';

function Dashboard() {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { searchHistory, addSearch, clearHistory } = useStorage();

    const loadEvents = async () => {
        try {
            const data = await eventService.getEvents();
            setEvents(data);
            setErrorMessage('');
        } catch {
            setErrorMessage('No se pudieron cargar los eventos.');
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleCreate = async (event) => {
        try {
            await eventService.createEvent(event);
            await loadEvents();
        } catch {
            setErrorMessage('No se pudo crear el evento.');
        }
    };

    const handleUpdate = async (event) => {
        try {
            await eventService.updateEvent(event.id, event);
            await loadEvents();
            setEditingEvent(null);
        } catch {
            setErrorMessage('No se pudo actualizar el evento.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await eventService.deleteEvent(id);
            await loadEvents();
            if (editingEvent?.id === id) {
                setEditingEvent(null);
            }
        } catch {
            setErrorMessage('No se pudo eliminar el evento.');
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
    };

    return (
        <section className="container py-4">
            <h1>Dashboard</h1>
            {errorMessage ? <ErrorAlert message={errorMessage} onClose={() => setErrorMessage('')} /> : null}
            <SearchBar />
            <SearchHistory />
            <EventForm
                initialEvent={editingEvent}
                onSubmit={editingEvent ? handleUpdate : handleCreate}
                onCancel={() => setEditingEvent(null)}
            />
            <EventTable events={events} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
    );
}

export default Dashboard;
