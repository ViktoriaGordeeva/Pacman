'use strict'
const PACMAN = '<img src="img/pac-man-right.png"/>';

var angle = 0;
var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true;
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = getRandomColor(); ///??????
            renderCell(gGhosts[i].location, gGhosts[i])
        }
        setTimeout(function () {
            gPacman.isSuper = false
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].color = ghostsColor; ///??????
                renderCell(gGhosts[i].location, gGhosts[i])
            }
            var ghostsDone = 3 - gGhosts.length;
            for (var i = 0; i < ghostsDone; i++) {
                createGhost(gBoard);
                renderCell(gGhosts[gGhosts.length - 1].location, getGhostHTML(gGhosts[gGhosts.length - 1]));
            }
        }, 5000)
    }
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                    updateScore(1) //??
                    gGhosts.splice(i, 1)
                    break
                }
            }
        } else {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        }
    }
    if (nextCell === CHERRY) updateScore(10)

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, getPacmanHTML(angle));


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            angle = '-90deg';
            break;
        case 'ArrowDown':
            nextLocation.i++;
            angle = '90deg';
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            angle = '180deg';
            break;
        case 'ArrowRight':
            nextLocation.j++;
            angle = '0deg';
            break;
        default:
            return null;
    }
    return nextLocation;
}

function getPacmanHTML(deg) {
    return `<img style="transform: rotate(${deg})" src="img/pac-man-right.png"/>`
}