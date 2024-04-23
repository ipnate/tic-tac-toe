import { expect, test, describe, vi, beforeEach } from "vitest";
import Game from "../src/Game";
import { JSDOM } from "jsdom";

describe("checkResult", () => {
  beforeEach(() => {
    const dom = new JSDOM(
      `<!DOCTYPE html>
        <body>
          <div class="container">
            <h1>Tic Tac Toe</h1>
            <div class="details">
              <span class="detail status"></span>
              <button class="detail reset reset-button">Reset Game</button>
            </div>
          <div class="game-board">
            <div data-index="0" class="cell"></div>
            <div data-index="2" class="cell"></div>
            <div data-index="1" class="cell"></div>
            <div data-index="4" class="cell"></div>
            <div data-index="3" class="cell"></div>
            <div data-index="6" class="cell"></div>
            <div data-index="5" class="cell"></div>
            <div data-index="8" class="cell"></div>
            <div data-index="7" class="cell"></div>
          </div>
        </div>
      </body>`
    );

    global.document = dom.window.document;
  });

  test("should display player has won message when a winning condition is met", () => {
    const initialState = ["X", "O", "X", "X", "", "", "X", "", ""];
    const initialPlayer = "X";

    const game = new Game(document, initialPlayer, initialState);
    game.checkResult();

    const statusDisplay = document.querySelector(".status");
    expect(statusDisplay.innerHTML).toBe("Player X has won!");
    expect(Array.from(statusDisplay.classList)).toContain("player-won");

    expect(game.getGameStatus()).toBe(false);
  });

  test("should display draw message when all cells are filled and no winning condition is met", () => {
    const initialState = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
    const initialPlayer = "X";
    
    const game = new Game(document, initialPlayer, initialState);
    game.checkResult();

    const statusDisplay = document.querySelector(".status");
    expect(statusDisplay.innerHTML).toBe("It's a draw!");
    expect(Array.from(statusDisplay.classList)).toContain("player-draw");
    
    expect(game.getGameStatus()).toBe(false);
  });
});
