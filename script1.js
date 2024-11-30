let pokedex=[];
async function esiste(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}
function loadPokedex(){
    pokedex = JSON.parse(localStorage.getItem("savedPokemon")) || [];
    console.log("Pokedex caricata:", pokedex);
}
async function ShpokemonSrc(pokemon){
  const pokemonContainer=document.getElementById("pokedex-container");
            const card = document.createElement('div');
            card.classList.add('card');

            // Wrapper per immagine statica e hover
            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');

            const imgPokemon = document.createElement('img');
            imgPokemon.src = pokemon.sprites.front_default;
            imgPokemon.classList.add('pokemon-image');

            const hoverImg = document.createElement('img');
            hoverImg.classList.add('hover-image');
            hoverImg.src="";
            const shinyUrl = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${pokemon.forms[0].name}.gif`;
            hoverImg.src = (await esiste(shinyUrl)) ? shinyUrl : pokemon.sprites.front_default;
            console.log("Visualizzando Pokémon:", pokemon);
            console.log("Immagine statica:", pokemon.sprites.front_default);
            console.log("GIF shiny URL:", shinyUrl);
            console.log("Nome Pokémon:", pokemon.forms[0].name);

            // Aggiungi immagini al wrapper
            wrapper.appendChild(imgPokemon);
            wrapper.appendChild(hoverImg);

            // Nome del Pokémon
            const nomePokemon = document.createElement('p');
            nomePokemon.textContent = pokemon.forms[0].name;
            nomePokemon.classList.add('nome-pokemon');

            // Aggiungi wrapper e nome alla card
            card.appendChild(wrapper);
            card.appendChild(nomePokemon);

            // Aggiungi la card al container
            pokemonContainer.appendChild(card);
}

async function visualizzaPokemon() {
    const pokemonContainer = document.getElementById("pokedex-container");
    pokemonContainer.innerHTML = ''; // Pulisci il contenitore

    if (!pokedex || pokedex.length === 0) {
        console.error("Nessun Pokémon da visualizzare!");
        return;
    }

    for (const pokemon of pokedex) {
        try {
            // Crea la card
            const card = document.createElement('div');
            card.classList.add('card');

            // Wrapper per immagine statica e hover
            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');

            const imgPokemon = document.createElement('img');
            imgPokemon.src = pokemon.sprites.front_default;
            imgPokemon.classList.add('pokemon-image');

            const hoverImg = document.createElement('img');
            hoverImg.classList.add('hover-image');
            hoverImg.src="";
            const shinyUrl = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${pokemon.forms[0].name}.gif`;
            hoverImg.src = (await esiste(shinyUrl)) ? shinyUrl : pokemon.sprites.front_default;
            console.log("Visualizzando Pokémon:", pokemon);
            console.log("Immagine statica:", pokemon.sprites.front_default);
            console.log("GIF shiny URL:", shinyUrl);
            console.log("Nome Pokémon:", pokemon.forms[0].name);

            // Aggiungi immagini al wrapper
            wrapper.appendChild(imgPokemon);
            wrapper.appendChild(hoverImg);

            // Nome del Pokémon
            const nomePokemon = document.createElement('p');
            nomePokemon.textContent = pokemon.forms[0].name;
            nomePokemon.classList.add('nome-pokemon');

            // Aggiungi wrapper e nome alla card
            card.appendChild(wrapper);
            card.appendChild(nomePokemon);

            // Aggiungi la card al container
            pokemonContainer.appendChild(card);
            card.addEventListener('click', () => {
                location.href = 'index2.html';
                salvaPokemonNelStorage(pokemon);
            });
        } catch (error) {
            console.error("Errore nella visualizzazione del Pokémon:", pokemon, error);
        }
    }
}
function salvaPokemonNelStorage(pokemon) {
    localStorage.setItem("savedPokemonVisual", JSON.stringify(pokemon));
    console.log("Pokémon salvato:", pokemon);
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
document
  .querySelector(".search-container img")
  .addEventListener("click", () => {
    if (!open) {
      document.querySelector(".search-container input").style.width = "100%";
      document.querySelector(".search-container img").style.right = "42px";
      document.querySelector(".search-container img").style.transform =
        "rotate(360deg)";
      document.querySelector(".search-container input").style.opacity = "1";
      document.querySelectorAll(".search-container p").forEach((e) => {
        e.style.opacity = "0";
      });
 
      open = true;
    } else {
      document.querySelector(".search-container input").style.width = "0%";
      document.querySelector(".search-container input").style.opacity = "0";
      document.querySelector(".search-container img").style.transform =
        "rotate(0deg)";
      document.querySelectorAll(".search-container p").forEach((e) => {
        e.style.opacity = "1";
      });
 
 document.querySelectorAll(".sidebar .types div p").forEach((e) => {
        e.style.cssText = "";
      });
      open = false;
    }
  });
  
document.addEventListener("DOMContentLoaded", () => {
  const pokemonContainer = document.getElementById("pokedex-container");
  const search = document.getElementById("poke-search");
  
  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      pokemonContainer.innerHTML = '';
      const searchTerm = search.value.toLowerCase();

      pokedex.forEach(pokemon => {
        const pokemonStr = pokemon.forms[0].name.toLowerCase();
        if (pokemonStr.includes(searchTerm)) {
          ShpokemonSrc(pokemon);
        }
      });
    }
  });
});