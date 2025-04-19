export class Barco {
    nombre;
    tamaño;
    posiciones;
    orientacion;
    colocado;
    hundido;

    constructor(nombre, tamaño) {
        this.nombre = nombre;
        this.tamaño = tamaño;
        this.posiciones = [];
        this.orientacion = "";
        this.hundido  = false;
        this.colocado  = false;
    }
}