import { Tablero } from "./Tablero.js";

let jsonBarcosOLD = `[
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`;

let jsonBarcos = `[
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`;

// Variables globales
let barcoSeleccionado = null;
let posicionamentBarco = 'V';

let listaBarcos = JSON.parse(jsonBarcos);


// TABLERO #1

let tablero = new Tablero(10);

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
mostrarTableroHTML(tablero2, contenedor2);


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

function disparoIA(){
    console.log("boton ia presionado")
tablero.generarAtaqueIA();
mostrarTableroHTML(tablero, contenedor1);


}

// Hacerla accesible globalmente
window.disparoIA = disparoIA;

//


function mostrarTableroHTML(tablero, contenedor) {

    contenedor.innerHTML = '';

    for (let i = 0; i < tablero.tamaño; i++) {
        for (let j = 0; j < tablero.tamaño; j++) {
            let celda = tablero.celdas[i][j];
            let clase = celda.ocupada ? 'ocupada' : 'vacía'; // Dependiendo de si está ocupada o no, le asignamos una clase
            let celdaDiv = document.createElement('div');
            celdaDiv.classList.add('celda', clase);
            celdaDiv.classList.add('celda', celda.estado)

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
                mostrarTableroHTML (tablero, contenedor);
                }
                console.log(barcoSeleccionado)
            });


            // Si la celda está ocupada por un barco, mostrar la inicial del barco
            if (celda.nombreBarco) {
                celdaDiv.textContent = celda.nombreBarco[0]; // Muestra la inicial del nombre del barco
            }

            // Añadir el div de la celda al contenedor
            contenedor.appendChild(celdaDiv);
        }
    }
}


