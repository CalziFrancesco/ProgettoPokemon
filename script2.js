let pokemon=[];
function loadPokemon() {
    const savedPokemon = JSON.parse(localStorage.getItem("savedPokemonVisual"));
    if (!savedPokemon) {
        console.error("Nessun Pokémon salvato trovato!");
        return;
    }
    pokemon.push(savedPokemon);
    console.log("Pokémon caricato:", savedPokemon);
}
async function esiste(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}
async function visualizzaPokemon(){
    const baseStats =   document.getElementById("base-stats");
    baseStats.innerHTML='';

    const type =   document.getElementById("type");
    type.innerHTML='Type: ';
    
    const stats = document.getElementById("stats");

    const statsContainer = document.getElementById("stats-container");
    statsContainer.innerHTML='';


    document.getElementById('pokemon-image').innerHTML = '';
    document.getElementById('nome-pokemon').innerHTML = '';

    // Mostra l'immagine del Pokémon
    const img = document.createElement('img');
    img.src = pokemon[0].sprites.front_default;
    img.classList.add('cover-image');
    document.getElementById('pokemon-image').appendChild(img);

    // Mostra il nome del Pokémon
    document.getElementById('nome-pokemon').textContent = pokemon[0].forms[0].name;

    const urlOver = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${pokemon[0].forms[0].name}.gif`;

    const pokType = document.createElement('p');
    let types = ''; // Variabile per concatenare i tipi

    pokemon[0].types.forEach((element) => {
        types += ` ${element.type.name} `;
    });

    pokType.textContent = types;
    type.appendChild(pokType);

    
    
    
    const baseXP = document.createElement('p');
    baseXP.textContent = `Base XP: ${pokemon[0].base_experience}`;
    //baseXP.classList.add('nome-pokemon');

    const height = document.createElement('p');
    height.textContent = `Height: ${pokemon[0].height} m`;
    //height.classList.add('nome-pokemon');

    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemon[0].weight} Kg`;
    //weight.classList.add('nome-pokemon');

    baseStats.appendChild(baseXP);
    baseStats.appendChild(height);
    baseStats.appendChild(weight);

    // Per HP
    const containerHp = document.createElement('div');
    const barContainerHp = document.createElement('div');
    barContainerHp.classList.add('bar-container');
    const hp = document.createElement('p');
    hp.textContent = `HP:  ${pokemon[0].stats[0].base_stat}`;
    const barHp = document.createElement('div');
    barHp.classList.add('bar-hp');
    const percentualeHp = (pokemon[0].stats[0].base_stat / 255) * 100;
    barHp.style.width = `${percentualeHp}%`;
    barContainerHp.appendChild(barHp);
    containerHp.appendChild(hp);
    containerHp.appendChild(barContainerHp);
    statsContainer.appendChild(containerHp);

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
    specialDefense.textContent = `Special Defense:  ${pokemon[0].stats[1].base_stat}`; 
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
    specialAttack.textContent = `Special Attack:  ${pokemon[0].stats[1].base_stat}`; 
    const barSpecialAttack = document.createElement('div');
    barSpecialAttack.classList.add('bar-special-attack');
    const percentualeSpecialAttack = (pokemon[0].stats[4].base_stat / 194) * 100; 
    barSpecialAttack.style.width = `${percentualeSpecialAttack}%`;
    barContainerSpecialAttack.appendChild(barSpecialAttack);
    containerSpecialAttack.appendChild(specialAttack);
    containerSpecialAttack.appendChild(barContainerSpecialAttack);
    statsContainer.appendChild(containerSpecialAttack);

    stats.appendChild(statsContainer);


    const hoverImg = document.getElementById('hover-image');
        if (await esiste(urlOver)) {
            hoverImg.src = urlOver;
        } else {
            hoverImg.src = img.src;
        }
}
document.addEventListener("DOMContentLoaded",loadPokemon);
document.addEventListener("DOMContentLoaded", () => {
    visualizzaPokemon();
});