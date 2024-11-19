let pokedex=[];
function loadPokedex(){
    pokedex = JSON.parse(localStorage.getItem("savedPokemon")) || [];
}
function visualizzaPokemon() {
    const pokemonImageContainer = document.getElementById("pokedex-pokemon-image");
    // const pokemonNameContainer = document.getElementById("pokedex-nome-pokemon");

    pokemonImageContainer.innerHTML = '';
    // pokemonNameContainer.innerHTML = '';
    pokedex.forEach(pokemon => {
        // Crea l'immagine del Pokémon
        const imgPokemon = document.createElement("img");
        imgPokemon.src = pokemon.sprites.front_default;
        imgPokemon.classList.add('pokedex-image'); // Aggiungi una classe per lo stile

        // Aggiungi un listener al clic
        imgPokemon.addEventListener('click', () => mostraPokemonInCard(pokemon));

        // Crea il nome del Pokémon
        // const nomePokemon = document.createElement("p");
        // nomePokemon.textContent = pokemon.forms[0].name;

        // Aggiungi gli elementi al container
        pokemonImageContainer.appendChild(imgPokemon);
        // pokemonNameContainer.appendChild(nomePokemon);
    });
}
document.addEventListener("DOMContentLoaded",loadPokedex);
document.addEventListener("DOMContentLoaded", () => {
    loadPokedex();
    if (pokedex.length > 0) {
        visualizzaPokemon(); // Visualizza i Pokémon se ce ne sono
    } else {
        console.log("Nessun Pokémon salvato nella Pokedex.");
    }
});
