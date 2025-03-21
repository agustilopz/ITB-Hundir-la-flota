let jsonBarcos = `[
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`;

let listaBarcos = JSON.parse(jsonBarcos);

console.log("Lista barcos convertida del JSON:" + listaBarcos);



console.log("Tablero:");

class Tablero {
    tamaño;
    celdas;
    barcos;

    constructor(tamaño, celdas, barcos) {
        this.tamaño = tamaño;
        this.celdas = [];
        this.barcos = [];
        this.crearTablero();
    }

    crearTablero() {
        for (let i = 0; i < this.tamaño; i++) {
            this.celdas[i] = [];
            for (let j = 0; j < this.tamaño; j++) {
                this.celdas[i][j] = new Celda(i, j);
            }
        }

    }

    guardarBarcos(listaBarcos) {
        this.barcos = listaBarcos.map(barco => new Barco(barco.name, barco.size))
    }

    posicionarBarcos() {
        for (let barco of this.barcos) {
            let barcoColocado = false;

            while (!barcoColocado) {
                let orientacion = Math.random() < 0.5 ? "H" : "V";
                let fila = this.numeroRandom(0, this.tamaño - 1);
                let columna = this.numeroRandom(0, this.tamaño - 1);

                let hayEspacio = this.verificarEspacio(barco, orientacion, fila, columna);

                if (hayEspacio) {
                    this.colocarBarco(barco, orientacion, fila, columna);
                    barcoColocado = true;
                }
            }

        }

    }

    verificarEspacio(barco, orientacion, fila, columna) {
        if (orientacion === "H") {
            if (columna + barco.tamaño > this.tamaño) {
                return false;
            }

            for (let i = 0; i < barco.tamaño; i++) {
                if (this.celdas[fila][columna + i].ocupada) {
                    return false;
                }
            }

        } else if (orientacion === "V") {
            if (fila + barco.tamaño > this.tamaño) {
                return false;
            }

            for (let j = 0; j < barco.tamaño; j++) {
                if (this.celdas[fila + j][columna].ocupada) {
                    return false;
                }
            }
        }

        return true;

    }

    colocarBarco(barco, orientacion, fila, columna) {
        if(orientacion === "H") {
            for (let i = 0; i < barco.tamaño; i++) {
            this.celdas[fila][columna + i].ocupada = true;
            this.celdas[fila][columna + i].nombreBarco = barco.nombre;
            barco.posiciones.push({x: fila, y: columna + i});
        }
     } else  {
            for (let j = 0; j < barco.tamaño; j++) {
             this.celdas[fila + j][columna].ocupada = true;
             this.celdas[fila + j][columna].nombreBarco = barco.nombre;
             barco.posiciones.push({x: fila + j, y: columna});       
                
            }
        }
    }

    numeroRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}

class Celda {
    x;
    y;
    ocupada;
    impactada;
    nombreBarco;

    constructor(x, y, ocupada, impactada, nombreBarco) {
        this.x = x;
        this.y = y;
        this.ocupada = false;
        this.impactada = false;
        this.nombreBarco = "";
    }
}

class Barco {
    nombre;
    tamaño;
    posiciones;

    constructor(nombre, tamaño, posiciones) {
        this.nombre = nombre;
        this.tamaño = tamaño;
        this.posiciones = [];
    }
}


/*
function crearTablero() {
    let tablero  = [];
    for(let i =1; i<=10;i++) {
       // console.log("i: " + i)
       //tablero.push(`f${i}`);
       tablero[i - 1] = [];
        for(let j = 1; j<=10; j++){
            console.log(`Fila f${i}, columna c${j}`);
            tablero[i-1].push(`f${i}c${j}`);
        }
    }
    console.log(tablero);

}
crearTablero();
*/

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