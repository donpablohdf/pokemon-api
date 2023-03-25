import React from 'react';

function Navbar({ onThemeChange, handleSearch }) {
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.search.value;
    handleSearch(searchTerm);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <div className="container-fluid d-flex">
          <a className="navbar-brand" href="/">
            Pokemon App
          </a>
          <div className="d-flex justify-content-start align-items-center w-50">
            <button className="btn btn-dark" onClick={() => onThemeChange()}>
              Change Theme
            </button>
          </div>
        </div>
        <div className="container-fluid d-flex justify-content-end align-items-right">
          <form className="form-inline d-flex " onSubmit={handleSearchSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="search"
              />
            </div>
            <button
              className="btn btn-outline-light mx-2"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
