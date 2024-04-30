$(document).ready(function() {
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]              // diagonales
    ];

    const cells = $('[data-cell]');
    let xTurn = true;

    startGame();

    function startGame() {
        resetGame();
        cells.on('click', handleClick);
        updateStatus();
    }

    function resetGame() {
        cells.removeClass(X_CLASS).removeClass(O_CLASS).removeClass('winner');
        xTurn = true;
    }

    function handleClick(e) {
        const cell = $(e.target);
        const currentClass = xTurn ? X_CLASS : O_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            xTurn = !xTurn;
            updateStatus();
        }
    }

    function placeMark(cell, currentClass) {
        cell.addClass(currentClass);
    }

    function updateStatus() {
        const currentPlayer = xTurn ? 'X' : 'O';
        $('.status').text(`Turno de ${currentPlayer}`);
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(function(combination) {
            return combination.every(function(index) {
                return cells.eq(index).hasClass(currentClass);
            });
        });
    }

    function isDraw() {
        return cells.toArray().every(function(cell) {
            return $(cell).hasClass(X_CLASS) || $(cell).hasClass(O_CLASS);
        });
    }

    function endGame(draw) {
        if (draw) {
            alert('¡Empate!');
        } else {
            const winner = xTurn ? 'X' : 'O';
            alert(`¡${winner} ha ganado!`);
            $('.status').text(`¡${winner} ha ganado!`);
            highlightWinningCells(winner);
        }
        cells.off('click', handleClick);
    }

    function highlightWinningCells(winner) {
        WINNING_COMBINATIONS.forEach(function(combination) {
            if (combination.every(function(index) { return cells.eq(index).hasClass(winner); })) {
                combination.forEach(function(index) { cells.eq(index).addClass('winner'); });
            }
        });
    }

    $('.restart-btn').click(startGame);
});
