const params = new URLSearchParams(window.location.search);
const pokemonNumber = params.get('number');

pokeApi.getPokemonByNumber(pokemonNumber)
    .then(pokemon => {
        document.getElementById('top-details').classList.add(pokemon.types[0]);
        document.getElementById('name').innerHTML = pokemon.name;
        document.getElementById('types').innerHTML = pokemon.types.map(type => `<li>${type}</li>`).join('');
        document.getElementById('number').innerHTML = '#' + String(pokemon.number).padStart(3, '0');
        document.getElementById('photo').src = pokemon.photo;
        document.getElementById('species').innerHTML = pokemon.species;
        document.getElementById('height').innerHTML = pokemon.height;
        document.getElementById('weight').innerHTML = pokemon.weight;
        document.getElementById('abilities').innerHTML = pokemon.abilities.join(', ');
    });