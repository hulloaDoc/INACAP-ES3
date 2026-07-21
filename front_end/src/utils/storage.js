const SEARCH_HISTORY_KEY = 'searchHistory';

// Helper local para gestionar el historial de búsquedas con protección ante datos inválidos.
export const storage = {
    saveSearchHistory: (history) => {
        try {
            localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
            return true;
        } catch {
            return false;
        }
    },
    getSearchHistory: () => {
        try {
            const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
            if (!stored) {
                return [];
            }

            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    },
    clearSearchHistory: () => {
        try {
            localStorage.removeItem(SEARCH_HISTORY_KEY);
            return true;
        } catch {
            return false;
        }
    },
};
