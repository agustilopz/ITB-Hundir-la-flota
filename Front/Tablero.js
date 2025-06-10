import { Celda } from "./Celda.js";
import { Barco } from "./Barco.js";

export class Tablero {
    nombreJugador;
    tamaño;
    celdas;
    barcos;

    constructor(nombreJugador, tamaño) {
        this.nombreJugador = nombreJugador;
        this.tamaño = tamaño;
        this.celdas = [];
        this.barcos = [];
        this.crearTablero();
    }

    // Crea un tablero virtual al inicializar un objeto de esta clase
    crearTablero() {
        for (let i = 0; i < this.tamaño; i++) {
            this.celdas[i] = [];
            for (let j = 0; j < this.tamaño; j++) {
                this.celdas[i][j] = new Celda(i, j);
            }
        }

    }

    // Guarda la lista de barcos pasada dentro de la propiedad barcos del tablero
    guardarBarcos(listaBarcos) {
        this.barcos = listaBarcos.map(barco => new Barco(barco.name, barco.size))
    }

    // Posiciona todos los barcos de forma aleatoria (tablero IA)
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

    // Posiciona el barco pasado por parametro de forma manual (tablero jugador)
    posicionarBarco(orientacion, fila, columna, barcoSelec) {
        let barco;
        for (let b of this.barcos) {
            if(b.nombre == barcoSelec.name) {
                barco = b;
            }

        }
        //let barco = new Barco(barcoSelec.name, barcoSelec.size);
            let barcoColocado = false;

                let hayEspacio = this.verificarEspacio(barco, orientacion, fila, columna);

                if (hayEspacio) {
                    this.colocarBarco(barco, orientacion, fila, columna);
                    // Añadir el nuevo barco a la lista de barcos del tablero
                    //this.barcos.push(barco);
                    barcoColocado = true;
                } else {
                    barcoColocado = false;
                }
            
                return barcoColocado;
    }


    todosLosBarcosColocados() {
        let barcosTotales = this.barcos.length;
        let barcosColocados = 0;
        for (let barco of this.barcos) {
            if(barco.colocado) barcosColocados++;

        }

        return barcosColocados === barcosTotales;
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
    

// Coloca el barco en la posición indicada
    colocarBarco(barco, orientacion, fila, columna) {
        let esPortaaviones = barco.nombre === "Portaaviones";
        if(orientacion === "H") {
            for (let i = 0; i < barco.tamaño; i++) {
            this.celdas[fila][columna + i].ocupada = true;
            this.celdas[fila][columna + i].estado = "ocupada";
            this.celdas[fila][columna + i].nombreBarco = barco.nombre;
            barco.posiciones.push({x: fila, y: columna + i});
            barco.colocado = true;
            barco.orientacion = "H";

            if (esPortaaviones) {
                this.celdas[fila + 1][columna + i].ocupada = true;
                this.celdas[fila + 1][columna + i].estado = "ocupada";
                this.celdas[fila + 1][columna + i].nombreBarco = barco.nombre;
                // Añadir también la segunda fila a las posiciones del barco
                barco.posiciones.push({x: fila + 1, y: columna + i});
                barco.colocado = true;

            }
        }
     } else  {
            for (let j = 0; j < barco.tamaño; j++) {
             this.celdas[fila + j][columna].ocupada = true;
             this.celdas[fila + j][columna].estado = "ocupada";
             this.celdas[fila + j][columna].nombreBarco = barco.nombre;
             barco.posiciones.push({x: fila + j, y: columna});   
             barco.colocado = true;
             barco.orientacion = "V";
             
             if (esPortaaviones) {
                this.celdas[fila + j][columna + 1].ocupada = true;
                this.celdas[fila + j][columna + 1].estado = "ocupada";
                this.celdas[fila + j][columna + 1].nombreBarco = barco.nombre;
                // Añadir también la segunda columna a las posiciones del barco
                barco.posiciones.push({x: fila + j, y: columna + 1});
                barco.colocado = true;

            }
                
            }
        }
    }

    numeroRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Recibe un disparo en la celda indicada y devuelve el resultado del disparo
    recibirDisparo(fila, columna) {
        let resultado = "agua"; // Por defecto
    
        if ((fila <= 9 && fila >= 0) && (columna <= 9 && columna >= 0)) {
            const celda = this.celdas[fila][columna];
    
            if (celda.estado === "agua" || celda.estado === "tocado" || celda.estado === "hundido") {
                return "repetido"; // Ya ha disparado aquí
            }
    
            if (celda.ocupada) {
                celda.impactada = true;
                celda.estado = "tocado";
                resultado = "tocado";
    
                for (let barco of this.barcos) {
                    if (barco.nombre === celda.nombreBarco) {
                        let tocados = 0;
                        let totalPosiciones = barco.posiciones.length;

                        for (let pos of barco.posiciones) {
                            if (this.celdas[pos.x][pos.y].impactada) {
                                tocados++;
                            }
                        }
    
                        // Si todas las celdas están tocadas, el barco está hundido
                        if (tocados === totalPosiciones) {
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
    
        return resultado;
    }



// Comprueba si ya se han hundido todos los barcos de este tablero
    comprobarEstadoPartida() {

        let numBarcos = this.barcos.length;
        console.log(numBarcos);
        let barcosHundidos = 0;
        for (let barco of this.barcos) {
            if (barco.hundido == true) {
                barcosHundidos++;
            }
        }
        if (barcosHundidos == numBarcos) {
            return true;
            // Final Partida
        }
        return false;

    }



    generarAtaqueIA() {
        // 1. Buscar si hay un "tocado" no hundido y disparar cerca
        for (let i = 0; i < this.tamaño; i++) {
            for (let j = 0; j < this.tamaño; j++) {
                const celda = this.celdas[i][j];
                if (celda.estado == "tocado" && !celda.barcoHundido) {
                    const adyacentes = this.obtenerAdyacentes({ x: i, y: j });
                    for (let ady of adyacentes) {
                        const res = this.recibirDisparo(ady.x, ady.y);
                        if (res !== "repetido") {
                            return res; // Devuelve el resultado del disparo
                        }
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

        // Fin del turno aunque sea agua
        return res;
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

}