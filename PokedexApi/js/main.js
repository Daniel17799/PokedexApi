const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";                         //*Api pokemon//

for (let i = 1; i <= 151; i++) {                                        //*Recorremos la URL 151 veces(número de pokemon que hay)//
    fetch(URL + i)                                                      //*fecth:proporciona una interfaz JavaScript para acceder y manipular partes del protocolo//
        .then((response) => response.json())                           //*response:método que devuelve el resultado en respuesta JSON.//
        .then(data => mostrarPokemon(data))                            //*then:Devuelve inmediatamente un Promise objeto equivalente, lo que le permite encadenar llamadas a otros métodos de promesa.//
};

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) =>`<p class="${type.type.name} tipo">${type.type.name}</p>`);         //*Se genera un array con map de lo que buscamos//
    tipos = tipos.join('');                                                                                  //*crea y devuelve una nueva cadena concatenando todos los elementos

//*Agregar 00 al id de pokemon
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");                              //*Crea elemento DIV
    div.classList.add("pokemon");                                           //*Agrega la clase pokemon
    div.innerHTML = `   
                                                        
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${poke.height}dm</p>
            <p class="stat">${poke.weight}hg</p>
        </div>
    </div>
`;
listaPokemon.append(div);
}


//^Botones //

botonesHeader.forEach(boton => boton.addEventListener("click", (event) =>{                           //^forEach ejecuta la función indicada una vez por cada elemento del array.//
    const botonId = event.currentTarget.id;                                                    //^Trae el id del evento al que damos click//
    
    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {                        
        fetch(URL + i)                                      
            .then((response) => response.json())           
            .then(data => {   
                

                if(botonId=== "ver-todos"){
                    mostrarPokemon(data);
                }else{

                const tipos= data.types.map(type => type.type.name);
                if(tipos.some(tipo => tipo.includes(botonId))){                        //^some:Devuelve un booleanp si, en la matriz, encuentra un elemento porcionado
                    mostrarPokemon(data);
                }
            }
            })
    }
}))

