import axios from 'axios';

const getState = ({ getStore, getPrivate, getActions, setStore }) => {
	return {
		store: {
			pokemonList: [],
			favoritesList: [],
			currentPokemon: [],
			API_URL: 'https://pokeapi.co/api/v2/',

		},

		actions: {

			// Use getActions to call a function within a fuction
			getPokemonList: async () => {
				const store = getStore()
				// para meter los datos de la API
				try {
					const response = await axios.get(`${store.API_URL}pokemon/?limit=20&offset=0`);
					return response.data;
				} catch (error) {
					return false
				}

			},
			pagPokemonList: async (url) => {
				const response = await axios.get(url);
				return response.data;
			},
			searchPokemon: async (searchTerm = '') => {
				const store = getStore()
				if (searchTerm !== '') {
					const response = await axios.get(`${store.API_URL}pokemon/?limit=3200&offset=0`);
					const pokemons = await response.data.results
					const search = searchTerm.replace(/[A-Z\s]/g, '');
					const filteredPokemons = pokemons.filter((pokemon) =>
						pokemon.name.toLowerCase().includes(search)
					);
					return filteredPokemons;
				}
			},
			getPokemon : async (url) => {
				const response = await axios.get(url);
			
				return response.data;
			},
			saveFavorite : (pokemon) => {
				const store = getStore()
				const action = getActions()
				let favorites = action.getFavorites();
				favorites.push(pokemon);
				setStore({ favoritesList: favorites })
				//localStorage.setItem('favoritesList', JSON.stringify(favorites));
			},
			getFavorites : () => {
				const store = getStore()
				let favorites = store.favoritesList;
				if (favorites) {
					return favorites;
				} else {
					return [];
				}
			},
			removeFavorite : (pokemon) => {
				const action = getActions()
				let favorites = action.getFavorites();
				favorites = favorites.filter((favorite) => favorite.name !== pokemon.name);
				setStore({ favoritesList: favorites })
			},
			
		}
	};
};

export default getState;
