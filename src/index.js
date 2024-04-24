import Game from "./Game.js";
import "./styles.css";

const _resetButton = document.querySelector(".reset");
const _cells = document.querySelectorAll(".cell");
const _statusDisplay = document.querySelector(".status");

const _game = new Game();

const playCell = (clickedCellEvent) => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  const processed = _game.processAction(clickedCellIndex);
  if (!processed) {
    return;
  }

  clickedCell.innerHTML = _game.getCurrentPlayer();

  const gameResult = _game.checkResult();
  if (gameResult.status === "won") {
    _statusDisplay.innerHTML = `Player ${gameResult.winner} has won!`;
    _statusDisplay.classList.add("player-won");
    return;
  } else if (gameResult.status === "draw") {
    _statusDisplay.innerHTML = "It's a draw!";
    _statusDisplay.classList.add("player-draw");
    return;
  }

  _game.switchPlayer();
  _statusDisplay.innerHTML = `It's player ${_game.getCurrentPlayer()}'s turn`;
};

const resetGame = () => {
  _game.reset();
  _statusDisplay.innerHTML = `It's player ${_game.getCurrentPlayer()}'s turn`;
  _statusDisplay.classList.remove("player-won");
  _statusDisplay.classList.remove("player-draw");
  _cells.forEach((cell) => (cell.innerHTML = ""));
};

_cells.forEach((cell) => cell.addEventListener("click", playCell));
_resetButton.addEventListener("click", resetGame);
_statusDisplay.innerHTML = `It's player ${_game.getCurrentPlayer()}'s turn`;
