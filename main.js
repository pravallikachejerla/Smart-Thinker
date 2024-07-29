document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('chess-board');
    const startButton = document.getElementById('start-button');
    const worker = new Worker('engine.js');

    const initialBoard = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ];

    const createBoard = () => {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
                square.dataset.row = i;
                square.dataset.col = j;
                boardElement.appendChild(square);
            }
        }
    };

    const updateBoard = (board) => {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            const row = square.dataset.row;
            const col = square.dataset.col;
            square.textContent = board[row][col] !== ' ' ? board[row][col] : '';
        });
    };

    let selectedSquare = null;

    const handleSquareClick = (event) => {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (selectedSquare) {
            const fromRow = selectedSquare.dataset.row;
            const fromCol = selectedSquare.dataset.col;
            const move = { from: [parseInt(fromRow), parseInt(fromCol)], to: [parseInt(row), parseInt(col)] };

            if (isValidMove(initialBoard, move)) {
                makeMove(initialBoard, move);
                updateBoard(initialBoard);
                selectedSquare.classList.remove('selected');
                selectedSquare = null;
                worker.postMessage({ command: 'start', board: initialBoard });
            } else {
                selectedSquare.classList.remove('selected');
                selectedSquare = null;
            }
        } else if (initialBoard[row][col] !== ' ') {
            selectedSquare = event.target;
            selectedSquare.classList.add('selected');
        }
    };

    const isValidMove = (board, move) => {
        const possibleMoves = generateMoves(board, isWhitePiece(board[move.from[0]][move.from[1]]));
        return possibleMoves.some(m => m.from[0] === move.from[0] && m.from[1] === move.from[1] && m.to[0] === move.to[0] && m.to[1] === move.to[1]);
    };

    boardElement.addEventListener('click', handleSquareClick);

    worker.onmessage = (event) => {
        const bestMove = event.data;
        if (bestMove) {
            makeMove(initialBoard, bestMove);
            updateBoard(initialBoard);
        }
    };

    startButton.addEventListener('click', () => {
        worker.postMessage({ command: 'start', board: initialBoard });
    });

    createBoard();
    updateBoard(initialBoard);
});
