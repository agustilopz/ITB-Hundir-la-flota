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

let listaBarcos = JSON.parse(jsonBarcos);

console.log("Lista barcos convertida del JSON:" + listaBarcos);

let tablero = new Tablero(10);
console.log(tablero);


//console.log(Math.random() < 0.5 ? 'H' : 'V');

console.log(Math.floor(Math.random() * 10));

tablero.guardarBarcos(listaBarcos);
tablero.posicionarBarcos();

console.log(tablero);

function imprimirTablero(tablero) {
    let contenedor = document.getElementById('tablero');

    contenedor.innerHTML = '';

    for (let i = 0; i < tablero.tamaño; i++) {
        for (let j = 0; j < tablero.tamaño; j++) {
            let celda = tablero.celdas[i][j];
            let clase = celda.ocupada ? 'ocupada' : 'vacía'; // Dependiendo de si está ocupada o no, le asignamos una clase
            let celdaDiv = document.createElement('div');
            celdaDiv.classList.add('celda', clase);
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

// Llamada a la función para mostrar el tablero en HTML
imprimirTablero(tablero);



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