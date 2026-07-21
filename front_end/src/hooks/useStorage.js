import { useEffect, useState } from 'react';
import { storage } from '../utils/storage';

function useStorage() {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        setSearchHistory(storage.getSearchHistory());
    }, []);

    const addSearch = (term) => {
        const normalized = term.trim();
        if (!normalized) {
            return searchHistory;
        }

        const nextHistory = [normalized, ...searchHistory.filter((item) => item !== normalized)].slice(0, 10);
        setSearchHistory(nextHistory);
        storage.saveSearchHistory(nextHistory);
        return nextHistory;
    };

    const clearHistory = () => {
        setSearchHistory([]);
        storage.clearSearchHistory();
        return [];
    };

    return {
        searchHistory,
        addSearch,
        clearHistory,
    };
}

export default useStorage;
