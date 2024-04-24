import { test, expect } from "playwright/test";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "../../");
const filePath = resolve(rootDir, "dist/index.html")

test.describe("index.html", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("file:///" + filePath);
  });

  test("should display the game board", async ({ page }) => {
    const cells = await page.$$(".cell");
    expect(cells.length).toBe(9);
  });

  test("should display the reset button", async ({ page }) => {
    const resetButton = await page.$(".reset");
    expect(resetButton).not.toBeNull();
  });

  test("should display the status display", async ({ page }) => {
    const statusDisplay = await page.$(".status");
    expect(statusDisplay).not.toBeNull();
  });

  test("should display player X's turn message", async ({ page }) => {
    const statusDisplay = await page.$(".status");
    const statusText = await statusDisplay.innerText();
    expect(statusText).toBe("It's player X's turn");
  });
});
