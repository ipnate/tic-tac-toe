import { expect, test, describe, vi, beforeEach } from "vitest";
import Game from "../src/Game";

describe("Game", () => {
  beforeEach(() => {});

  test("getCurrentPlayer should return X as the initial player", () => {
    const game = new Game();
    expect(game.getCurrentPlayer()).toBe("X");
  });

  test("getCurrentPlayer should return O if the previous player was X and switchPlayer is called", () => {
    const game = new Game();
    game.switchPlayer();

    expect(game.getCurrentPlayer()).toBe("O");
  });

  test("processAction should return false if the game is not completed", () => {
    const game = new Game();
    game.processAction(0);
    game.processAction(1);
    game.processAction(2);

    const gameResult = game.checkResult();
    expect(gameResult.status).toBe("won");
    expect(game.processAction(3)).toBe(false);
  });

  test("processAction should return false if the cell is already played", () => {
    const game = new Game();
    game.processAction(0);

    expect(game.processAction(0)).toBe(false);
  });

  test("processAction should return true if the cell is played successfully", () => {
    const game = new Game();
    expect(game.processAction(0)).toBe(true);
  });

  test("processAction should set the cell to the current player", () => {
    const game = new Game();
    game.processAction(0);

    expect(game.getState()).toEqual(["X", "", "", "", "", "", "", "", ""]);
  });

  test("checkResult should return won if the current player has won", () => {
    const game = new Game();
    game.processAction(0); // X
    game.switchPlayer();
    game.processAction(3); // O
    game.switchPlayer();
    game.processAction(1); // X
    game.switchPlayer();
    game.processAction(4); // O
    game.switchPlayer();
    game.processAction(2); // X

    const gameResult = game.checkResult();
    expect(gameResult.status).toBe("won");
    expect(gameResult.winner).toBe("X");
  });

  test("checkResult should return draw if the game is a draw", () => {
    const game = new Game();
    game.processAction(0); // X
    game.switchPlayer();
    game.processAction(1); // O
    game.switchPlayer();
    game.processAction(2); // X
    game.switchPlayer();
    game.processAction(3); // O
    game.switchPlayer();
    game.processAction(5); // X
    game.switchPlayer();
    game.processAction(4); // O
    game.switchPlayer();
    game.processAction(6); // X
    game.switchPlayer();
    game.processAction(8); // O
    game.switchPlayer();
    game.processAction(7); // X

    const gameResult = game.checkResult();
    expect(gameResult.status).toBe("draw");
    expect(gameResult.winner).toBe(null);
  });

  test("checkResult should return active if the game is still active", () => {
    const game = new Game();
    game.processAction(0); // X
    game.switchPlayer();
    game.processAction(1); // O
    game.switchPlayer();
    game.processAction(2); // X
    game.switchPlayer();
    game.processAction(3); // O
    game.switchPlayer();
    game.processAction(5); // X
    game.switchPlayer();
    game.processAction(4); // O

    const gameResult = game.checkResult();
    expect(gameResult.status).toBe("active");
    expect(gameResult.winner).toBe(null);
  });

  test("switchPlayer should switch the player from X to O", () => {
    const game = new Game();
    expect(game.getCurrentPlayer()).toBe("X");
    
    game.switchPlayer();
    expect(game.getCurrentPlayer()).toBe("O");
  });

  test("switchPlayer should switch the player from O to X", () => {
    const game = new Game();
    expect(game.getCurrentPlayer()).toBe("X");

    game.switchPlayer(); // O
    expect(game.getCurrentPlayer()).toBe("O");

    game.switchPlayer(); // X
    expect(game.getCurrentPlayer()).toBe("X");
  });

  test("reset should reset the game state", () => {
    const game = new Game();
    game.processAction(0); // X
    game.switchPlayer();
    game.processAction(1); // O
    game.switchPlayer();
    game.processAction(2); // X
    game.switchPlayer();
    game.processAction(3); // O
    game.switchPlayer();
    game.processAction(4); // X
    game.switchPlayer();
    game.processAction(5); // O
    expect(game.getState()).toEqual(["X", "O", "X", "O", "X", "O", "", "", ""]);

    game.reset();
    expect(game.getState()).toEqual(["", "", "", "", "", "", "", "", ""]);
  });

  test("reset should set the current player to X", () => {
    const game = new Game();
    game.switchPlayer();
    expect(game.getCurrentPlayer()).toBe("O");

    game.reset();
    expect(game.getCurrentPlayer()).toBe("X");
  });

  test("reset should set the game to active", () => {
    const game = new Game();
    game.processAction(0); // X
    game.switchPlayer();
    game.processAction(3); // O
    game.switchPlayer();
    game.processAction(1); // X
    game.switchPlayer();
    game.processAction(4); // O
    game.switchPlayer();
    game.processAction(2); // X
    
    game.checkResult();
    expect(game.getActive()).toBe(false);

    game.reset();
    expect(game.getActive()).toBe(true);
  });
});
