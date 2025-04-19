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
        console.log("ypoooo",barcoSelec)
        let barco = new Barco(barcoSelec.name, barcoSelec.size);
            let barcoColocado = false;

                let hayEspacio = this.verificarEspacio(barco, orientacion, fila, columna);

                if (hayEspacio) {
                    this.colocarBarco(barco, orientacion, fila, columna);
                    // Añadir el nuevo barco a la lista de barcos del tablero
                    this.barcos.push(barco);
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
            this.celdas[fila][columna + i].estado = "ocupada";
            this.celdas[fila][columna + i].nombreBarco = barco.nombre;
            barco.posiciones.push({x: fila, y: columna + i});
            barco.orientacion = "H";

            if (esPortaaviones) {
                this.celdas[fila + 1][columna + i].ocupada = true;
                this.celdas[fila + 1][columna + i].estado = "ocupada";
                this.celdas[fila + 1][columna + i].nombreBarco = barco.nombre;
            }
        }
     } else  {
            for (let j = 0; j < barco.tamaño; j++) {
             this.celdas[fila + j][columna].ocupada = true;
             this.celdas[fila + j][columna].estado = "ocupada";
             this.celdas[fila + j][columna].nombreBarco = barco.nombre;
             barco.posiciones.push({x: fila + j, y: columna});   
             barco.orientacion = "V";
             
             if (esPortaaviones) {
                this.celdas[fila + j][columna + 1].ocupada = true;
                this.celdas[fila + j][columna + 1].estado = "ocupada";
                this.celdas[fila + j][columna + 1].nombreBarco = barco.nombre;
            }
                
            }
        }
    }

    numeroRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    recibirDisparoOLD(fila, columna) {

        if ((fila <= 9 && fila >= 0) && (columna <= 9 && columna >= 0)) {
            const celda = this.celdas[fila][columna];
            
            if (celda.estado === "agua" || celda.estado === "tocado" || celda.estado === "hundido") {
                return "repetido"; // Ya disparado aquí
            }

            if (this.celdas[fila][columna].ocupada) {
                this.celdas[fila][columna].impactada = true;
                this.celdas[fila][columna].estado = "tocado";
                alert("Tocado!");
                for (let barco of this.barcos) {
                   // console.log(barco)
                    let tocados = 0;
                    if (barco.nombre == this.celdas[fila][columna].nombreBarco) {

                        if (barco.orientacion == 'H') {
                            // HORIZONTAL
                            
                            for (let i = barco.posiciones[0].y; i <=barco.posiciones[barco.tamaño - 1].y; i++) {
                                fila = barco.posiciones[0].x;
                                if (this.celdas[barco.posiciones[0].x][i].impactada == true) {
                                    console.log("Tocados actuales: ",tocados);
                                    tocados++;
                                }

                            }
                           // console.log(barco.tamaño);
                            if (tocados == barco.tamaño) {
                                alert("Hundido")
                                barco.hundido = true;
                                for (let i = barco.posiciones[0].y; i <=barco.posiciones[barco.tamaño - 1].y; i++) {
                                    if (this.celdas[barco.posiciones[0].x][i].impactada == true) {
                                        this.celdas[barco.posiciones[0].x][i].barcoHundido = true;
                                        this.celdas[barco.posiciones[0].x][i].estado = "hundido";
                                    }
    
                                }

                            };
                            console.log("Posiciones tocadas", tocados)


                        } else {
                            // VERTICAL
                             
                            for (let i = barco.posiciones[0].x; i <=barco.posiciones[barco.tamaño - 1].x; i++) {
                                fila = barco.posiciones[0].x;
                                if (this.celdas[i][barco.posiciones[0].y].impactada == true) {
                                    console.log("Tocados actuales: ",tocados);
                                    tocados++;
                                }

                            }
                           // console.log(barco.tamaño);
                            if (tocados == barco.tamaño) {
                                alert("Hundido")
                                barco.hundido = true;
                                for (let i = barco.posiciones[0].x; i <=barco.posiciones[barco.tamaño - 1].x; i++) {
                                    if (this.celdas[i][barco.posiciones[0].y].impactada == true) {
                                        this.celdas[i][barco.posiciones[0].y].barcoHundido = true;
                                        this.celdas[i][barco.posiciones[0].y].estado = "hundido";
                                    }
    
                                }

                            };

                        }
                    }
                }


            } else {
                alert("Agua!")
                this.celdas[fila][columna].estado = "agua"


            }
            

        }

        this.comprobarEstadoPartida();

    }


    recibirDisparo(fila, columna) {
        let resultado = "agua"; // Por defecto
    
        if ((fila <= 9 && fila >= 0) && (columna <= 9 && columna >= 0)) {
            const celda = this.celdas[fila][columna];
    
            if (celda.estado === "agua" || celda.estado === "tocado" || celda.estado === "hundido") {
                return "repetido"; // Ya disparado aquí
            }
    
            if (celda.ocupada) {
                celda.impactada = true;
                celda.estado = "tocado";
                resultado = "tocado";
    
                for (let barco of this.barcos) {
                    if (barco.nombre === celda.nombreBarco) {
                        let tocados = 0;

                        for (let pos of barco.posiciones) {
                            if (this.celdas[pos.x][pos.y].impactada) {
                                tocados++;
                            }
                        }
    
                        if (tocados === barco.tamaño) {
                            resultado = "hundido";
                            barco.hundido = true;
    
                            for (let pos of barco.posiciones) {
                                const c = this.celdas[pos.x][pos.y];
                                c.barcoHundido = true;
                                c.estado = "hundido";
                            }
                        }
                    }
                }
            } else {
                celda.estado = "agua";
            }
        }
    
        this.comprobarEstadoPartida();
        return resultado;
    }




    comprobarEstadoPartida() {
    
        let numBarcos = this.barcos.length;
        console.log(numBarcos);
        let barcosHundidos = 0;
        for (let barco of this.barcos) {
            if(barco.hundido == true) {
                barcosHundidos++;
            }

        }
        if(barcosHundidos==numBarcos) alert ("FINAL DE LA PARTIDA. TOTS ELS BARCOS ENFONSATS!")
        
    }

    generarAtaqueIA() {
        // 1. Buscar si hay un "tocado" no hundido y disparar cerca
        for (let i = 0; i < this.tamaño; i++) {
            for (let j = 0; j < this.tamaño; j++) {
            const celda = this.celdas[i][j];
                if(celda.estado == "tocado") {
                const adyacentes = this.obtenerAdyacentes({ x: i, y: j });   
                for (let ady of adyacentes) {
                    const res = this.recibirDisparo(ady.x, ady.y);
                    if (res !== "repetido") return; //  Disparó, fin del turno
                }
                }
            }
        }

        // 2. Si no hay tocados, hacer disparo aleatorio único
        let x, y, res;
        do {
            x = Math.floor(Math.random() * this.tamaño);
            y = Math.floor(Math.random() * this.tamaño);
            res = this.recibirDisparo(x, y);
        } while (res === "repetido"); // Solo repite si ya disparó ahí

        // 🔸 Fin del turno aunque sea agua
}


    obtenerAdyacentes(pos) {
        const ady = [
            { x: pos.x + 1, y: pos.y },
            { x: pos.x - 1, y: pos.y },
            { x: pos.x, y: pos.y + 1 },
            { x: pos.x, y: pos.y - 1 },
        ];
        let disponibles = [];

        for (let i = 0; i < ady.length; i++) {
            let p = ady[i];
            
            if (this.enRango(p.x, p.y)) {
                let estado = this.celdas[p.x][p.y].estado;
                if (estado !== "agua" && estado !== "tocado" && estado !== "hundido") {
                    disponibles.push(p);
                }
            }
        }

        return disponibles;
    }

    enRango(x, y) {
        return x >= 0 && x < this.tamaño && y >= 0 && y < this.tamaño;
    }


    /***
 * 
 *      0   1   2   3   4   5   6   7   8   9     X
 *  0   -   -   -   -   -   -   -   -   -   -
 *  1   -   -   -   -   t   -   -   -   -   -
 *  2   -   -   -   -   -   -   -   -   -   -   
 *  3   t   -   -   -   -   -   -   -   -   -
 *  4   -   -   -   -   -   -   -   -   -   -
 *  5   -   -   -   -   -   -   -   -   -   -
 *  6   -   -   -   -   -   -   -   -   -   -
 *  7   -   -   -   -   -   -   -   -   -   -
 *  8   -   -   -   -   -   -   -   -   -   -
 *  9   -   -   -   -   -   -   t   -   -   -
 *  
 *  Y
 */


}