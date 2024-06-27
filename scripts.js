const gameBoard = (() => {
    let board = [
        "","","",
        "","","",
        "","",""
                ];
    let currentPlayer = "O";
    let winner = false;
    let gameOver = false;

    const checkWinner = () => {
        const winningMoves = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        winningMoves.forEach(moves => {
            const [a, b, c] = moves;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winner = true;
                gameOver = true;
                console.log("winner found")
            }
        });
        if (winner == true) {
            return true;
        }
        return false;
    }
    const checkTie = () => {
        for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    return false;
                }
            }
        return true;
    }

    const playGame = (index) => {
        if (winner == false) { 
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        board[index] = currentPlayer;
        console.log(currentPlayer)
        console.log(board);
        }
        else if (winner == true) {
            return;
        }
    }

    const resetGame = () => {
        board = ["","","",
        "","","",
        "","",""]
        currentPlayer = "O";
        winner = false;
        gameOver = false;
    }

    return {checkWinner, checkTie, playGame, resetGame}
}) () 

const displayController = (() => {

    let currentPlayer = "0";
    let status = "active";

    const startGame = document.getElementById('startButton');

    startGame.addEventListener('click', () => {

        startGame.innerHTML = 'New Game';

        if (playerOne.value.trim() === '' || playerTwo.value.trim() === '') {
            alert('Please fill out all fields');
            return;
        }
        resetBoard();
        renderBoard();
    });   

    let renderBoard = () => {

        
        const playerOne = document.getElementById('playerOne');
        const playerOneName = playerOne.value;
        const playerTwo = document.getElementById('playerTwo');
        const playerTwoName = playerTwo.value;
        let currentPlayerName = playerOneName;
        let boardContainer = document.getElementById('boardContainer');
        let winnerContainer = document.getElementById('winnerContainer');

        const div = document.createElement('div');
        div.className = "winnerDiv";
        div.innerHTML = `It is ${playerOneName}'s turn`;
        winnerContainer.appendChild(div);

                for (let j = 0; j < 9; j++) {
                        const div = document.createElement('div');
                        div.className = "cell";
                        div.id = 'cell-' + j;
                        boardContainer.appendChild(div);
                    }

                const cells = document.querySelectorAll('.cell');

                cells.forEach((cell, index) => {
                    cell.addEventListener('click', () => {
                        if (status == "active" && cell.innerHTML == "") {
                            console.log(gameBoard.board)
                            gameBoard.playGame(index);
                            console.log(gameBoard.checkWinner());
                            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                            cell.innerHTML = currentPlayer;
                            if (gameBoard.checkWinner() === true) {
                                winnerContainer.innerHTML = "";
                                const div = document.createElement('div');
                                div.className = "winnerDiv";
                                div.innerHTML = `${currentPlayerName} is the winner!`;
                                winnerContainer.appendChild(div);
                                status = "over";
                            }
                            else if (gameBoard.checkTie() === true) {
                                winnerContainer.innerHTML = "";
                                const div = document.createElement('div');
                                div.className = "winnerDiv";
                                div.innerHTML = "Game is a tie"
                                winnerContainer.appendChild(div);
                                status = "over"
                            }
                            currentPlayerName = currentPlayerName === playerOneName ? playerTwoName : playerOneName;
                            if (status != 'over') {
                                winnerContainer.innerHTML = "";
                                const div = document.createElement('div');
                                div.className = "winnerDiv";
                                div.innerHTML = `It is ${currentPlayerName}'s turn`;
                                winnerContainer.appendChild(div);
                            }
                        }
                    });
                });
            };

        let resetBoard = () => {
            status = "active";
            currentPlayer = "O";
            gameBoard.resetGame();
            boardContainer.innerHTML = "";
            winnerContainer.innerHTML = "";
        }   
}) ()