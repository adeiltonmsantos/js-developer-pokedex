const params = new URLSearchParams(window.location.search);
const pokemonNumber = params.get('number');

pokeApi.getPokemonByNumber(pokemonNumber)