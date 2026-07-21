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
        <form className="row g-2 mb-3" onSubmit={handleSubmit}>
            <div className="col-12 col-md-9">
                <input
                    className="form-control"
                    placeholder="Buscar evento"
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                />
            </div>
            <div className="col-12 col-md-3">
                <button className="btn btn-primary w-100" type="submit">
                    Buscar
                </button>
            </div>
        </form>
    );
}

export default SearchBar;
