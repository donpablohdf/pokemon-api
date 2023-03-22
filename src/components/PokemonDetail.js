import React from 'react';
//import '../css/PokemonDetail.css';
//import { capitalize } from '../service/utils';

function PokemonDetail({
  pokemon,
  handleAddFavorite,
  handleRemoveFavorite,
  favoritesList,
}) {
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

  const isFavorite = favoritesList.some((favorite) => favorite.id === id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      handleRemoveFavorite(pokemon);
    } else {
      handleAddFavorite(pokemon);
    }
  };

  return (
    <div className="pokemon-detail">
      <div className="pokemon-detail-header">
        <h2>{name}</h2>
        <button onClick={handleFavoriteClick}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
      <div className="pokemon-detail-body">
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
