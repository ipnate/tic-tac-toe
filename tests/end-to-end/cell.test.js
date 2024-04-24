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

  test("should display player O's turn message after player X has played", async ({ page }) => {
    await page.click('[data-index="0"]');

    const statusDisplay = await page.$(".status");
    const statusText = await statusDisplay.innerText();
    expect(statusText).toBe("It's player O's turn");
  });

  test("should display player X's turn message after player O has played", async ({ page }) => {
    await page.click('[data-index="0"]');
    await page.click('[data-index="1"]');

    const statusDisplay = await page.$(".status");
    const statusText = await statusDisplay.innerText();
    expect(statusText).toBe("It's player X's turn");
  });

  test("should set the cell contents to the player name", async ({ page }) => {
    await page.click('[data-index="0"]');
    await page.click('[data-index="3"]');
    await page.click('[data-index="1"]');
    await page.click('[data-index="4"]');

    const cells = await page.$$(".cell");
    const cellText = await cells[0].innerText();
    expect(cellText).toBe("X");
    const cellText2 = await cells[3].innerText();
    expect(cellText2).toBe("O");
    const cellText3 = await cells[1].innerText();
    expect(cellText3).toBe("X");
    const cellText4 = await cells[4].innerText();
    expect(cellText4).toBe("O");
  });

});
