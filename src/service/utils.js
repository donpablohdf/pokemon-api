export const saveFavorite = (pokemon) => {
    let favorites = getFavorites();
    favorites.push(pokemon);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getFavorites = () => {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
        return JSON.parse(favorites);
    } else {
        return [];
    }
};

export const removeFavorite = (pokemon) => {
    let favorites = getFavorites();
    favorites = favorites.filter((favorite) => favorite.id !== pokemon.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};