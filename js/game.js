'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🍩'
const CHERRY = '🍒'

var foodNum = 56;
var gCherryInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gCherryInterval = setInterval(createCherry, 15000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1 || i === 1 && j === 8 || i === 8 && j === 1 || i === 8 && j === 8) {
                board[i][j] = SUPER_FOOD;
            }
        }
    }
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    if (gGame.score >= foodNum) gameOver(true)
}

function gameOver(victory) {
    document.querySelector('.popup h2').innerText = victory ? 'You Won!' : 'Game Over!'
    document.querySelector('.popup').hidden = false;
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
}

function restart() {
    updateScore(-gGame.score);
    document.querySelector('.popup').hidden = true;
    init();
}

function createCherry() {
    var emptyFields = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) emptyFields.push({ i: i, j: j })
        }
    }
    if (emptyFields.length === 0) return;
    var idx = getRandomIntInclusive(0, emptyFields.length - 1);
    var cell = emptyFields[idx];
    gBoard[cell.i][cell.j] = CHERRY
    renderCell(cell, CHERRY)
}