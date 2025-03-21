import { Tablero } from "./Tablero.js";
import { Celda } from "./Celda.js";

export class Barco {
    nombre;
    tamaño;
    posiciones;

    constructor(nombre, tamaño, posiciones) {
        this.nombre = nombre;
        this.tamaño = tamaño;
        this.posiciones = [];
    }
}