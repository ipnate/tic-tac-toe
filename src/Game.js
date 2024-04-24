class Game {
  constructor() {
    this._active = true;
    this._currentPlayer = "X";
    this._state = ["", "", "", "", "", "", "", "", ""];
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

  getCurrentPlayer() {
    return this._currentPlayer;
  }

  getState() {
    return this._state;
  }

  getActive() {
    return this._active;
  }

  processAction(clickedCellIndex) {
    if (!this._active || this._state[clickedCellIndex] !== "") {
      return false;
    }
    this._state[clickedCellIndex] = this._currentPlayer;
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
      this._active = false;
      return { winner: this._currentPlayer, status: "won"}
    }

    let roundDraw = !this._state.includes("");
    if (roundDraw) {
      this._active = false;
      return { winner: null, status: "draw" }
    }

    return { winner: null, status: "active" }
  }

  switchPlayer() {
    this._currentPlayer = this._currentPlayer === "X" ? "O" : "X";
  }

  reset() {
    this._active = true;
    this._currentPlayer = "X";
    this._state = ["", "", "", "", "", "", "", "", ""];
  }
}

export default Game;