
let turn = "X";
let isGameOver = false;

const changeTurn = () => turn === "X" ? "O" : "X";

const handleClick = (event) => {
  if (!isGameOver) {
    const cellText = event.target.querySelector('.cell-text');
    if (cellText.innerText === '') {
      cellText.innerText = turn;
      turn = changeTurn();
      document.querySelector('.info').innerText = `Player Turn - ${turn}`;
      checkWin();
    }
  }
};

const resetGame = () => {
  const cells = document.querySelectorAll('.cell-text');
  cells.forEach(cell => cell.innerText = '');
  turn = "X";
  isGameOver = false;
  document.querySelector('.info').innerText = `Player Turn - ${turn}`;
  document.querySelector('.winner-line').style.width = "0";
  document.querySelector('.image-box img').style.width = "0";

  // Hide winner message
  document.querySelector('.winner-announce').classList.add('hidden');
};

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
document.getElementById('reset').addEventListener('click', resetGame);

document.getElementById('start-button').addEventListener('click', function () {
  document.getElementById('landing-page').classList.add('hidden');
  document.getElementById('game-page').classList.remove('hidden');
});





const showWinnerStrip = (winner) => {
    const winnerStrip = document.getElementById('winner-strip');
    document.querySelector('.winner-message').innerText = `${winner} Wins!`;
    winnerStrip.classList.remove('hidden');
    winnerStrip.classList.add('show');
};

const hideWinnerStrip = () => {
    const winnerStrip = document.getElementById('winner-strip');
    winnerStrip.classList.remove('show');
    winnerStrip.classList.add('hidden');
};

const checkWin = () => {
    const cells = document.getElementsByClassName('cell-text');
    const winningCombinations = [
        [0, 1, 2, 0, 10, 0],
        [3, 4, 5, 0, 30, 0],
        [6, 7, 8, 0, 50, 0],
        [0, 3, 6, -10, 20, 90],
        [1, 4, 7, 10, 20, 90],
        [2, 5, 8, 30, 20, 90],
        [0, 4, 8, 10, 30, 45],
        [2, 4, 6, 10, 30, 135],
    ];

    winningCombinations.forEach(([a, b, c, x, y, angle]) => {
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[b].innerText === cells[c].innerText) {
            document.querySelector('.info').innerText = `${cells[a].innerText} Wins!`;
            isGameOver = true;
            document.querySelector('.image-box img').style.width = "200px";
            const winnerLine = document.querySelector('.winner-line');
            winnerLine.style.width = "20vw";
            winnerLine.style.transform = `translate(${x}vw, ${y}vw) rotate(${angle}deg)`;

            // Show winner strip
            showWinnerStrip(cells[a].innerText);
        }
    });
};

document.getElementById('strip-reset').addEventListener('click', () => {
    resetGame();
    hideWinnerStrip();
});


