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

  test("should reset the game when the reset button is clicked", async ({ page }) => {
    await page.click('[data-index="0"]');
    await page.click('[data-index="3"]');
    await page.click('[data-index="1"]');
    await page.click('[data-index="4"]');
    await page.click('[data-index="2"]');

    const statusDisplay = await page.$(".status");
    const statusText = await statusDisplay.innerText();
    expect(statusText).toBe("Player X has won!");

    await page.click(".reset");

    const cells = await page.$$(".cell");
    const statusTextAfterReset = await statusDisplay.innerText();
    expect(cells.length).toBe(9);
    expect(statusTextAfterReset).toBe("It's player X's turn");
  });
});
