import { useCallback, useMemo, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { AuthContext } from './authContext';

const SESSION_KEY = 'inv_session';

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession());

  const login = useCallback(async (username, password) => {
    const { data } = await axiosClient.post('/login', { username, password });
    const nuevaSesion = { token: data.token, user: data.user };
    localStorage.setItem(SESSION_KEY, JSON.stringify(nuevaSesion));
    setSession(nuevaSesion);
    return nuevaSesion;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      login,
      logout,
    }),
    [session, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
