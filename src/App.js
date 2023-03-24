import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css/App.css';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import PokemonDetail from './components/PokemonDetail';
import { getPokemonList, getPokemon, searchPokemon } from './service/api';
import { saveFavorite, getFavorites, removeFavorite } from './service/utils';
import Navbar from './components/Navbar';
window.addEventListener('beforeunload', function () {
  localStorage.clear();
});

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPokemonList();
      setPokemonList(response.results);
    };
    fetchData();
    const favorites = getFavorites();
    setFavoritesList(favorites);
  }, []);

  const handleAddFavorite = (pokemon) => {
    saveFavorite(pokemon);
    setFavoritesList([...favoritesList, pokemon]);
  };

  const handleRemoveFavorite = (pokemon) => {
    removeFavorite(pokemon);
    const newFavoritesList = favoritesList.filter(
      (favorite) => favorite !== pokemon
    );
    setFavoritesList(newFavoritesList);
  };

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    const response = await searchPokemon(searchTerm);
    setPokemonList(response.results);
  };

  const handlePokemonClick = async (url) => {
    const response = await getPokemon(url);
    setCurrentPokemon(response);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isPokemonFavorite = (pokemon) => {
    return favoritesList.some((favorite) => favorite.id === pokemon.id);
  };

  return (
    <div className={`App ${theme}`}>
      <Navbar onThemeChange={handleThemeChange} favoriteList={favoritesList} />
      <h1>Pokemon App</h1>
      <SearchBar handleSearch={handleSearch} />
      <div className="container">
        <div className="pokemon-list">
          {pokemonList.map((pokemon, index) => (

            <PokemonCard
              key={index}
              //id={uuidv4()}
              pokemon={pokemon}
              handleAddFavorite={handleAddFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
              isFavorite={isPokemonFavorite(pokemon)}
              handlePokemonClick={handlePokemonClick}
              favoritesList={favoritesList}
            />
          ))}
        </div>
        <div className="second-column">
          {searchTerm !== '' && (
            <div>
              Resultados de búsqueda para: <strong>{searchTerm}</strong>
              {pokemonList.length === 0 ? (
                <p>No se encontraron resultados para la búsqueda.</p>
              ) : (
                pokemonList.map((pokemon, index) => (
                  <PokemonCard
                    key={index}
                    //id={uuidv4()}
                    pokemon={pokemon}
                    handleAddFavorite={handleAddFavorite}
                    handleRemoveFavorite={handleRemoveFavorite}
                    isFavorite={isPokemonFavorite(pokemon)}
                    handlePokemonClick={handlePokemonClick}
                    favoritesList={favoritesList}
                  />
                ))
              )}
            </div>
          )}
        </div>
        <Favorites
          favoritesList={favoritesList}
          handleRemoveFavorite={handleRemoveFavorite}
          handlePokemonClick={handlePokemonClick}
        />
        <div className='detail-column'>
          {currentPokemon && (
            <PokemonDetail
              pokemon={currentPokemon}
              handleAddFavorite={handleAddFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
              favoritesList={favoritesList}
              isFavorite={isPokemonFavorite(currentPokemon)}
            />

          )}
        </div>
      </div>
    </div>
  );
}

export default App;