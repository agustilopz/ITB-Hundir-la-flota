import { Tablero } from "./Tablero.js";

let jsonBarcos = `[
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`;

let jsonBarcosOLD = `[
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`;

// Variables globales
let barcoSeleccionado = null;
let posicionamentBarco = 'V';
let modoJuego = "colocacion";
let turnoJugador = true;

let listaBarcos = JSON.parse(jsonBarcos);


// TABLERO #1

let tablero = new Tablero(10);
tablero.guardarBarcos(listaBarcos);

console.log("Tablero 1 (jugador):");

console.log(tablero);


let contenedor1 = document.getElementById('tablero1');


// Llamada a la función para mostrar el tablero en HTML
mostrarTableroHTML(tablero,contenedor1);

// Añadimos los barcos a seleccionar
let contenedorBarcos = document.getElementById('barcos');
for(let barco of listaBarcos) {
    let boton = document.createElement('button');
    boton.id = barco.name.toLowerCase();
    boton.textContent = `${barco.name}-${barco.size}`;
    boton.addEventListener("click", function() {
        alert("Has seleccionado el " + barco.name);
        barcoSeleccionado=barco;
        boton.disabled=true;
    })
    
    contenedorBarcos.appendChild(boton);
}

// Cambiamos la orientación al pulsar 'R'
document.addEventListener("keypress", function(event){

    if(event.key === "R" || event.key === "r") {
        if(posicionamentBarco==='V') {
            posicionamentBarco='H';
        } else {
            posicionamentBarco='V';
        }
        alert("Orientación: " + posicionamentBarco);
    }
})

//

// TABLERO #2
let contenedor2 = document.getElementById('tablero2');
let tablero2 = new Tablero(10);

tablero2.guardarBarcos(listaBarcos);
tablero2.posicionarBarcosAleatorio();

console.log("Tablero 2 (IA):");
console.log(tablero2);

// Llamada a la función para mostrar el tablero de la IA
mostrarTableroHTML(tablero2, contenedor2, false);


/*
// Formulario de disparo del usuario
let formulario= document.getElementById('disparosUsuario');
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData(formulario);

    let x = formData.get('x');
    let y = formData.get('y');

    console.log('X: ', x);
    console.log('Y: ', y);

    tablero2.recibirDisparo(x,y);
    mostrarTableroHTML(tablero2, contenedor2);

})
    */

function ataqueIA(){
    console.log("boton ia presionado")
let disparoIA = tablero.generarAtaqueIA();
mostrarTableroHTML(tablero, contenedor1);

console.log(disparoIA);

return disparoIA;

}

// Hacerla accesible globalmente
window.ataqueIA = ataqueIA;

//
function mostrarTableroHTML(tablero, contenedor, esJugador=true) {

    contenedor.innerHTML = '';

    for (let i = 0; i < tablero.tamaño; i++) {
        for (let j = 0; j < tablero.tamaño; j++) {
            let celda = tablero.celdas[i][j];
            let clase = (esJugador && celda.ocupada) ? 'ocupada' : 'vacía';  // Dependiendo de si está ocupada o no, le asignamos una clase
            let celdaDiv = document.createElement('div');
            celdaDiv.classList.add('celda', clase);
            celdaDiv.classList.add('celda', celda.estado)

            if(esJugador && modoJuego === "colocacion") {
            // Añadimos el evento del click para soltar el barco
            celdaDiv.addEventListener("click", function(event) {
                if(barcoSeleccionado===null) {
                    alert("No has seleccionado ningún barco")
                } else {
                console.log(`Fila ${i}, columna ${j}`);
                let barcoPosicionado = tablero.posicionarBarco(posicionamentBarco,i,j,barcoSeleccionado);
                // Si no se ha colocado el barco, volvemos a habilitar el button
                if(!barcoPosicionado) {
                    let botonBarco = document.getElementById(barcoSeleccionado.name.toLowerCase())
                    botonBarco.disabled = false;
                    console.log(barcoSeleccionado)
                }
                barcoSeleccionado = null;
                if(tablero.todosLosBarcosColocados()) {
                    alert("Todos los barcos han sido colocados!")
                    modoJuego="ataque";
                    // Actualizamos el tablero de la IA para añadir el evento de disapros
                    mostrarTableroHTML(tablero2, contenedor2, false);
                }
                mostrarTableroHTML (tablero, contenedor);
                }
                console.log(barcoSeleccionado)
            });
            }

        if(!esJugador && modoJuego === "ataque") {
           celdaDiv.addEventListener("click", function(event) {
            if (!turnoJugador) return; // No hace nada si no es el turno del jugador
               let disparoJugador = tablero.recibirDisparo(i,j);
                mostrarTableroHTML(tablero2, contenedor2, false);
                // Si el jugador falla, es turno de la IA
                if(disparoJugador == "agua") {
                    turnoJugador = false; // Bloquear turno del jugador
                    actualizarIndicadorTurno();
                    // Función para realizar disparos de la IA con retraso
                    function realizarDisparoIA() {
                        setTimeout(() => {
                            let disparoIA = ataqueIA();
                            // Si ha acertado, programa otro disparo con retraso
                            if(disparoIA == "tocado" || disparoIA == "hundido") {
                                realizarDisparoIA(); // Llamada recursiva para el siguiente disparo
                            } else {
                                turnoJugador = true; // Termina el turno de la IA
                                actualizarIndicadorTurno();

                            }
                        }, 1000); // Retraso de 1 segundo entre disparos
                    }
                    
                    // Inicia la secuencia de disparos de la IA
                    realizarDisparoIA();
                }
                

            })
            }
        

            if(esJugador || (!esJugador && celda.barcoHundido)) {
            // Si la celda está ocupada por un barco, mostrar la inicial del barco
            if (celda.nombreBarco) {
                celdaDiv.textContent = celda.nombreBarco[0]; // Muestra la inicial del nombre del barco
            }
                }

            // Añadir el div de la celda al contenedor
            contenedor.appendChild(celdaDiv);
        }
    }
}

