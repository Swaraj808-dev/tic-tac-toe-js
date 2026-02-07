const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameOver = false;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", () => {
    if (gameOver || cells[i].textContent !== "") return;

    cells[i].textContent = currentPlayer;
    cells[i].classList.add(currentPlayer === "X" ? "x" : "o");

    if (iswinner()) {
      statusText.textContent = `Player ${currentPlayer} Wins 🎉`;
      gameOver = true;
      return;
    }

    if (isdraw()) {
      statusText.textContent = "Draw 😐";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  });
}

function iswinner() {
  for (let pattern of winPatterns) {
    const a = pattern[0];
    const b = pattern[1];
    const c = pattern[2];

    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {
      return true;
    }
  }
  return false;
}

function isdraw() {
  for (let cell of cells) {
    if (cell.textContent === "") return false;
  }
  return true;
}

function reset() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].classList.remove("x", "o");
  }
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X's Turn";
}

function restartGame() {
  reset();
}
