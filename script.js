//da 1 a 1025, da 10001 a 10277

function getRandomPokemonId() {
    const range = Math.random();
    if (range < 0.8) {
        return Math.floor(Math.random() * 1025) + 1;
    } else {
        return Math.floor(Math.random() * (10277 - 10001 + 1)) + 10001;
    }
}

function timeAlive () {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
}

function timeNotAlive() {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
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
        const nomePokemon = document.createElement('p');
        nomePokemon.textContent = data.forms[0].name;
        const imgPokeball = document.createElement('img');
        imgPokeball.src = "PokeballSenzaSfondo.png";
        //img.alt = `ID: ${pokemonId}`;
        // document.getElementById('pokemon-image').innerHTML = '';
        document.getElementById('pokemon-image').appendChild(img);
        document.getElementById('nome-pokemon').appendChild(nomePokemon);
        document.getElementById('pokeball').appendChild(imgPokeball);

    } catch (error) {
        console.error('Errore nella fetch:', error);
    }
}

// function startLoop() {
//     setInterval(() => {
//         const randomPokemonId = getRandomPokemonId();
//         fetchPokemonImage(randomPokemonId);
//     }, 5000);
// }

function startLoop() {
    async function loop() {
        const randomPokemonId = getRandomPokemonId();
        await fetchPokemonImage(randomPokemonId);
        setTimeout(() => {
            document.getElementById('pokemon-image').innerHTML = '';
            document.getElementById('nome-pokemon').innerHTML = '';
            document.getElementById('pokeball').innerHTML = '';
            setTimeout(loop, timeNotAlive());
        }, timeAlive());
    }

    loop();
}

startLoop();

// const randomPokemonId = getRandomPokemonId();
// fetchPokemonImage(randomPokemonId);
