import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Navbar({ onThemeChange, favoriteList }) {
  const handleFavoritesClick = () => {
    const favoritesElement = document.querySelector('.favorites');
    favoritesElement.classList.toggle('active');
  };

  return (
    <nav className="navbar">
      <h1>Pokedex</h1>
      <div className="nav-buttons">
        <button onClick={handleFavoritesClick}>
          {favoriteList.length ? <FaHeart /> : <FaRegHeart />}
        </button>
        <button onClick={onThemeChange}>Toggle Theme</button>
      </div>
    </nav>
  );
}

export default Navbar;