function actualizarIndicadorTurno() {
    const indicador = document.getElementById('indicador-turno');
    indicador.textContent = `Turno: ${turnoJugador ? 'Jugador' : 'IA'}`;
}


/* -------------------------------------- API ------------------------------------ */

/***
 * CONEXIÓN A API
 */

async function guardarPartida(nombreJugador, tableroJugador, tableroIA) {
    const partida = {
    //DEBES DEFINIR AQUí LO QUE QUIERAS QUE TENGAS QUE GUARDAR
    jugador: nombreJugador,
    tableroJugador: JSON.stringify(tableroJugador),
    tableroIA: JSON.stringify(tableroIA)    
    };

    try {
        const response = await fetch("http://localhost:3000/partidas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(partida)
        });

        if (!response.ok) throw new Error("Error al guardar la partida");

        const data = await response.json();
        console.log("Partida guardada con éxito:", data);
        return data.id; // ID de la partida
    } catch (err) {
        console.error("Error:", err);
    }
}


async function cargarPartida(idPartida) {
    try {
        const response = await fetch(`http://localhost:3000/partidas/${idPartida}`);
        if (!response.ok) throw new Error("No se encontró la partida");

        const data = await response.json();
        console.log("Partida cargada:", data);
        return data;
    } catch (err) {
        console.error("Error:", err);
    }
}

document.getElementById("btnGuardar").addEventListener("click", () => {
    const nombreJugador = prompt("Introduce tu nombre:");
    //DEFINE AQUI LO QUE QUIERAS, PUEDES AÑADIR MAS PARAMETROS
    let tableroJugador = tablero;
    let tableroIA = tablero2;
    guardarPartida(nombreJugador, tableroJugador, tableroIA);
});

document.getElementById("btnCargar").addEventListener("click", async () => {
    const id = prompt("Introduce el ID de la partida:");
    const partida = await cargarPartida(id);
    // Llamamos a la función que recupera los tableros 
    
    // PROGRAMAR
    recuperaTablerosApi(partida);
});


function recuperaTablerosApi(partida) {

let tableroJugador = JSON.parse(partida.tableroJugador);
let tableroIA = JSON.parse(partida.tableroIA);

// TABLERO #1 //
let tablero = new Tablero(10);
tablero.tamaño = tableroJugador.tamaño;
tablero.celdas = tableroJugador.celdas;
tablero.barcos = tableroJugador.barcos;
console.log("Tablero 1 (jugador):");
console.log(tablero);
let contenedor1 = document.getElementById('tablero1');

// Llamada a la función para mostrar el tablero en HTML
mostrarTableroHTML(tablero,contenedor1);

// TABLERO #2
let tablero2 = new Tablero(10);
tablero2.tamaño = tableroIA.tamaño;
tablero2.celdas = tableroIA.celdas;
tablero2.barcos = tableroIA.barcos;
console.log("Tablero 2 (IA):");
console.log(tablero2);
let contenedor2 = document.getElementById('tablero2');

// Llamada a la función para mostrar el tablero de la IA
mostrarTableroHTML(tablero2,contenedor2, false);

}

