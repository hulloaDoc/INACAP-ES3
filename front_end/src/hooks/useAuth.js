import { useEffect, useState } from 'react';
import authService from '../services/authService';

function useAuth() {
    // Estado principal de la sesión del usuario para controlar el acceso a la SPA.
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const persistSession = (sessionUser, token) => {
        localStorage.setItem('authUser', JSON.stringify(sessionUser));
        localStorage.setItem('authToken', token);
    };

    const restoreSession = async () => {
        try {
            const storedUser = localStorage.getItem('authUser');
            const storedToken = localStorage.getItem('authToken');

            if (!storedUser || !storedToken) {
                setUser(null);
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            let parsedUser = null;
            try {
                parsedUser = JSON.parse(storedUser);
            } catch {
                parsedUser = null;
            }

            if (!parsedUser) {
                setUser(null);
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            const profile = await authService.getProfile();
            setUser(profile || parsedUser);
            setIsAuthenticated(true);
        } catch {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        restoreSession();
    }, []);

    const login = async (username, password) => {
        try {
            const result = await authService.login(username, password);
            persistSession(result.user, result.token);
            setUser(result.user);
            setIsAuthenticated(true);
            return true;
        } catch {
            setUser(null);
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
}

export default useAuth;
