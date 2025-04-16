import { Tablero } from "./Tablero.js";
import { Barco } from "./Barco.js";

export class Celda {
    x;
    y;
    ocupada;
    impactada;
    barcoHundido;
    nombreBarco;
    estado;

    constructor(x, y, ocupada, impactada, nombreBarco) {
        this.x = x;
        this.y = y;
        this.ocupada = false;
        this.impactada = false;
        this.barcoHundido = false;
        this.nombreBarco = "";
        this.estado = "vacía";
    }
}