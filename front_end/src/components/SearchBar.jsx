import { useState } from 'react';

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const normalized = term.trim();

        if (!normalized) {
            return;
        }

        if (onSearch) {
            onSearch(normalized);
        }
        setTerm('');
    };

    return (
        <form className="input-group mb-3" onSubmit={handleSubmit}>
            <input
                className="form-control"
                placeholder="Buscar evento"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
            />
            <button className="btn btn-outline-secondary" type="submit">
                Buscar
            </button>
        </form>
    );
}

export default SearchBar;
