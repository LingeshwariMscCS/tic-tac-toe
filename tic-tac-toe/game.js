const board = document.getElementById("board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll("[data-cell]");

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] || !isGameActive) return;

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("cell-filled");

    if (checkWin()) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return boardState[index] === currentPlayer;
        });
    });
}

function isBoardFull() {
    return boardState.every((cell) => cell !== null);
}

function endGame(isDraw) {
    if (isDraw) {
        message.textContent = "It's a Draw!";
    } else {
        message.textContent = `Player ${currentPlayer} Wins!`;
    }
    isGameActive = false;
}

function restartGame() {
    boardState = Array(9).fill(null);
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("cell-filled");
    });
    currentPlayer = "X";
    message.textContent = "Player X's Turn";
    isGameActive = true;
}

let boardState = Array(9).fill(null);
