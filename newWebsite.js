document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const pages = document.querySelectorAll('.page');
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const gameStatus = document.getElementById('game-status');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Tic Tac Toe Game Logic
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase()); // Add class for styling

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameStatus.innerHTML = `Player ${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        let roundDraw = !board.includes('');
        if (roundDraw) {
            gameStatus.innerHTML = `Game ended in a draw!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
    }

    function handleResetGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x', 'o');
        });
    }

    // Initialize game status
    gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;

    // Event Listeners for Tic Tac Toe
    gameBoard.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    resetButton.addEventListener('click', handleResetGame);
});