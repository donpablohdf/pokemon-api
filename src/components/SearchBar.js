import React, { useState } from 'react';

function SearchBar({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for a Pokemon..."
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;