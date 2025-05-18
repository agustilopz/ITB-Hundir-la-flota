import { Tablero } from "./Tablero.js";

let jsonBarcos = `[
    { "name": "Portaaviones", "size": 5 },
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
let partidaTerminada = false;

let listaBarcos = JSON.parse(jsonBarcos);


// TABLERO #1

let tablero = new Tablero('Jugador', 10);
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
                // Actualiza el mensaje de la orientación
                const orientacionActual = document.querySelector('.orientacion-actual');
                const hintMessage = document.getElementById('rotacion-hint');
                
                orientacionActual.textContent = `(Actual: ${posicionamentBarco === 'V' ? 'Vertical' : 'Horizontal'})`;
                hintMessage.classList.add('orientacion-cambiando');
                
                // Elimina la clase de animación después de que termine
                setTimeout(() => {
                    hintMessage.classList.remove('orientacion-cambiando');
                }, 500);
    }
})

//

// TABLERO #2
let contenedor2 = document.getElementById('tablero2');
let tablero2 = new Tablero('IA', 10);

tablero2.guardarBarcos(listaBarcos);
tablero2.posicionarBarcosAleatorio();

console.log("Tablero 2 (IA):");
console.log(tablero2);

// Llamada a la función para mostrar el tablero de la IA
mostrarTableroHTML(tablero2, contenedor2, false);

function ataqueIA(){
    console.log("boton ia presionado")
let disparoIA = tablero.generarAtaqueIA();
if (disparoIA === "hundido") {
    mostrarMensajeFlotante("¡La IA ha hundido uno de tus barcos!", "error");
}
if(tablero.comprobarEstadoPartida()) {
    gameOver();
    partidaTerminada = true;

};
mostrarTableroHTML(tablero, contenedor1);

console.log(disparoIA);

return disparoIA;

}

// Hacerla accesible globalmente
window.ataqueIA = ataqueIA;

// Función para mostrar el tablero en el DOM (es muy larga, lo sé, pero me iba bien así :P)
function mostrarTableroHTML(tablero, contenedor, esJugador=true) {

    contenedor.innerHTML = '';

    // Afegir cel·la buida a la cantonada superior esquerra
    let cornerCell = document.createElement('div');
    cornerCell.classList.add('celda', 'coordenada');
    contenedor.appendChild(cornerCell);

    // Afegir coordenades de columnes (A-J)
    for (let j = 0; j < tablero.tamaño; j++) {
        let coordCell = document.createElement('div');
        coordCell.classList.add('celda', 'coordenada');
        coordCell.textContent = String.fromCharCode(65 + j); // A-J
        contenedor.appendChild(coordCell);
    }

    for (let i = 0; i < tablero.tamaño; i++) {
        // Añadir coordenada fila
        let rowCoordCell = document.createElement('div');
        rowCoordCell.classList.add('celda', 'coordenada');
        rowCoordCell.textContent = i + 1;
        contenedor.appendChild(rowCoordCell);

        for (let j = 0; j < tablero.tamaño; j++) {
            let celda = tablero.celdas[i][j];
            let celdaDiv = document.createElement('div');
            celdaDiv.classList.add('celda');
            
            // Añadir clase según el estado de la celda
            if (celda.estado === 'tocado') {
                celdaDiv.classList.add('tocado');
            } else if (celda.estado === 'hundido') {
                celdaDiv.classList.add('hundido');
            } else if (celda.estado === 'agua') {
                celdaDiv.classList.add('agua');
            } else if (esJugador && celda.ocupada) {
                celdaDiv.classList.add('ocupada');
            } else {
                celdaDiv.classList.add('vacía');
            }

            if(esJugador && modoJuego === "colocacion" && !partidaTerminada) {
            // Añadimos el evento del click para soltar el barco
            celdaDiv.addEventListener("click", function(event) {
                if(barcoSeleccionado===null) {
                    mostrarMensajeFlotante("No has seleccionado ningún barco!", "error");

                } else {
                console.log(`Fila ${i}, columna ${j}`);
                let barcoPosicionado = tablero.posicionarBarco(posicionamentBarco,i,j,barcoSeleccionado);
                // Si no se ha colocado el barco, volvemos a habilitar el button
                if(!barcoPosicionado) {
                    mostrarMensajeFlotante("No hay suficiente espacio para colocar este barco!", "error");
                    let botonBarco = document.getElementById(barcoSeleccionado.name.toLowerCase())
                    botonBarco.disabled = false;
                    console.log(barcoSeleccionado)
                }
                barcoSeleccionado = null;
                if(tablero.todosLosBarcosColocados()) {
                    mostrarMensajeFlotante("Todos los barcos han sido colocados! Comienza la batalla", "success");
                    modoJuego="ataque";
                    document.getElementById("rotacion-hint").style.display = "none";
                    // Actualizamos el tablero de la IA para añadir el evento de disapros
                    mostrarTableroHTML(tablero2, contenedor2, false);
                }
                mostrarTableroHTML (tablero, contenedor);
                }
                console.log(barcoSeleccionado)
            });
            }

        if(!esJugador && modoJuego === "ataque" && !partidaTerminada) {
           celdaDiv.addEventListener("click", function(event) {
            if (!turnoJugador) return; // No hace nada si no es el turno del jugador
               let disparoJugador = tablero.recibirDisparo(i,j);
               if (disparoJugador === "repetido") {
                mostrarMensajeFlotante("Ya has disparado a esta posición", "warning");
               }
               if (disparoJugador === "hundido") {
                mostrarMensajeFlotante("¡Hundido! Has destruido un barco enemigo", "success");
            }
               if(tablero.comprobarEstadoPartida()) {
                hasGanado();
                partidaTerminada = true;
               }
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



/* -------------------------------------------- */

function actualizarIndicadorTurno() {
    const indicador = document.getElementById('indicador-turno');
    indicador.textContent = `Turno: ${turnoJugador ? 'Jugador' : 'IA'}`;
}

/*-------------------------- Ventana emergente final ----------------------------*/
// Esta función muestra la ventana emergente final si se ha ganado
function hasGanado() {
    const hasGanado = document.getElementById("hasGanado");
    hasGanado.showModal();

    bloquearScroll();
}

// Esta función muestra la ventana emergente final si se ha perdido
function gameOver() {
    const gameOver = document.getElementById("gameOver");
    gameOver.showModal();
    bloquearScroll();
}

// Esta función cierra la ventana emergente
function closeModal(id) {
    const dialog = document.getElementById(id);
    dialog.close();
    document.body.classList.remove("bloquear-scroll");
}

// Esta función bloqueo el scroll de la página
function bloquearScroll() {
    window.scrollTo(0, 0);
    document.body.classList.add("bloquear-scroll");
}

window.closeModal = closeModal;


// ------------  Función para mostrar mensajes flotantes   -----------------
function mostrarMensajeFlotante(mensaje, tipo) {
    // Crear el elemento del mensaje
    const mensajeEl = document.createElement('div');
    mensajeEl.className = `mensaje-flotante ${tipo}`;
    mensajeEl.textContent = mensaje;
    
    // Añadir al DOM
    document.body.appendChild(mensajeEl);
    
    // Mostrar con animación
    setTimeout(() => {
        mensajeEl.classList.add('visible');
    }, 10);
    
    // Eliminar después de un tiempo
    setTimeout(() => {
        mensajeEl.classList.remove('visible');
        setTimeout(() => {
            document.body.removeChild(mensajeEl);
        }, 500);
    }, 3000);
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
        mostrarMensajeFlotante(`Partida guardada con ID: ${data.id}`, "success");
        console.log("Partida guardada con éxito:", data);
        return data.id; // ID de la partida
    } catch (err) {
        console.error("Error:", err);
        mostrarMensajeFlotante("Error al guardar la partida", "error");
    }
}


async function cargarPartida(idPartida) {
    try {
        const response = await fetch(`http://localhost:3000/partidas/${idPartida}`);
        if (!response.ok) throw new Error("No se encontró la partida");

        const data = await response.json();
        console.log("Partida cargada:", data);
        mostrarMensajeFlotante("Partida cargada con éxito", "success");
        return data;
    } catch (err) {
        console.error("Error:", err);
        mostrarMensajeFlotante("Error al cargar la partida", "error");
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
let tablero = new Tablero('Jugador', 10);
tablero.tamaño = tableroJugador.tamaño;
tablero.celdas = tableroJugador.celdas;
tablero.barcos = tableroJugador.barcos;
console.log("Tablero 1 (jugador):");
console.log(tablero);
let contenedor1 = document.getElementById('tablero1');

// Llamada a la función para mostrar el tablero en HTML
mostrarTableroHTML(tablero,contenedor1);

// TABLERO #2
let tablero2 = new Tablero('IA', 10);
tablero2.tamaño = tableroIA.tamaño;
tablero2.celdas = tableroIA.celdas;
tablero2.barcos = tableroIA.barcos;
console.log("Tablero 2 (IA):");
console.log(tablero2);
let contenedor2 = document.getElementById('tablero2');

// Llamada a la función para mostrar el tablero de la IA
mostrarTableroHTML(tablero2,contenedor2, false);

}



/* ------------------------------------------------------------------------------------------------------- */


