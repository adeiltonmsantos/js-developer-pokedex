
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonByNumber = number => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`

    return fetch(url)
        .then((response) => response.json())
        .then(poke => {
            const pokemon = new Pokemon()
            pokemon.number = poke.id
            pokemon.name = poke.name 
            pokemon.types = poke.types.map(typeSlot => typeSlot.type.name)
            pokemon.species = poke.species.name
            pokemon.height = Number((poke.height * 0.1).toFixed(1)) + 'm'
            pokemon.weight = Number((poke.weight * 0.1).toFixed(1)) + 'kg'
            pokemon.abilities = poke.abilities.map(abilitySlot => abilitySlot.ability.name)
            pokemon.photo = poke.sprites.other.dream_world.front_default
            return pokemon
        })
        // .then(convertPokeApiDetailToPokemon)
        // .then(pokedetail => console.log(pokedetail))
}
