import { useEffect, useState } from 'react';
import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import eventService from '../services/eventService';
import useStorage from '../hooks/useStorage';

function Dashboard() {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const { searchHistory, addSearch, clearHistory } = useStorage();

    const loadEvents = async () => {
        const data = await eventService.getEvents();
        setEvents(data);
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleCreate = async (event) => {
        await eventService.createEvent(event);
        await loadEvents();
    };

    const handleUpdate = async (event) => {
        await eventService.updateEvent(event.id, event);
        await loadEvents();
        setEditingEvent(null);
    };

    const handleDelete = async (id) => {
        await eventService.deleteEvent(id);
        await loadEvents();
        if (editingEvent?.id === id) {
            setEditingEvent(null);
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
    };

    return (
        <section className="container py-4">
            <h1>Dashboard</h1>
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
