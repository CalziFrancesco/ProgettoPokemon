// array che conterrà i dati del pokemon
let pokemon=[];

// funzione che carica il pokemon salvato dal localStorage
function loadPokemon() {
    // recupera il pokemon salvato dal localStorage
    const savedPokemon = JSON.parse(localStorage.getItem("savedPokemonVisual"));
    
    // se non ci sono pokemon salvati, stampa un errore e termina la funzione
    if (!savedPokemon) {
        console.error("Nessun pokemon salvato trovato!");
        return;
    }

    // aggiunge il pokemon caricato all'array pokemon
    pokemon.push(savedPokemon);
    console.log("pokemon caricato:", savedPokemon);
}

// funzione asincrona che verifica se un URL esiste
async function esiste(url) {
    try {
        // invia una richiesta HEAD all'URL per verificare se esiste
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok; // restituisce true se la risposta è ok
    } catch (error) {
        return false; // restituisce false in caso di errore (ad esempio, URL non trovato)
    }
}

// funzione che visualizza i dati del pokemon sulla pagina
async function visualizzaPokemon(){
    // seleziona gli elementi HTML dove verranno visualizzati i dati
    const baseStats =   document.getElementById("base-stats");
    baseStats.innerHTML=''; // svuota il contenuto precedente

    const type =   document.getElementById("type");
    type.innerHTML='Type: '; // svuota il contenuto precedente
    
    const stats = document.getElementById("stats");

    const statsContainer = document.getElementById("stats-container");
    statsContainer.innerHTML=''; // svuota il contenuto precedente

    // svuota le informazioni relative all'immagine e al nome
    document.getElementById('pokemon-image').innerHTML = '';
    document.getElementById('nome-pokemon').innerHTML = '';

    // Mostra l'immagine del pokemon
    const img = document.createElement('img');
    img.src = pokemon[0].sprites.front_default; // assegna l'immagine frontale del pokemon
    img.classList.add('cover-image'); // aggiunge una classe per lo stile
    document.getElementById('pokemon-image').appendChild(img); // aggiunge l'immagine alla pagina

    // Mostra il nome del pokemon
    document.getElementById('nome-pokemon').textContent = pokemon[0].forms[0].name;

    // URL per l'immagine animata del pokemon
    const urlOver = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/${pokemon[0].forms[0].name}.gif`;

    // mostra i tipi del pokemon
    const pokType = document.createElement('p');
    let types = ''; // variabile per concatenare i tipi

    // per ogni tipo del pokemon, aggiungiamo il nome del tipo alla stringa 'types'
    pokemon[0].types.forEach((element) => {
        types += ` ${element.type.name} `;
    });

    pokType.textContent = types; // imposta il testo dei tipi
    type.appendChild(pokType); // aggiunge i tipi alla pagina

    // mostra le statistiche base del pokemon
    const baseXP = document.createElement('p');
    baseXP.textContent = `Base XP: ${pokemon[0].base_experience}`;

    const height = document.createElement('p');
    height.textContent = `Height: ${pokemon[0].height} m`;

    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemon[0].weight} Kg`;

    baseStats.appendChild(baseXP); // aggiunge XP
    baseStats.appendChild(height); // aggiunge altezza
    baseStats.appendChild(weight); // aggiunge peso

    // crea la barra di HP (Health Points)
    const containerHp = document.createElement('div');
    const barContainerHp = document.createElement('div');
    barContainerHp.classList.add('bar-container'); // contenitore della barra HP
    const hp = document.createElement('p');
    hp.textContent = `HP:  ${pokemon[0].stats[0].base_stat}`; // imposta il valore degli HP
    const barHp = document.createElement('div');
    barHp.classList.add('bar-hp'); // stile per la barra HP
    const percentualeHp = (pokemon[0].stats[0].base_stat / 255) * 100; // calcola la percentuale
    barHp.style.width = `${percentualeHp}%`; // imposta la larghezza della barra in base agli HP
    barContainerHp.appendChild(barHp);
    containerHp.appendChild(hp);
    containerHp.appendChild(barContainerHp);
    statsContainer.appendChild(containerHp); // aggiunge la sezione HP alla pagina

    // processo simile per Attack, Defense, Speed, Special Defense, e Special Attack
    // qui vengono creati i contenitori e le barre di progresso per ogni statistica

    // Per Attack
    const containerAttack = document.createElement('div');
    const barContainerAttack = document.createElement('div');
    barContainerAttack.classList.add('bar-container');
    const attack = document.createElement('p');
    attack.textContent = `Attack:  ${pokemon[0].stats[1].base_stat}`;
    const barAttack = document.createElement('div');
    barAttack.classList.add('bar-attack');
    const percentualeAttack = (pokemon[0].stats[1].base_stat / 190) * 100;
    barAttack.style.width = `${percentualeAttack}%`;
    barContainerAttack.appendChild(barAttack);
    containerAttack.appendChild(attack);
    containerAttack.appendChild(barContainerAttack);
    statsContainer.appendChild(containerAttack);

    // Per Defense
    const containerDefense = document.createElement('div');
    const barContainerDefense = document.createElement('div');
    barContainerDefense.classList.add('bar-container');
    const defense = document.createElement('p');
    defense.textContent = `Defense:  ${pokemon[0].stats[2].base_stat}`;
    const barDefense = document.createElement('div');
    barDefense.classList.add('bar-defense');
    const percentualeDefense = (pokemon[0].stats[2].base_stat / 250) * 100;
    barDefense.style.width = `${percentualeDefense}%`;
    barContainerDefense.appendChild(barDefense);
    containerDefense.appendChild(defense);
    containerDefense.appendChild(barContainerDefense);
    statsContainer.appendChild(containerDefense);

    // Per Speed
    const containerSpeed = document.createElement('div');
    const barContainerSpeed = document.createElement('div');
    barContainerSpeed.classList.add('bar-container');
    const speed = document.createElement('p');
    speed.textContent = `Speed:  ${pokemon[0].stats[5].base_stat}`;
    const barSpeed = document.createElement('div');
    barSpeed.classList.add('bar-speed');
    const percentualeSpeed = (pokemon[0].stats[5].base_stat / 150) * 100;
    barSpeed.style.width = `${percentualeSpeed}%`;
    barContainerSpeed.appendChild(barSpeed);
    containerSpeed.appendChild(speed);
    containerSpeed.appendChild(barContainerSpeed);
    statsContainer.appendChild(containerSpeed);

    // Per Special Defense
    const containerSpecialDefense = document.createElement('div');
    const barContainerSpecialDefense = document.createElement('div');
    barContainerSpecialDefense.classList.add('bar-container');
    const specialDefense = document.createElement('p');
    specialDefense.textContent = `Special Defense:  ${pokemon[0].stats[3].base_stat}`; 
    const barSpecialDefense = document.createElement('div');
    barSpecialDefense.classList.add('bar-special-defense');
    const percentualeSpecialDefense = (pokemon[0].stats[3].base_stat / 250) * 100; 
    barSpecialDefense.style.width = `${percentualeSpecialDefense}%`;
    barContainerSpecialDefense.appendChild(barSpecialDefense);
    containerSpecialDefense.appendChild(specialDefense);
    containerSpecialDefense.appendChild(barContainerSpecialDefense);
    statsContainer.appendChild(containerSpecialDefense);

    // Per Special Attack
    const containerSpecialAttack = document.createElement('div');
    const barContainerSpecialAttack = document.createElement('div');
    barContainerSpecialAttack.classList.add('bar-container');
    const specialAttack = document.createElement('p');
    specialAttack.textContent = `Special Attack:  ${pokemon[0].stats[4].base_stat}`; 
    const barSpecialAttack = document.createElement('div');
    barSpecialAttack.classList.add('bar-special-attack');
    const percentualeSpecialAttack = (pokemon[0].stats[4].base_stat / 194) * 100; 
    barSpecialAttack.style.width = `${percentualeSpecialAttack}%`;
    barContainerSpecialAttack.appendChild(barSpecialAttack);
    containerSpecialAttack.appendChild(specialAttack);
    containerSpecialAttack.appendChild(barContainerSpecialAttack);
    statsContainer.appendChild(containerSpecialAttack);

    // aggiunge il contenitore delle statistiche alla pagina
    stats.appendChild(statsContainer);

    // gestione dell'immagine animata (shiny) del pokemon al passaggio del mouse
    const hoverImg = document.getElementById('hover-image');
    if (await esiste(urlOver)) {
        hoverImg.src = urlOver; // imposta l'immagine shiny se esiste
    } else {
        hoverImg.src = img.src; // altrimenti usa l'immagine di default
    }
}

// evento che viene eseguito quando il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", loadPokemon);
document.addEventListener("DOMContentLoaded", () => {
    visualizzaPokemon(); // visualizza il pokemon dopo che è stato caricato
});