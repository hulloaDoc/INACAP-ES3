import api from './api';

const roomService = {
    getRooms: async () => {
        try {
            const response = await api.get('/rooms');
            return response.data;
        } catch {
            return [];
        }
    },
    getRoomById: async (id) => {
        try {
            const response = await api.get(`/rooms/${id}`);
            return response.data;
        } catch {
            return null;
        }
    },
};

export default roomService;
