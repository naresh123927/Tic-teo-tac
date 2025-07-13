let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = '';
let difficultyLevel = 'easy';
let gameOver = false;

// Function to render the game board
function renderGameBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.textContent = gameBoard[i];
        cell.addEventListener('click', () => {
            if (!gameOver && gameBoard[i] === '') {
                gameBoard[i] = currentPlayer;
                renderGameBoard();
                checkGameStatus();
                if (gameMode === 'human-vs-computer' && !gameOver) {
                    computerMove();
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    }
}

// Function to handle computer move
function computerMove() {
    let move;
    switch (difficultyLevel) {
        case 'easy':
            move = easyMove();
            break;
        case 'medium':
            move = mediumMove();
            break;
        case 'hard':
            move = hardMove();
            break;
        default:
            move = easyMove();
    }
    gameBoard[move] = 'O';
    currentPlayer = 'X';
    renderGameBoard();
    checkGameStatus();
}

// Function to check game status
function checkGameStatus() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const condition of winConditions) {
        if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[0]] !== '') {
            gameOver = true;
            if (gameMode === 'human-vs-human') {
                document.getElementById('game-result').textContent = `Player ${gameBoard[condition[0]]} wins!`;
            } else {
                if (gameBoard[condition[0]] === 'X') {
                    document.getElementById('game-result').textContent = 'You win!';
                    document.getElementById('game-result').classList.add('win-animation');
                } else {
                    document.getElementById('game-result').textContent = 'Computer wins!';
                    document.getElementById('game-result').classList.add('lose-animation');
                }
            }
            setTimeout(resetGame, 2000);
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameOver = true;
        document.getElementById('game-result').textContent = 'It\'s a draw!';
        document.getElementById('game-result').classList.add('draw-animation');
        setTimeout(resetGame, 2000);
    }
}

// Function to handle easy move
function easyMove() {
    const availableCells = [];
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            availableCells.push(i);
        }
    }
    return availableCells[Math.floor(Math.random() * availableCells.length)];
}

// Function to handle medium move
function mediumMove() {
    // Try to block player's winning line
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const condition of winConditions) {
        if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[0]] === 'X' && gameBoard[condition[2]] === '') {
            return condition[2];
        }
        if (gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[1]] === 'X' && gameBoard[condition[0]] === '') {
            return condition[0];
        }
        if (gameBoard[condition[0]] === gameBoard[condition[2]] && gameBoard[condition[0]] === 'X' && gameBoard[condition[1]] === '') {
            return condition[1];
        }
    }
    // If no blocking move is available, make a random move
    return easyMove();
}

// Function to handle hard move
function hardMove() {
    // Try to win
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const condition of winConditions) {
        if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[0]] === 'O' && gameBoard[condition[2]] === '') {
            return condition[2];
        }
        if (gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[1]] === 'O' && gameBoard[condition[0]] === '') {
            return condition[0];
        }
        if (gameBoard[condition[0]] === gameBoard[condition[2]] && gameBoard[condition[0]] === 'O' && gameBoard[condition[1]] === '') {
            return condition[1];
        }
    }
    // Try to block player's winning line
    for (const condition of winConditions) {
        if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[0]] === 'X' && gameBoard[condition[2]] === '') {
            return condition[2];
        }
        if (gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[1]] === 'X' && gameBoard[condition[0]] === '') {
            return condition[0];
        }
        if (gameBoard[condition[0]] === gameBoard[condition[2]] && gameBoard[condition[0]] === 'X' && gameBoard[condition[1]] === '') {
            return condition[1];
        }
    }
    // If no winning or blocking move is available, make a random move
    return easyMove();
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    document.getElementById('game-result').textContent = '';
    document.getElementById('game-result').classList.remove('win-animation', 'lose-animation', 'draw-animation');
    renderGameBoard();
}

// Event listener for game mode selection
document.getElementById('human-vs-human').addEventListener('click', () => {
    gameMode = 'human-vs-human';
    document.querySelector('.game-board').style.display = 'grid';
    document.querySelector('.game-controls').style.display = 'block';
    document.getElementById('difficulty-level').style.display = 'none';
    renderGameBoard();
});

document.getElementById('human-vs-computer').addEventListener('click', () => {
    gameMode = 'human-vs-computer';
    document.querySelector('.game-board').style.display = 'grid';
    document.querySelector('.game-controls').style.display = 'block';
    document.getElementById('difficulty-level').style.display = 'block';
    renderGameBoard();
});

// Event listener for difficulty level change
document.getElementById('difficulty-level').addEventListener('change', (e) => {
    difficultyLevel = e.target.value;
});

// Event listener for reset button
document.getElementById('reset-button').addEventListener('click', resetGame);