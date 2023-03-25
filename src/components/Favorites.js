import React from 'react';
import PokemonCard from './PokemonCard';
import '../css/Favorites.css'

function Favorites({ favoritesList, handleRemoveFavorite, handlePokemonClick }) {

  return (
    <div className="favorites">
      <div className='p-2 border border-success rounded mb-4 d-flex flex-column'>
        <h6>Favorites </h6>
        {favoritesList.length > 0 ? (
          <p>{favoritesList.length} favorites</p>
        ) : ('')}
      </div>
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
        <p>No hay Favoritos</p>
      )}
    </div>
  );
}

export default Favorites;
