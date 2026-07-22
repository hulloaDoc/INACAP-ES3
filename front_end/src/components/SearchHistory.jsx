import { getSearchHistory, clearSearchHistory } from '../utils/localStorage';
import { useState, useEffect } from 'react';

export default function SearchHistory({ onRepeat, searchTrigger }) {
  const [history, setHistory] = useState(getSearchHistory());

  useEffect(() => {
    setHistory(getSearchHistory());
  }, [searchTrigger]);

  function handleClear() {
    clearSearchHistory();
    setHistory([]);
  }

  if (history.length === 0) return null;

  return (
    <div className="search-history">
      <div className="search-history-header">
        <h4>Ultimas busquedas</h4>
        <button className="btn btn-text" onClick={handleClear}>
          Limpiar
        </button>
      </div>
      <ul>
        {history.map((entry, idx) => (
          <li key={idx}>
            <button
              className="btn btn-text"
              onClick={() => onRepeat(entry.query)}
            >
              "{entry.query}"
            </button>
            <span className="search-history-date">({entry.date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
