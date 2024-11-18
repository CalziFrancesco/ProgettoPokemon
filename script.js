//da 1 a 1025, da 10001 a 10277
const pokemonInfo=[]; 
function getRandomPokemonId() {
    return Math.floor(Math.random() * 1302) + 1;
}

function timeAlive () {
    return Math.floor(Math.random() * (8000 - 7000 + 1)) + 7000;
}

function timeNotAlive() {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
}

async function esiste(url) {
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
        pokemonInfo.pop();
        pokemonInfo.push(data);
        const imgPokeball = document.createElement('img');
        imgPokeball.src = "pokeball.png";
        const pokemonName = data.forms[0].name;
        const urlOver = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${pokemonName}.gif`;

        //console.log("URL GIF:", urlOver);

        const frontImageUrl = data.sprites.front_default;
        const img = document.createElement('img');
        img.src = frontImageUrl;
        img.classList.add('cover-image');
        const hoverImg = document.getElementById('hover-image');
        // const imgPokeball = document.createElement('img');
        // imgPokeball.src = "pokeball.png";
        //hoverImg.src = urlOver; // URL della GIF dinamica
        if (await esiste(urlOver)) {
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
let running = true;
function startLoop() {
    if(running) {
        loop()
    }
}

function fermaButton() {
    running = false;
    visualizzaPokemon();
}

function avviaButton() {
    running = true;
    if(!running){
    document.getElementById('pokedex-pokemon-image').innerHTML = '';
    document.getElementById('pokedex-nome-pokemon').innerHTML = '';
    document.getElementById('pokemon-image').innerHTML = '';
    document.getElementById('hover-image').innerHTML = '';
    document.getElementById('nome-pokemon').innerHTML = '';
    document.getElementById('pokeball').innerHTML = '';
    //document.getElementById('pokeball2').innerHTML = '';
    //document.getElementById('home').innerHTML = '';
    loop();
    }
}

async function loop() {

    const randomPokemonId = getRandomPokemonId();
    await fetchPokemonImage(randomPokemonId);
    setTimeout(() => {
        document.getElementById('pokemon-image').innerHTML = '';
        document.getElementById('nome-pokemon').innerHTML = '';
        document.getElementById('pokeball').innerHTML = '';
        document.querySelector('.card').classList.add('hidden');
        setTimeout(startLoop, timeNotAlive());
    }, timeAlive());
}

startLoop();

let pokedex=[];
function loadPokedex(){
    pokedex = JSON.parse(localStorage.getItem("savedPokemon")) || [];
}

function catchPokemon(){
    const giaCatturato = pokedex.some(pokemon => pokemon.forms[0].name === pokemonInfo[0].forms[0].name);
    
    if (giaCatturato) {
        // alert(`${pokemonInfo[0].name} è già stato catturato!`);
        return;
    }
    pokedex.push(pokemonInfo[0]);
    localStorage.setItem("savedPokemon",JSON.stringify(pokedex));
    //visualizzaPokemon();
    // localStorage.clear("savedPokemon");
}
// function salvaNomi(){
//     localStorage.setItem("nomiSalvati", JSON.stringify(nomi));
//     alert("Nomi salvati con successo");
// }
// function visualizzaPokemon(){
//     //const pokedex=document.getElementById("pokedex");
//     const pokemonImage=document.getElementById("pokedex-pokemon-image");
//     const pokemonName=document.getElementById("pokedex-nome-pokemon");
//     pokemonImage.innerHTML = '';
//     pokemonName.innerHTML = '';
//     pokedex.forEach(pokedex=> {
//         const imgPokemon=document.createElement("img");
//         imgPokemon.src=pokedex.sprites.front_default;
//         const nomePokemon=document.createElement("p");
//         nomePokemon.textContent=pokedex.forms[0].name;
//         //console.log(imgPokemon);
//         pokemonImage.appendChild(imgPokemon);
//         pokemonImage.appendChild(pokemonName);
//     })
// }
function visualizzaPokemon() {
    const pokemonImageContainer = document.getElementById("pokedex-pokemon-image");
    const pokemonNameContainer = document.getElementById("pokedex-nome-pokemon");
    
    pokemonImageContainer.innerHTML = '';
    pokemonNameContainer.innerHTML = '';
    pokedex.forEach(pokemon => {
        const imgPokemon = document.createElement("img");
        imgPokemon.src = pokemon.sprites.front_default;
        const nomePokemon = document.createElement("p");
        nomePokemon.textContent = pokemon.forms[0].name;
        pokemonImageContainer.appendChild(imgPokemon);
        pokemonNameContainer.appendChild(nomePokemon);
    });
}
document.getElementById("pokeball").addEventListener("click",catchPokemon);
document.addEventListener("DOMContentLoaded",loadPokedex);
document.addEventListener("DOMContentLoaded", () => {
    loadPokedex();
    //visualizzaPokemon();
});



// const randomPokemonId = getRandomPokemonId();
// fetchPokemonImage(randomPokemonId);
