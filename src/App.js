import React, { useState, useEffect } from 'react';
import './css/App.css';
import PokemonCard from './components/PokemonCard';
import Favorites from './components/Favorites';
import PokemonDetail from './components/PokemonDetail';
import { getPokemonList, getPokemon, searchPokemon, pagPokemonList } from './service/api';
import { saveFavorite, getFavorites, removeFavorite } from './service/utils';
import Navbar from './components/Navbar';
window.addEventListener('beforeunload', function () {
  localStorage.clear();
});

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPokemonList, setNextPokemonList] = useState('');
  const [prevPokemonList, setPrevPokemonList] = useState('');
  const [Npag, setNpag] = useState(1);
  const [searchPokemonList, setSearchPokemonList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [consFavorite, setConsFavorite] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPokemonList();
      response.next ? setNextPokemonList(response.next) : setNextPokemonList('')
      response.previous ? setPrevPokemonList(response.previous) : setPrevPokemonList('')

      setPokemonList(response.results);
    };
    fetchData();

  }, []);
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
      (favorite) => favorite.name !== pokemon.name
    );
    setFavoritesList(newFavoritesList);
  };

  const handleSearch = async (searchTerm) => {
    setSearchPokemonList('');
    if (searchTerm !== '') {
      setSearchTerm(searchTerm);
      const response = await searchPokemon(searchTerm);
      setSearchPokemonList(response);
    }
  };

  const handlePokemonClick = async (url, name) => {
    const response = await getPokemon(url);
    setConsFavorite({ name: name, url: url })
    setCurrentPokemon(response);

  };
  const handlePagPokemonList = async (url, pag) => {
    const response = await pagPokemonList(url);
    pag === 'next' ? setNpag(Npag + 1) : setNpag(Npag - 1)
    response.previous ? setPrevPokemonList(response.previous) : setPrevPokemonList('')
    response.next ? setNextPokemonList(response.next) : setNextPokemonList('')
    setPokemonList(response.results);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isPokemonFavorite = (pokemon) => {
    return favoritesList.some((favorite) => favorite.name === pokemon.name);

  };
  return (
    <div className={`App ${theme}`}>
      <Navbar onThemeChange={handleThemeChange} handleSearch={handleSearch} />

      <div className="container">
        <div className="pokemon-list">

          <div className='p-2 border border-success rounded mb-4 d-flex justify-content-between align-items-center'>

            {prevPokemonList ? <button className='btn-pag btn btn-outline-info' onClick={() => { handlePagPokemonList(prevPokemonList, '') }}>{'<<'}</button> : <button className='btn-pag btn "btn btn-outline-light' disabled>{'<<'}</button>}
            <h6>{Npag}</h6>
            {nextPokemonList ? <button className='btn-pag btn btn-outline-info' onClick={() => { handlePagPokemonList(nextPokemonList, 'next') }}>{'>>'}</button> : <button className='btn-pag btn "btn btn-outline-light' disabled>{'>>'}</button>}
          </div>
          {pokemonList.map((pokemon, index) => (

            <PokemonCard
              key={index}
              pokemon={pokemon}
              handleAddFavorite={handleAddFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
              isFavorite={isPokemonFavorite(pokemon)}
              handlePokemonClick={handlePokemonClick}
              favoritesList={favoritesList}
            />
          ))}
        </div>
        <div className="search-column">
          <>
            <div className='p-2 border border-success rounded mb-4 d-flex flex-column'>
              <h6>Search </h6>
              {searchPokemonList.length > 0 ? (
                <p>{searchPokemonList.length} matches for  <strong>{searchTerm}</strong></p>
              ) : ('')}
            </div>
            {searchTerm !== '' && (
              <div>
                {searchPokemonList.length === 0 ? (
                  <p>No se encontraron resultados para la búsqueda.</p>
                ) : (
                  searchPokemonList.map((pokemon, index) => (
                    <PokemonCard
                      key={index}
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
          </>
        </div>
        <Favorites
          favoritesList={favoritesList}
          handleRemoveFavorite={handleRemoveFavorite}
          handlePokemonClick={handlePokemonClick}
        />
        <div className='detail-column'>
          <div className='p-2 border border-success rounded mb-4 d-flex justify-content-between align-items-center'>
            <h6>Pokemon Detail </h6>
            {currentPokemon &&(<button className='btn-pag btn btn-outline-info' onClick={() => { setCurrentPokemon(null) }}>Reset</button>)}
          </div>
          {currentPokemon && (
            <PokemonDetail
              pokemon={currentPokemon}
              handleAddFavorite={handleAddFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
              isFavorite={isPokemonFavorite(consFavorite)}
              favoritesList={favoritesList}
              consFavorite={consFavorite}
            />

          )}
        </div>
      </div>
    </div>
  );
}

export default App;