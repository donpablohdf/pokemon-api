import React, { useState } from 'react';

function Navbar({ onThemeChange, handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };
  return (
    <nav className="navbar">

      <div className="nav-buttons">

        <button onClick={onThemeChange}>Toggle Theme</button>
      </div>
      <div><form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for a Pokemon..."
        />
        <button type="submit">Search</button>
      </form></div>
    </nav>
  );
}

export default Navbar;
