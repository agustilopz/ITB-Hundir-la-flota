import { Tablero } from "./Tablero.js";
import { Celda } from "./Celda.js";
import { Barco } from "./Barco.js";

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

console.log("Lista barcos convertida del JSON:" + listaBarcos);

let tablero = new Tablero(10);


console.log(Math.floor(Math.random() * 10));
console.log("Tablero 1 (jugador):");

console.log(tablero);

//tablero.guardarBarcos(listaBarcos);

function imprimirTablero(tablero, contenedor) {

    contenedor.innerHTML = '';

    for (let i = 0; i < tablero.tamaño; i++) {
        for (let j = 0; j < tablero.tamaño; j++) {
            let celda = tablero.celdas[i][j];
            let clase = celda.ocupada ? 'ocupada' : 'vacía'; // Dependiendo de si está ocupada o no, le asignamos una clase
            //let clase2 = celda.impactada ? 'impactada': 'no-impactada';
            //let clase3 = celda.barcoHundido ? 'hundido': 'no-hundido';
            let celdaDiv = document.createElement('div');
            celdaDiv.classList.add('celda', clase);
            //celdaDiv.classList.add('celda', clase2);
            //celdaDiv.classList.add('celda', clase3);
            celdaDiv.classList.add('celda', celda.estado)

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
                imprimirTablero(tablero, contenedor);
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
        alert("Has seleccionado el " + barco.name);
        barcoSeleccionado=barco;
        boton.disabled=true;
    })
    console.log(barcoSeleccionado);
    
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


let contenedor2 = document.getElementById('tablero2');
let tablero2 = new Tablero(10);


tablero2.guardarBarcos(listaBarcos);
tablero2.posicionarBarcosAleatorio();

console.log("Tablero 2 (IA):");
console.log(tablero2);

// Llamada a la función para mostrar el tablero de la IA
imprimirTablero(tablero2, contenedor2);


let formulario= document.getElementById('disparosUsuario');
formulario.addEventListener('submit', function(event) {
    event.preventDefault();


    let formData = new FormData(formulario);

    let x = formData.get('x');
    let y = formData.get('y');

    console.log('X: ', x);
    console.log('Y: ', y);

    tablero2.recibirDisparo(x,y);
    imprimirTablero(tablero2, contenedor2);

})




//tablero2.recibirDisparo(1,2);
//tablero2.recibirDisparo(0,2);
//tablero2.recibirDisparo(2,3);
//tablero2.recibirDisparo(3,5);


function disparoIA(){
    console.log("boton ia presionado")
tablero.generarAtaqueIA();
imprimirTablero(tablero, contenedor1);


}

// Hacerla accesible globalmente
window.disparoIA = disparoIA;

