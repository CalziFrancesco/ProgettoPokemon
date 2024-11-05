//da 1 a 1025, da 10001 a 10277

function getRandomPokemonId() {
    const range = Math.random();
    if (range < 0.5) {
        return Math.floor(Math.random() * 1025) + 1;
    } else {
        return Math.floor(Math.random() * (10277 - 10001 + 1)) + 10001;
    }
}

async function fetchPokemonImage(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Qualcosa non va');
        }
        const data = await response.json();
        const imageUrl = data.sprites.front_default;
        const img = document.createElement('img');
        img.src = imageUrl;
        //img.alt = `ID: ${pokemonId}`;
        document.getElementById('pokemon-image').innerHTML = '';
        document.getElementById('pokemon-image').appendChild(img);
    } catch (error) {
        console.error('Errore nella fetch:', error);
    }
}

const randomPokemonId = getRandomPokemonId();
fetchPokemonImage(randomPokemonId);
