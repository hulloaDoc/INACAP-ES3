import api from './api';

let localEvents = [
    {
        id: 1,
        title: 'Reunión inicial',
        description: 'Planificación del sprint',
        date: '2026-07-21',
        location: 'Sala 1',
    },
];

const eventService = {
    getEvents: async () => {
        try {
            const response = await api.get('/events');
            return response.data;
        } catch {
            return [...localEvents];
        }
    },
    createEvent: async (event) => {
        try {
            const response = await api.post('/events', event);
            return response.data;
        } catch {
            const newEvent = { id: Date.now(), ...event };
            localEvents = [newEvent, ...localEvents];
            return newEvent;
        }
    },
    updateEvent: async (id, event) => {
        try {
            const response = await api.put(`/events/${id}`, event);
            return response.data;
        } catch {
            localEvents = localEvents.map((item) => (item.id === id ? { ...item, ...event } : item));
            return { id, ...event };
        }
    },
    deleteEvent: async (id) => {
        try {
            await api.delete(`/events/${id}`);
            return true;
        } catch {
            localEvents = localEvents.filter((item) => item.id !== id);
            return true;
        }
    },
};

export default eventService;
