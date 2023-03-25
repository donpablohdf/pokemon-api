import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/';

export const getPokemonList = async () => {
    const response = await axios.get(`${API_URL}pokemon/?limit=20&offset=0`);
    return response.data;
};
export const searchPokemon = async (searchTerm = '') => {
    const response = await axios.get(`${API_URL}pokemon/?limit=3200&offset=0`);
    const pokemons = await response.data.results
    const search = searchTerm.replace(/[A-Z\s]/g, '');
    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search)
    );
    return filteredPokemons;
};

export const getPokemon = async (url) => {
    const response = await axios.get(url);

    return response.data;
};