export class Celda {
    x;
    y;
    ocupada;
    impactada;
    barcoHundido;
    nombreBarco;
    estado;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ocupada = false;
        this.impactada = false;
        this.barcoHundido = false;
        this.nombreBarco = "";
        this.estado = "vacía";
    }
}