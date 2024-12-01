let pokedex = [];

async function esiste(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

function loadPokedex() {
    pokedex = JSON.parse(localStorage.getItem("savedPokemon")) || [];
    console.log("Pokedex caricata:", pokedex);
}

async function ShpokemonSrc(pokemon) {
    const pokemonContainer = document.getElementById("pokedex-container");

    // Crea la card del Pokémon
    const card = document.createElement('div');
    card.classList.add('card');

    // Wrapper per le immagini (statica e hover)
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    // Immagine statica del Pokémon
    const imgPokemon = document.createElement('img');
    imgPokemon.src = pokemon.sprites.front_default;
    imgPokemon.classList.add('pokemon-image');

    // Immagine GIF del Pokémon
    const hoverImg = document.createElement('img');
    hoverImg.classList.add('hover-image');
    hoverImg.src = ""; // Preimposta l'URL vuoto
    const shinyUrl = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/${pokemon.forms[0].name}.gif`;
    hoverImg.src = (await esiste(shinyUrl)) ? shinyUrl : pokemon.sprites.front_default;

    console.log("Visualizzando Pokémon:", pokemon);
    console.log("Immagine statica:", pokemon.sprites.front_default);
    console.log("GIF shiny URL:", shinyUrl);
    console.log("Nome Pokémon:", pokemon.forms[0].name);

    // Aggiungi le immagini al wrapper
    wrapper.appendChild(imgPokemon);
    wrapper.appendChild(hoverImg);

    // Nome del Pokémon
    const nomePokemon = document.createElement('p');
    nomePokemon.textContent = pokemon.forms[0].name;
    nomePokemon.classList.add('nome-pokemon');

    // Aggiungi wrapper e nome alla card
    card.appendChild(wrapper);
    card.appendChild(nomePokemon);

    // Aggiungi la card al contenitore del Pokedex
    pokemonContainer.appendChild(card);

    // Aggiungi evento al click per salvare il Pokémon
    card.addEventListener('click', () => {
        location.href = 'index2.html'; // Reindirizza alla pagina di dettaglio
        salvaPokemonNelStorage(pokemon); // Salva il Pokémon nel localStorage
    });
}

async function visualizzaPokemon() {
    const pokemonContainer = document.getElementById("pokedex-container");
    pokemonContainer.innerHTML = ''; // Pulisce il contenitore

    if (!pokedex || pokedex.length === 0) {
        const txt = document.createElement('p');
        txt.classList.add('messg');
        txt.textContent = `Nessun pokemon salvato. Torna alla foresta per catturarne qualcuno.`;
        pokemonContainer.appendChild(txt);
    }

    pokedex.sort((a, b) => a.forms[0].name.localeCompare(b.forms[0].name));

    // Ciclo sui Pokémon nel Pokedex
    for (const pokemon of pokedex) {
        try {
            await ShpokemonSrc(pokemon); // Chiama la funzione per creare e visualizzare la card
        } catch (error) {
            console.error("Errore nella visualizzazione del Pokémon:", pokemon, error);
        }
    }
}

function salvaPokemonNelStorage(pokemon) {
    localStorage.setItem("savedPokemonVisual", JSON.stringify(pokemon));
    console.log("Pokémon salvato:", pokemon);
}

function clearPokedex() {
    localStorage.removeItem("savedPokemon");
    pokedex = [];
    visualizzaPokemon(); // Rende di nuovo visibile il Pokedex
}

document.addEventListener("DOMContentLoaded", () => {
    loadPokedex(); // Carica il Pokedex
    const pokemonContainer = document.getElementById("pokedex-container");

    if (pokedex.length > 0) {
        visualizzaPokemon(); // Visualizza i Pokémon se ce ne sono
    } else {
        const txt = document.createElement('p');
        txt.classList.add('messg');
        txt.textContent = `Nessun pokemon salvato. Torna alla foresta per catturarne qualcuno.`;
        pokemonContainer.appendChild(txt);
    }
});

// Gestione della barra di ricerca
let open = false;
document.querySelector(".search-container img").addEventListener("click", () => {
    const searchInput = document.querySelector(".search-container input");
    const searchIcon = document.querySelector(".search-container img");
    
    if (!open) {
        searchInput.style.width = "100%";
        searchIcon.style.right = "42px";
        searchIcon.style.transform = "rotate(360deg)";
        searchInput.style.opacity = "1";
        document.querySelectorAll(".search-container p").forEach((e) => e.style.opacity = "0");
        open = true;
    } else {
        searchInput.style.width = "0%";
        searchInput.style.opacity = "0";
        searchIcon.style.transform = "rotate(0deg)";
        document.querySelectorAll(".search-container p").forEach((e) => e.style.opacity = "1");
        open = false;
    }
});

// Funzione per la ricerca dei Pokémon
document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById("pokedex-container");
    const search = document.getElementById("poke-search");

    search.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            pokemonContainer.innerHTML = ''; // Pulisce il contenitore dei Pokémon
            const searchTerm = search.value.toLowerCase(); // Recupera il termine di ricerca

            // Filtra e visualizza i Pokémon che corrispondono al termine di ricerca
            pokedex.forEach(pokemon => {
                const pokemonStr = pokemon.forms[0].name.toLowerCase();
                if (pokemonStr.includes(searchTerm)) {
                    ShpokemonSrc(pokemon); // Visualizza il Pokémon corrispondente
                }
            });
        }
    });
});