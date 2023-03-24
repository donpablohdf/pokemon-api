import React, { useState, useEffect } from 'react';


function PokemonCard({
    //id,
    pokemon,
    handleAddFavorite,
    handleRemoveFavorite,
    isFavorite,
    handlePokemonClick,
    favoritesList
}) {
    const [favorite, setFavorite] = useState(isFavorite);
    const idImg = pokemon.url.split('/')[6];
    useEffect(() => {
        setFavorite(favoritesList.some((favoriteD) => favoriteD=== pokemon))

    }, [favorite, favoritesList, pokemon]);

    const handleClick = () => {
        handlePokemonClick(pokemon.url);
    };

    const handleFavoriteClick = (event) => {
        if (favorite) {
            event.stopPropagation();
            handleRemoveFavorite(pokemon);
            setFavorite(false)
        } else {
            event.stopPropagation();
            handleAddFavorite(pokemon);
            setFavorite(true)
        }
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
                <button
                    className={`favorite-button ${favorite ? 'favorited' : ''}`}
                    onClick={handleFavoriteClick}>
                    {favorite ? 'Remove from favorites' : 'Add to favorites'}
                </button>
            </div>
        </div>
    );

}

export default PokemonCard;
