import { Tablero } from "./Tablero.js";
import { Celda } from "./Celda.js";

export class Barco {
    nombre;
    tamaño;
    posiciones;
    orientacion;
    hundido;

    constructor(nombre, tamaño, posiciones, orientacion) {
        this.nombre = nombre;
        this.tamaño = tamaño;
        this.posiciones = [];
        this.orientacion = "";
        this.hundido  = false;
    }
}