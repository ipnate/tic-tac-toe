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

  test("should not allow a cell to be played twice", async ({ page }) => {
    await page.click('[data-index="0"]');
    await page.click('[data-index="0"]');

    const cells = await page.$$(".cell");
    const cellText = await cells[0].innerText();
    expect(cellText).toBe("X");
  });

  test("should not allow a cell to be played after the game has ended", async ({ page }) => {
    await page.click('[data-index="0"]');
    await page.click('[data-index="3"]');
    await page.click('[data-index="1"]');
    await page.click('[data-index="4"]');
    await page.click('[data-index="2"]');

    await page.click('[data-index="5"]');

    const cells = await page.$$(".cell");
    const cellText = await cells[5].innerText();
    expect(cellText).toBe("");
  });
});
