//da 1 a 1025, da 10001 a 10277

function getRandomPokemonId() {
    return Math.floor(Math.random() * 1301) + 1;
}

function timeAlive () {
    return Math.floor(Math.random() * (8000 - 7000 + 1)) + 7000;
}

function timeNotAlive() {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
}

async function isGifAvailable(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function fetchPokemonImage(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemonId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Qualcosa non va');
        }
        const pokemonResult = await response.json();
        const pokemonInfoUrl = pokemonResult.results[0].url;
        const pokemonInfoResponse = await fetch(pokemonInfoUrl);
        const data = await pokemonInfoResponse.json();
        const imgPokeball = document.createElement('img');
        imgPokeball.src = "pokeball.png";
        const pokemonName = data.forms[0].name;
        const urlOver = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${pokemonName}.gif`;

        console.log("URL GIF:", urlOver);

        const frontImageUrl = data.sprites.front_default;
        const img = document.createElement('img');
        img.src = frontImageUrl;
        img.classList.add('cover-image');
        const hoverImg = document.getElementById('hover-image');
        // const imgPokeball = document.createElement('img');
        // imgPokeball.src = "pokeball.png";
        //hoverImg.src = urlOver; // URL della GIF dinamica
        if (await isGifAvailable(urlOver)) {
            hoverImg.src = urlOver;
        } else {
            hoverImg.src = frontImageUrl;
        }

        document.getElementById('pokemon-image').appendChild(img);
        document.getElementById('nome-pokemon').textContent = data.forms[0].name;
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
            document.querySelector('.card').classList.add('hidden');
            setTimeout(loop, timeNotAlive());
        }, timeAlive());
    }

    loop();
}

startLoop();

// const randomPokemonId = getRandomPokemonId();
// fetchPokemonImage(randomPokemonId);
