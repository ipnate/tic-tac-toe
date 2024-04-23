class Game {
  constructor(doc, initialPlayer = "X", initialState = ["", "", "", "", "", "", "", "", ""]) {
    this._resetButton = doc.querySelector('.reset');
    this._cells = Array.from(doc.querySelectorAll('.cell'));
    this._statusDisplay = doc.querySelector('.status');
    this._active = true;
    this._currentPlayer = initialPlayer;
    this._state = initialState
    this._winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

  initiateGame() {
    this._cells.forEach(cell => cell.innerHTML = this._state[cell.getAttribute('data-index')]);
    this._cells.forEach(cell => cell.addEventListener('click', this.onClick.bind(this)));
    this._resetButton.addEventListener('click', this.reset.bind(this));
    this._statusDisplay.innerHTML = this.#currentPlayerDisplayString();
  }

  getGameStatus() {
    return this._active;
  }

  #currentPlayerDisplayString() {
    return `It's player ${this._currentPlayer}'s turn`;
  }

  onClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (!this._active || this._state[clickedCellIndex] !== "") {
      return;
    }

    this.processClick(clickedCell, clickedCellIndex);
    this.checkResult();
    this.switchPlayer();
  }

  processClick(clickedCell, clickedCellIndex) {
    this._state[clickedCellIndex] = this._currentPlayer;
    clickedCell.innerHTML = this._currentPlayer;
  }

  checkResult() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = this._winningConditions[i];
      const a = this._state[winCondition[0]];
      const b = this._state[winCondition[1]];
      const c = this._state[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      this._statusDisplay.innerHTML = `Player ${this._currentPlayer} has won!`;
      this._statusDisplay.classList.add('player-won');
      this._active = false;
      return;
    }

    let roundDraw = !this._state.includes("");
    if (roundDraw) {
      this._statusDisplay.innerHTML = "It's a draw!";
      this._statusDisplay.classList.add('player-draw');
      this._active = false;
      return;
    }

    this.switchPlayer();
  }

  switchPlayer() {
    this._currentPlayer = this._currentPlayer === "X" ? "O" : "X";
    this._statusDisplay.innerHTML = this.#currentPlayerDisplayString();
  }

  reset() {
    this._active = true;
    this._currentPlayer = "X";
    this._state = ["", "", "", "", "", "", "", "", ""];
    this._statusDisplay.innerHTML = this.#currentPlayerDisplayString();
    this._statusDisplay.classList.remove('player-won');
    this._statusDisplay.classList.remove('player-draw');
    this._cells.forEach(cell => cell.innerHTML = "");
  }
}

export default Game;