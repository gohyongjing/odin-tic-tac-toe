const game = ((document) => {
    const GAME_IN_PROGRESS = 0;
    const GAME_DRAW = 1;
    const GAME_END = 2;
    const CELL_INDEX = {'top-left': [0, 0], 'top': [0, 1], 'top-right': [0, 2],
                        'left': [1, 0], 'center': [1, 1], 'right': [1, 2],
                        'bottom-left': [2, 0], 'bottom': [2, 1], 'bottom-right': [2, 2]};
    const _cells = document.querySelectorAll(".game-board > div");

    let makePlayer = (symbol) => {
        let _score = 0;
        let winGame = () => {_score += 1};

        return {symbol, winGame};
    };

    let updateDisplay = () => {
        for (let cell of _cells) {
           let cellName = cell.className.split(" ")[0];
            let coords = CELL_INDEX[cellName];
            let col = coords[0];
            let row = coords[1];
            cell.innerText = _gameBoard[col][row];
        }
    }; 

    let makeMove = (player, cellName) => {
        let coords = CELL_INDEX[cellName];
        let col = coords[0];
        let row = coords[1];
        if (_gameState != GAME_IN_PROGRESS || _gameBoard[col][row] !== null) {
            return player;
        } else {
            _gameBoard[col][row] = player.symbol;
            updateDisplay();
            return player === players[0] ? players[1] : players[0];
        }
    }

    let _gameState = GAME_IN_PROGRESS;
    let _gameBoard = [[null, null, null],
                    [null, null, null],
                    [null, null, null]];
    const players = [makePlayer('X'), makePlayer('O')];
    let _currPlayer = players[0];

    _cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            let cellName = cell.className.split(" ")[0];
            _currPlayer = makeMove(_currPlayer, cellName);
        })
    });
})(document);

