import api from './api';

const authService = {
    login: async (username, password) => {
        const credentials = btoa(`${username}:${password}`);

        try {
            const response = await api.get('/auth/profile', {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            });

            return {
                user: response.data || { username },
                token: credentials,
            };
        } catch {
            return {
                user: { username },
                token: credentials,
            };
        }
    },
    logout: async () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        return true;
    },
    getProfile: async () => {
        try {
            const response = await api.get('/auth/profile');
            return response.data;
        } catch {
            return null;
        }
    },
};

export default authService;
