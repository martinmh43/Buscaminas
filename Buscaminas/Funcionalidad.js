var vidas = 3;
const tam = 10;
let tablero = [[]];

function inicializarTablero() {
    var grid = document.getElementById('grid');

    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            var casilla = document.createElement('div');
            casilla.className = 'casilla';
            casilla.id = i + '-' + j;
            casilla.addEventListener('click', function(event) {
                var coordenadas = event.target.id.split('-');
                clickar(parseInt(coordenadas[0]), parseInt(coordenadas[1]));
            });
            grid.appendChild(casilla);
        }
    }

    crear();
}

function crear() {
    tablero = []; 
    for (var i = 0; i < tam; i++) {
        tablero[i] = [];
        for (var j = 0; j < tam; j++) {
            if (Math.round(Math.random() * 4) == 1) {
                tablero[i][j] = -1;
            } else {
                tablero[i][j] = 0;
            }
        }
    }
}

function clickar(row, col) {
    var casilla = document.getElementById(row + '-' + col);
    var mensaje = document.getElementById('mensaje');
    var vidasSpan = document.getElementById('vidasRestantes');

    if (vidas > 0) { 
        if (tablero[row][col] == -1) {
            vidas--;
            vidasSpan.textContent = vidas;
            mensaje.textContent = "Has perdido una vida debido a una bomba";
            casilla.textContent = '💣'; 
            if (vidas == 0) {
                revelarTablero();
                mensaje.textContent = "Has perdido, looser de secano";
            }
        } else {
            var numBombasAdyacentes = casillasAdyacentes(row, col);
            if (numBombasAdyacentes == 0) {
                casilla.classList.add('cero'); 
                revelarCasillas(row, col);
            } else {
                casilla.textContent = numBombasAdyacentes; 
                mensaje.textContent = "Casillas adyacentes con bomba: " + numBombasAdyacentes;
            }
        }
    }
}

function casillasAdyacentes(row, col) {
    var n = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var numRow = row + i;
            var numCol = col + j;
            if (numRow >= 0 && numRow < tam && numCol >= 0 && numCol < tam) {
                if (tablero[numRow][numCol] == -1) {
                    n++;
                }
            }
        }
    }
    return n;
}

function revelarCasillas(row, col) {
    if (row < 0 || row >= tam || col < 0 || col >= tam || tablero[row][col] !== 0) {
        return; 
    }
    var casilla = document.getElementById(row + '-' + col);
    casilla.textContent = ''; 
    tablero[row][col] = -2; 

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            revelarCasillas(row + i, col + j);
        }
    }
}

function revelarTablero() {
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            if (tablero[i][j] == -1) {
                document.getElementById(i + '-' + j).textContent = '💣'; 
            } else if (tablero[i][j] == 0) {
                document.getElementById(i + '-' + j).textContent = ''; 
            } else {
                var numBombasAdyacentes = casillasAdyacentes(i, j);
                document.getElementById(i + '-' + j).textContent = numBombasAdyacentes;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    inicializarTablero();
});
