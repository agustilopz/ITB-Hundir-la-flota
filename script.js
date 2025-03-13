let listaBarcos = [
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
];
 
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
        for(let i = 0; i<this.tamaño; i++) {
            this.celdas[i] = [];
            for(let j = 0; j<this.tamaño; j++) {
                this.celdas[i][j] = new Celda(i,j);
            }
        }

    }

    guardarBarcos() {

    }

    posicionarBarcos() {

    }

    verificarEspacio() {

    }


}

class Celda {
    x;
    y;
    ocupada;
    impactada;
    nombreBarco;

    constructor(x,y,ocupada,impactada,nombreBarco) {
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
        this.posiciones = posiciones;
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


