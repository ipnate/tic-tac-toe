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

  test("should display draw message when a draw condition is met", async ({ page }) => {
    await page.click('[data-index="0"]');
    await page.click('[data-index="1"]');
    await page.click('[data-index="2"]');
    await page.click('[data-index="3"]');
    await page.click('[data-index="4"]');
    await page.click('[data-index="6"]');
    await page.click('[data-index="5"]');
    await page.click('[data-index="8"]');
    await page.click('[data-index="7"]');

    const statusDisplay = await page.$(".status");
    const statusText = await statusDisplay.innerText();
    expect(statusText).toBe("It's a draw!");
  });
});
