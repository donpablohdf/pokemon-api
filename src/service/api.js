import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/';

export const getPokemonList = async () => {
    const response = await axios.get(`${API_URL}pokemon/?limit=20&offset=0`);
    return response.data;
};
export const searchPokemon = async (searchTerm = '') => {
    const response = await axios.get(`${API_URL}pokemon/?limit=100&offset=100`);
    const data = response.data
    console.log(data)
    return response.data;
};

export const getPokemon = async (url) => {
    const response = await axios.get(url);
    
    return response.data;
};