import React, { useState, useEffect } from 'react';

function PokemonCard({ pokemon, handleAddFavorite, handleRemoveFavorite, handlePokemonClick }) {
    const idImg = pokemon.url.split('/')[6];
    const [isFavorite, setIsFavorite] = useState(false);

    const handleClick = () => {
        handlePokemonClick(pokemon.url);
    };

    const handleIsPokemonFavorite = () => {
        return handleCheckIsPokemonFavorite(pokemon);
    };
    useEffect(() => {
        setIsFavorite(handleIsPokemonFavorite());
    }, []);

    const handleCheckIsPokemonFavorite = (pokemon) => {
        return pokemon && pokemon.id && handleGetFavoritesList().some((p) => p.id === pokemon.id);
    };

    const handleAddFavoriteClick = (event) => {
        event.stopPropagation();
        handleAddFavorite(pokemon);
        setIsFavorite(true);
    };

    const handleRemoveFavoriteClick = (event) => {
        event.stopPropagation();
        handleRemoveFavorite(pokemon);
        setIsFavorite(false);
    };

    const handleFavoriteClick = (event) => {
        if (isFavorite) {
            handleRemoveFavoriteClick(event);
        } else {
            handleAddFavoriteClick(event);
        }
    };

    const handleGetFavoritesList = () => {
        return JSON.parse(localStorage.getItem('favoritesList')) || [];
    };

    return (
        <div className="pokemon-card" onClick={handleClick}>
            <div className="pokemon-image">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idImg}.png`}
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
