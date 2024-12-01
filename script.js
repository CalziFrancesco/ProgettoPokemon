const pokemonInfo = []; // array che conterrà le informazioni sul pokemon corrente

// funzione per generare un id casuale di un pokemon tra 1 e 1302
function getRandomPokemonId() {
    return Math.floor(Math.random() * 1302) + 1;
}

// funzione per calcolare un tempo casuale che rappresenta il "tempo di vita" del pokemon in millisecondi
function timeAlive() {
    return Math.floor(Math.random() * (8000 - 7000 + 1)) + 7000;
}

// funzione per calcolare un tempo casuale che rappresenta il "tempo non vivo" del pokemon in millisecondi
function timeNotAlive() {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
}

// funzione che verifica se una URL esiste
async function esiste(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok; // ritorna true se la risposta è OK, altrimenti false
    } catch (error) {
        return false; // se c'è un errore, ritorna false
    }
}

const imgPokeball = document.getElementById('pokeball');
imgPokeball.src = "img/pokeball.png"; // imposta l'immagine della pokeball per il catch

// funzione per ottenere l'immagine di un pokemon dato il suo id
async function fetchPokemonImage(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemonId}`;  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Qualcosa non va');
        }
        const pokemonResult = await response.json();
        const pokemonInfoUrl = pokemonResult.results[0].url; // ottiene l'url del dettaglio del pokemon
        const pokemonInfoResponse = await fetch(pokemonInfoUrl); // ottiene i dettagli del pokemon
        const data = await pokemonInfoResponse.json(); 
        pokemonInfo.pop(); // rimuove l'ultimo pokemon salvato nell'array
        pokemonInfo.push(data); // aggiunge il nuovo pokemon nell'array

        const pokemonName = data.forms[0].name; // nome del pokemon
        const urlOver = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/${pokemonName}.gif`; // URL per la gif del pokemon

        const frontImageUrl = data.sprites.front_default; // immagine del pokemon
        const img = document.createElement('img');
        img.src = frontImageUrl; // imposta l'immagine del pokemon
        img.classList.add('cover-image'); // aggiunge una classe CSS per l'immagine
        const hoverImg = document.getElementById('hover-image'); // trova l'immagine per l'hover
        if (await esiste(urlOver)) { // verifica se la GIF esiste
            hoverImg.src = urlOver; // imposta la GIF come immagine di hover
        } else {
            hoverImg.src = frontImageUrl; // se la GIF non esiste, imposta l'immagine normale
        }

        document.getElementById('pokemon-image').appendChild(img); // aggiunge l'immagine del pokemon al container
    } catch (error) {
        console.error('Errore nella fetch:', error); // messaggio errore fetch
    }
}

// funzione che avvia un ciclo continuo per ottenere e mostrare pokemon casuali
function startLoop() {
    loop(); // avvia il ciclo
}

// funzione che gestisce il loop
async function loop() {
    const randomPokemonId = getRandomPokemonId(); // ottiene un id casuale per il pokemon
    await fetchPokemonImage(randomPokemonId); // carica l'immagine del pokemon
    document.getElementById('pokeball').style.display = 'block'; // mostra la Pokéball
    setTimeout(() => { // dopo un certo tempo, pulisce la schermata e avvia di nuovo il ciclo
        document.getElementById('pokemon-image').innerHTML = '';
        document.getElementById('pokeball').style.display = 'none';
        document.querySelector('.card').classList.add('hidden'); // nasconde la card del pokemon
        setTimeout(startLoop, timeNotAlive()); // avvia il ciclo dopo del tempo
    }, timeAlive()); // tempo visualizzazione pokemon
}

startLoop(); // avvia il ciclo al caricamento della pagina

// variabile che memorizza il pokedex caricato da localStorage
let pokedex = [];
function loadPokedex() {
    pokedex = JSON.parse(localStorage.getItem("savedPokemon")) || []; // carica il pokedex da localStorage o un array vuoto se non esiste
}

// funzione per catturare il pokemon (aggiungerlo al pokedex)
function catchPokemon() {
    const giaCatturato = pokedex.some(pokemon => pokemon.forms[0].name === pokemonInfo[0].forms[0].name); // verifica se il pokemon è già stato catturato
    
    if (giaCatturato) {
        return; // se il pokemon è già nel pokedex, non fare nulla
    }
    pokedex.push(pokemonInfo[0]); // aggiungi il pokemon al pokedex
    localStorage.setItem("savedPokemon", JSON.stringify(pokedex)); // salva il pokedex nel localStorage
}

// funzione per mostrare un pokemon in una card
function mostraPokemonInCard(pokemon) {
    document.getElementById('pokemon-image').innerHTML = ''; // rimuove l'immagine del pokemon
    document.getElementById('pokeball').innerHTML = ''; // rimuove la pokeball

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.classList.add('cover-image'); 
    document.getElementById('pokemon-image').appendChild(img);r

    const hoverImg = document.getElementById('hover-image');
    const gifUrl = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/${pokemon.forms[0].name}.gif`; // URL per la GIF shiny

    esiste(gifUrl).then((exists) => {
        hoverImg.src = exists ? gifUrl : pokemon.sprites.front_default; 
    });
}

// funzione per visualizzare tutti i pokemon catturati nel pokedex
function visualizzaPokemon() {
    const pokemonImageContainer = document.getElementById("pokedex-pokemon-image");
    pokemonImageContainer.innerHTML = ''; // pulisce la visualizzazione dei pokemon

    pokedex.forEach(pokemon => {
        const imgPokemon = document.createElement("img");
        imgPokemon.src = pokemon.sprites.front_default;
        imgPokemon.classList.add('pokedex-image');
        imgPokemon.addEventListener('click', () => mostraPokemonInCard(pokemon)); // aggiunge un evento al click per visualizzare il pokemon in una card

        pokemonImageContainer.appendChild(imgPokemon); // aggiunge l'immagine del pokemon al container
    });
}

// eventi per caricare e salvare il pokedex
document.getElementById("pokeball").addEventListener("click", catchPokemon); // cattura un pokemon quando clicchi sulla pokeball
document.addEventListener("DOMContentLoaded", loadPokedex); // carica il pokedex al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
    loadPokedex(); // carica il pokedex
});