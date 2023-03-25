import React, { useState, useEffect } from 'react';
import '../css/PokemonDetail.css'

function PokemonDetail({
  pokemon,
  handleAddFavorite,
  handleRemoveFavorite,
  favoritesList,
  isFavorite,
  consFavorite
}) {
  console.log(pokemon)
  const {
    id,
    name,
    types,
    sprites,
    height,
    weight,
    abilities,
    stats,
  } = pokemon;

  // console.log(consFavorite)
  // console.log(favoritesList)
  const [favorite, setFavorite] = useState(isFavorite);
  useEffect(() => {
    setFavorite(favoritesList.some((favoriteD) => favoriteD.name=== consFavorite.name))

}, [consFavorite, favoritesList]);

const handleFavoriteClick = (event) => {
  if (favorite) {
      event.stopPropagation();
      handleRemoveFavorite(consFavorite);
      setFavorite(false)
  } else {
      event.stopPropagation();
      handleAddFavorite(consFavorite);
      setFavorite(true)
  }
};

  return (
    <div className="pokemon-detail border rounded p-4">
      
      <div className="pokemon-detail-header d-flex flex-column ">
        <h2>{name}</h2>
        <button className={`m-2 btn ${favorite ? 'btn-outline-info' : 'btn-outline-dark'}`} onClick={handleFavoriteClick}>
          {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
      <div className="pokemon-detail-body d-flex flex-column">
        <img src={sprites.front_default} alt={name} />
        <div className="pokemon-detail-info">
          <p>
            <strong>ID:</strong> {id}
          </p>
          <p>
            <strong>Type:</strong> {types.map((type) => type.type.name).join(', ')}
          </p>
          <p>
            <strong>Height:</strong> {height} m
          </p>
          <p>
            <strong>Weight:</strong> {weight} kg
          </p>
          <p>
            <strong>Abilities:</strong> {abilities.map((ability) => ability.ability.name).join(', ')}
          </p>
          <div className="pokemon-detail-stats">
            <h4>Stats</h4>
            <ul>
              {stats.map((stat) => (
                <li key={stat.stat.name}>
                  <strong>{stat.stat.name}:</strong> {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
