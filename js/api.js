let URL = "https://pokeapi.co/api/v2/pokemon/";
const Pokedex = document.querySelector("#Pokedex");
const botonTipos = document.querySelectorAll(".btn-tipos");

for (let i = 1; i <= 251; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="card-info">
                <h2 class="nombre">#${pokeId}</h2>
                <h2 class="nombre">${poke.name}</h2>
            </div>
            <div class="tipos">
                ${tipos}
            </div>
        </div>
    `;
    Pokedex.append(div);
}

botonTipos.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    Pokedex.innerHTML = "";

    for (let i = 1; i <= 251; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))