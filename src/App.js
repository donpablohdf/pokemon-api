import React, { useState, useEffect } from 'react';
import './css/App.css';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import PokemonDetail from './components/PokemonDetail';
import { getPokemonList, getPokemon } from './service/api';
import { saveFavorite, getFavorites, removeFavorite } from './service/utils';
import Navbar from './components/Navbar';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPokemonList();
      setPokemonList(response.results);
    };

    fetchData();
  }, [favoritesList]);

  useEffect(() => {
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
      (favorite) => favorite.id !== pokemon.id
    );
    setFavoritesList(newFavoritesList);
  };

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    const response = await getPokemonList(searchTerm);
    setPokemonList(response.results);
  };

  const handlePokemonClick = async (url) => {
    const response = await getPokemon(url);
    setCurrentPokemon(response);
  };

  return (
    <div className="App">
      <h1>Pokemon App</h1>
      <Navbar favoriteList={favoritesList} />
      <SearchBar handleSearch={handleSearch} />
      <div className="container">
        <div className="pokemon-list">
          {pokemonList.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              handleAddFavorite={handleAddFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
              favoritesList={favoritesList}
              handlePokemonClick={handlePokemonClick}
            />
          ))}
        </div>
        <Favorites
          favoritesList={favoritesList}
          handleRemoveFavorite={handleRemoveFavorite}
          handlePokemonClick={handlePokemonClick}
        />
        {currentPokemon && (
          <PokemonDetail
            pokemon={currentPokemon}
            handleAddFavorite={handleAddFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
            favoritesList={favoritesList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
