import { Tablero } from "./Tablero.js";
import { Celda } from "./Celda.js";
import { Barco } from "./Barco.js";

let jsonBarcos = `[
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`;

let barcoSeleccionado = null;
let posicionamentBarco = 'V';

let listaBarcos = JSON.parse(jsonBarcos);

console.log("Lista barcos convertida del JSON:" + listaBarcos);

let tablero = new Tablero(10);
console.log(tablero);


//console.log(Math.random() < 0.5 ? 'H' : 'V');

console.log(Math.floor(Math.random() * 10));

//tablero.guardarBarcos(listaBarcos);
//tablero.posicionarBarcosAleatorio();

console.log(tablero);

function imprimirTablero(tablero, contenedor) {

    contenedor.innerHTML = '';

    for (let i = 0; i < tablero.tamaño; i++) {
        for (let j = 0; j < tablero.tamaño; j++) {
            let celda = tablero.celdas[i][j];
            let clase = celda.ocupada ? 'ocupada' : 'vacía'; // Dependiendo de si está ocupada o no, le asignamos una clase
            let celdaDiv = document.createElement('div');
            celdaDiv.classList.add('celda', clase);

            celdaDiv.addEventListener("click", function(event) {
                if(barcoSeleccionado===null) {
                    alert("No has seleccionado ningún barco")
                } else {
                console.log(`Fila ${i}, columna ${j}`);
                tablero.posicionarBarco(posicionamentBarco,i,j,barcoSeleccionado);
                barcoSeleccionado = null;
                imprimirTablero(tablero, contenedor);
                }
            });


            //celdaDiv.dataset.x = celda.x;
            //celdaDiv.dataset.y = celda.y;

            // Si la celda está ocupada por un barco, mostrar la inicial del barco
            if (celda.nombreBarco) {
                celdaDiv.textContent = celda.nombreBarco[0]; // Muestra la inicial del nombre del barco
            }

            // Añadir el div de la celda al contenedor
            contenedor.appendChild(celdaDiv);
        }
    }
}

let contenedor1 = document.getElementById('tablero1');


// Llamada a la función para mostrar el tablero en HTML
imprimirTablero(tablero,contenedor1);

let contenedorBarcos = document.getElementById('barcos');
for(let barco of listaBarcos) {
    //let boton = `<button id="${barco.name.toLowerCase()}">${barco.name}-${barco.size}</button>`;

    let boton = document.createElement('button');
    boton.id = barco.name.toLowerCase();
    boton.textContent = `${barco.name}-${barco.size}`;
    boton.addEventListener("click", function() {
        alert("CLICKKKK");
        barcoSeleccionado=barco;
        boton.disabled=true;
    })
    
    contenedorBarcos.appendChild(boton);

}

document.addEventListener("keypress", function(event){

    if(event.key === "R" || event.key === "r") {
        if(posicionamentBarco==='V') {
            posicionamentBarco='H';
        } else {
            posicionamentBarco='V';
        }
        alert(posicionamentBarco);
    }
})



/***
 * 
 * 
 *      0   1   2   3   4   5   6   7   8   9
 *  0   -   -   -   -   -   -   -   -   -   -
 *  1   -   -   -   -   -   -   -   -   -   -
 *  2   -   -   -   -   -   -   -   -   -   -   
 *  3   -   -   -   -   -   -   -   -   -   -
 *  4   -   -   -   -   -   -   -   -   -   -
 *  5   -   -   -   -   -   -   -   -   -   -
 *  6   -   -   -   -   -   -   -   -   -   -
 *  7   -   -   -   -   -   -   -   -   -   -
 *  8   -   -   -   -   -   -   -   -   -   -
 *  9   -   -   -   -   -   -   -   -   -   -
 * 
 * 
 */
let contenedor2 = document.getElementById('tablero2');
let tablero2 = new Tablero(10);


tablero2.guardarBarcos(listaBarcos);
tablero2.posicionarBarcosAleatorio();

console.log(tablero);

// Llamada a la función para mostrar el tablero en HTML
imprimirTablero(tablero2, contenedor2);