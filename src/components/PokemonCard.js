import React, { useState, useEffect } from 'react';
import '../css/PokemonCard.css';

function PokemonCard({ pokemon, handleAddFavorite, handleRemoveFavorite, favoritesList, handlePokemonClick }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const idImg = pokemon.url.split('/')[6]

    useEffect(() => {
        const isPokemonFavorite = favoritesList.some(
            (favorite) => favorite.id === pokemon.id
        );
        setIsFavorite(isPokemonFavorite);
    }, [favoritesList, pokemon.id]);

    const handleClick = () => {
        handlePokemonClick(pokemon.url);
    };

    const handleFavoriteClick = (event) => {
        event.stopPropagation();

        if (isFavorite) {
            handleRemoveFavorite(pokemon);
        } else {
            handleAddFavorite(pokemon);
        }

        setIsFavorite(!isFavorite);
    };

    return (
        <div className="pokemon-card" onClick={handleClick}>
            <div className="pokemon-image">
                <img
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + idImg + '.png'}
                    alt={pokemon.name}
                />
            </div>
            <div className="pokemon-info">
                <h2>{pokemon.name}</h2>
                <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={handleFavoriteClick}>
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </button>
            </div>
        </div>
    );
}

export default PokemonCard;
