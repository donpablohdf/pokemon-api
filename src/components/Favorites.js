import React from 'react';
import PokemonCard from './PokemonCard';

function Favorites({ favoritesList, handleRemoveFavorite, handlePokemonClick }) {
  
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favoritesList.length > 0 ? (
        favoritesList.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            handleRemoveFavorite={handleRemoveFavorite}
            favoritesList={favoritesList}
            handlePokemonClick={handlePokemonClick}
            isFavorite={true}
          />
        ))
      ) : (
        <p>No favorites yet</p>
      )}
    </div>
  );
}

export default Favorites;
