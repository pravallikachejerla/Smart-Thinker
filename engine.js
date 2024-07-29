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

const pieceValues = {
    'p': -1, 'r': -5, 'n': -3, 'b': -3, 'q': -9, 'k': -1000,
    'P': 1, 'R': 5, 'N': 3, 'B': 3, 'Q': 9, 'K': 1000
};

const isInBounds = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

const isWhitePiece = (piece) => piece === piece.toUpperCase();
const isBlackPiece = (piece) => piece === piece.toLowerCase();
const isSameColor = (piece1, piece2) => (isWhitePiece(piece1) && isWhitePiece(piece2)) || (isBlackPiece(piece1) && isBlackPiece(piece2));

const generatePawnMoves = (board, row, col, isWhite) => {
    const moves = [];
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
    const opponentRow = row + direction;

    if (isInBounds(opponentRow, col) && board[opponentRow][col] === ' ') {
        moves.push({ from: [row, col], to: [opponentRow, col] });
        if (row === startRow && board[opponentRow + direction][col] === ' ') {
            moves.push({ from: [row, col], to: [opponentRow + direction, col] });
        }
    }

    if (isInBounds(opponentRow, col + 1) && board[opponentRow][col + 1] !== ' ' && !isSameColor(board[row][col], board[opponentRow][col + 1])) {
        moves.push({ from: [row, col], to: [opponentRow, col + 1] });
    }

    if (isInBounds(opponentRow, col - 1) && board[opponentRow][col - 1] !== ' ' && !isSameColor(board[row][col], board[opponentRow][col - 1])) {
        moves.push({ from: [row, col], to: [opponentRow, col - 1] });
    }
    return moves;
};

const generateSlidingMoves = (board, row, col, directions) => {
    const moves = [];
    const piece = board[row][col];
    for (const [dRow, dCol] of directions) {
        for (let step = 1; step < 8; step++) {
            const newRow = row + dRow * step;
            const newCol = col + dCol * step;
            if (!isInBounds(newRow, newCol)) break;
            const target = board[newRow][newCol];
            if (target === ' ') {
                moves.push({ from: [row, col], to: [newRow, newCol] });
            } else {
                if (!isSameColor(piece, target)) {
                    moves.push({ from: [row, col], to: [newRow, newCol] });
                }
                break;
            }
        }
    }
    return moves;
};

const generateKnightMoves = (board, row, col) => {
    const moves = [];
    const knightMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];
    const piece = board[row][col];
    for (const [dRow, dCol] of knightMoves) {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (isInBounds(newRow, newCol)) {
            const target = board[newRow][newCol];
            if (target === ' ' || !isSameColor(piece, target)) {
                moves.push({ from: [row, col], to: [newRow, newCol] });
            }
        }
    }
    return moves;
};

const generateKingMoves = (board, row, col) => {
    const moves = [];
    const kingMoves = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];
    const piece = board[row][col];
    for (const [dRow, dCol] of kingMoves) {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (isInBounds(newRow, newCol)) {
            const target = board[newRow][newCol];
            if (target === ' ' || !isSameColor(piece, target)) {
                moves.push({ from: [row, col], to: [newRow, newCol] });
            }
        }
    }
    return moves;
};

const generateMoves = (board, isWhite) => {
    const moves = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (piece === ' ' || (isWhite && piece === piece.toLowerCase()) || (!isWhite && piece === piece.toUpperCase())) {
                continue;
            }
            switch (piece.toLowerCase()) {
                case 'p':
                    moves.push(...generatePawnMoves(board, i, j, isWhite));
                    break;
                case 'r':
                    moves.push(...generateSlidingMoves(board, i, j, [[1, 0], [-1, 0], [0, 1], [0, -1]]));
                    break;
                case 'n':
                    moves.push(...generateKnightMoves(board, i, j));
                    break;
                case 'b':
                    moves.push(...generateSlidingMoves(board, i, j, [[1, 1], [1, -1], [-1, 1], [-1, -1]]));
                    break;
                case 'q':
                    moves.push(...generateSlidingMoves(board, i, j, [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]));
                    break;
                case 'k':
                    moves.push(...generateKingMoves(board, i, j));
                    break;
            }
        }
    }
    return moves;
};

const makeMove = (board, move) => {
    const [fromRow, fromCol] = move.from;
    const [toRow, toCol] = move.to;
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = ' ';
};

const unmakeMove = (board, move, capturedPiece) => {
    const [fromRow, fromCol] = move.from;
    const [toRow, toCol] = move.to;
    board[fromRow][fromCol] = board[toRow][toCol];
    board[toRow][toCol] = capturedPiece;
};

const evaluateBoard = (board) => {
    let value = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (piece !== ' ') {
                value += pieceValues[piece];
            }
        }
    }
    return value;
};

const minimax = (board, depth, alpha, beta, isMaximizingPlayer) => {
    if (depth === 0) {
        return evaluateBoard(board);
    }

    const moves = generateMoves(board, isMaximizingPlayer);
    let bestValue;

    if (isMaximizingPlayer) {
        bestValue = -Infinity;
        for (const move of moves) {
            const capturedPiece = board[move.to[0]][move.to[1]];
            makeMove(board, move);
            const value = minimax(board, depth - 1, alpha, beta, false);
            unmakeMove(board, move, capturedPiece);
            bestValue = Math.max(bestValue, value);
            alpha = Math.max(alpha, bestValue);
            if (beta <= alpha) {
                break;
            }
        }
    } else {
        bestValue = Infinity;
        for (const move of moves) {
            const capturedPiece = board[move.to[0]][move.to[1]];
            makeMove(board, move);
            const value = minimax(board, depth - 1, alpha, beta, true);
            unmakeMove(board, move, capturedPiece);
            bestValue = Math.min(bestValue, value);
            beta = Math.min(beta, bestValue);
            if (beta <= alpha) {
                break;
            }
        }
    }

    return bestValue;
};

const findBestMove = (board) => {
    const moves = generateMoves(board, false);
    let bestValue = -Infinity;
    let bestMove = null;

    for (const move of moves) {
        const capturedPiece = board[move.to[0]][move.to[1]];
        makeMove(board, move);
        const boardValue = minimax(board, 3, -Infinity, Infinity, true);
        unmakeMove(board, move, capturedPiece);
        if (boardValue > bestValue) {
            bestValue = boardValue;
            bestMove = move;
        }
    }

    return bestMove;
};

onmessage = (event) => {
    const { command, board } = event.data;
    if (command === 'start') {
        const bestMove = findBestMove(board);
        postMessage(bestMove);
    }
};
