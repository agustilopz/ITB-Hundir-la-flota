import { Celda } from "./Celda.js";
import { Barco } from "./Barco.js";

export class Tablero {
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

    posicionarBarcosAleatorio() {
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

    posicionarBarco(orientacion, fila, columna, barcoSelec) {
        let barco = new Barco(barcoSelec.name, barcoSelec.size);
            let barcoColocado = false;

                let hayEspacio = this.verificarEspacio(barco, orientacion, fila, columna);

                if (hayEspacio) {
                    this.colocarBarco(barco, orientacion, fila, columna);
                    barcoColocado = true;
                } else {
                    barcoColocado = false;
                    alert("No hay suficiente espacio para colocar este barco!"); 
                }
            
                return barcoColocado;
    }

    verificarEspacioOLD(barco, orientacion, fila, columna) {

        let esPortaaviones = barco.nombre === "Portaaviones";

        if (orientacion === "H") {
            if (columna + barco.tamaño > this.tamaño || (esPortaaviones && fila + 1 >= this.tamaño)) {
                return false;
            }

            for (let i = 0; i < barco.tamaño; i++) {
                if (this.celdas[fila][columna + i].ocupada || (esPortaaviones && this.celdas[fila + 1][columna + i].ocupada)) {
                    return false;
                }
            }

        } else if (orientacion === "V") {
            if (fila + barco.tamaño > this.tamaño || (esPortaaviones && columna + 1 >= this.tamaño)) {
                return false;
            }

            for (let j = 0; j < barco.tamaño; j++) {
                if (this.celdas[fila + j][columna].ocupada || (esPortaaviones && this.celdas[fila + j][columna + 1].ocupada)) {
                    return false;
                }
            }
        }

        return true;

    }

    verificarEspacio(barco, orientacion, fila, columna) {
        const esPortaaviones = barco.nombre === "Portaaviones";
    
        const comprobarZona = (x, y) => {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    let nx = x + dx;
                    let ny = y + dy;
                    if (nx >= 0 && ny >= 0 && nx < this.tamaño && ny < this.tamaño) {
                        if (this.celdas[nx][ny].ocupada) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
    
        if (orientacion === "H") {
            if (columna + barco.tamaño > this.tamaño || (esPortaaviones && fila + 1 >= this.tamaño)) {
                return false;
            }
    
            for (let i = 0; i < barco.tamaño; i++) {
                if (!comprobarZona(fila, columna + i)) return false;
                if (esPortaaviones && !comprobarZona(fila + 1, columna + i)) return false;
            }
    
        } else if (orientacion === "V") {
            if (fila + barco.tamaño > this.tamaño || (esPortaaviones && columna + 1 >= this.tamaño)) {
                return false;
            }
    
            for (let j = 0; j < barco.tamaño; j++) {
                if (!comprobarZona(fila + j, columna)) return false;
                if (esPortaaviones && !comprobarZona(fila + j, columna + 1)) return false;
            }
        }
    
        return true;
    }
    


    colocarBarco(barco, orientacion, fila, columna) {
        let esPortaaviones = barco.nombre === "Portaaviones";
        if(orientacion === "H") {
            for (let i = 0; i < barco.tamaño; i++) {
            this.celdas[fila][columna + i].ocupada = true;
            this.celdas[fila][columna + i].nombreBarco = barco.nombre;
            barco.posiciones.push({x: fila, y: columna + i});

            if (esPortaaviones) {
                this.celdas[fila + 1][columna + i].ocupada = true;
                this.celdas[fila + 1][columna + i].nombreBarco = barco.nombre;
            }
        }
     } else  {
            for (let j = 0; j < barco.tamaño; j++) {
             this.celdas[fila + j][columna].ocupada = true;
             this.celdas[fila + j][columna].nombreBarco = barco.nombre;
             barco.posiciones.push({x: fila + j, y: columna});   
             
             if (esPortaaviones) {
                this.celdas[fila + j][columna + 1].ocupada = true;
                this.celdas[fila + j][columna + 1].nombreBarco = barco.nombre;
            }
                
            }
        }
    }

    numeroRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}