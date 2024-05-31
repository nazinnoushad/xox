// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to set a random background color
function setRandomBackgroundColor() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    document.body.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
}

// Set initial background color
setRandomBackgroundColor();

const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
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

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Function to handle cell click
function handleCellClick(event) {
    const cellIndex = parseInt(event.target.getAttribute('data-cell-index'));
    if (gameState[cellIndex] !== '' || !gameActive) return;
    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
        endGame(false);
    } else if (!gameState.includes('')) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check win condition
function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
        return false;
    });
}

// Function to end the game
function endGame(draw) {
    gameActive = false;
    if (draw) {
        status.textContent = "It's a draw!";
    } else {
        status.textContent = `Player ${currentPlayer} wins!`;
    }
    // Create a new game button
    const newGameBtn = document.createElement('button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.classList.add('new-game');
    newGameBtn.addEventListener('click', restartGame);
    // Append the button to the container
    status.parentNode.appendChild(newGameBtn);
}

// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    // Remove the new game button
    const newGameBtn = document.querySelector('.new-game');
    if (newGameBtn) {
        newGameBtn.parentNode.removeChild(newGameBtn);
    }
}

// Function to end the game
function endGame(draw) {
    gameActive = false;
    if (draw) {
        status.textContent = "It's a draw!";
    } else {
        status.textContent = `Player ${currentPlayer} wins!`;
    }
    // Create a new game button
    const newGameBtn = document.createElement('button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.classList.add('new-game');
    newGameBtn.addEventListener('click', restartGame);
    // Append the button to the container
    status.parentNode.appendChild(newGameBtn);
    
    // Center the new game button
    newGameBtn.style.position = 'absolute';
    newGameBtn.style.left = '50%';
    newGameBtn.style.top = '50%';
    newGameBtn.style.transform = 'translate(-50%, -50%)';

    // Hide the new game button after a delay
    setTimeout(() => {
        newGameBtn.style.display = 'none';
    }, 3000); // Adjust the delay (in milliseconds) as needed
}