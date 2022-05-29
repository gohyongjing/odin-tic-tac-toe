const makeGame = (document) => {
    const GAME_IN_PROGRESS = 0;
    const GAME_DRAW = 1;
    const GAME_END = 2;
    const CELL_INDEX = {
        'top-left': [0, 0], 'top': [0, 1], 'top-right': [0, 2],
        'left': [1, 0], 'center': [1, 1], 'right': [1, 2],
        'bottom-left': [2, 0], 'bottom': [2, 1], 'bottom-right': [2, 2]
    };

    let makePlayer = (symbol) => {
        return { symbol };
    };

    let updateDisplay = () => {
        if (_gameState == GAME_DRAW) {
            _gameInfo.innerText = "It's a draw!"
        } else if (_gameState == GAME_END) {
            _gameInfo.innerText = `Player ${winner.symbol} wins!`;
        } else {
            _gameInfo.innerText = `Player ${_currPlayer.symbol}'s turn`
        }

        for (let cell of _cells) {
            let cellName = cell.className.split(" ")[0];
            let coords = CELL_INDEX[cellName];
            let col = coords[0];
            let row = coords[1];
            cell.innerText = _gameBoard[col][row];
        }
    };

    let updateGameState = () => {
        let hasEmpty = false;
        for (let row of _gameBoard) {
            if (row[0] === row[1] && row[1] === row[2]) {
                if (row[0] !== null) {
                    winner = players[0].symbol === row[0] ? players[0] : players[1];
                }
            }
            if (row[0] === null || row[1] === null || row[2] === null) {
                hasEmpty = true;
            }
        }
        for (let colNum = 0; colNum < 3; colNum++) {
            if (_gameBoard[0][colNum] === _gameBoard[1][colNum] && _gameBoard[1][colNum] === _gameBoard[2][colNum]) {
                if (_gameBoard[0][colNum] !== null) {
                    winner = players[0].symbol === _gameBoard[0][colNum] ? players[0] : players[1];
                }
            }
        }
        for (let coords of [[[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]]) {
            if (_gameBoard[coords[0][0]][coords[0][1]] === _gameBoard[coords[1][0]][coords[1][1]] &&
                _gameBoard[coords[1][0]][coords[1][1]] === _gameBoard[coords[2][0]][coords[2][1]]) {
                if (_gameBoard[coords[0][0]][coords[0][1]] !== null) {
                    winner = players[0].symbol === _gameBoard[[coords[0][0]][coords[0][1]]] ? players[0] : players[1];
                }
            }
        }
        if (winner !== null) {
            _gameState = GAME_END;
        } else if (!hasEmpty) {
            _gameState = GAME_DRAW;
        }
    }

    let makeMove = (player, cellName) => {
        let coords = CELL_INDEX[cellName];
        let col = coords[0];
        let row = coords[1];
        if (_gameState != GAME_IN_PROGRESS || _gameBoard[col][row] !== null) {
            return player;
        } else {
            _gameBoard[col][row] = player.symbol;
            updateGameState();
            return player === players[0] ? players[1] : players[0];
        }
    }

    let reset = () => {
        _gameState = GAME_IN_PROGRESS;
        _gameBoard = [[null, null, null],
        [null, null, null],
        [null, null, null]];
        _currPlayer = players[0];
        winner = null;

        updateDisplay();
        _cells.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                let cellName = cell.className.split(" ")[0];
                _currPlayer = makeMove(_currPlayer, cellName);
                updateDisplay();
            })
        });
    };

    const _cells = document.querySelectorAll(".game-board > div");
    const _gameInfo = document.querySelector(".game-info");
    const _resetButton = document.querySelector(".reset");

    let _gameState = GAME_IN_PROGRESS;
    let _gameBoard = [[null, null, null],
    [null, null, null],
    [null, null, null]];
    const players = [makePlayer('X'), makePlayer('O')];
    let _currPlayer = players[0];
    let winner = null;

    reset();
    _resetButton.addEventListener('click', (e) => {
        reset();
    })
};


makeGame(document);