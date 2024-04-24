const config = {
  workers: 4,
  testDir: "tests/end-to-end",
  reporter: process.env.CI
    ? [
        [
          "html",
          {
            open: "never",
            outputFile: `playwright-report-${process.env.BROWSER_NAME}-${format(new Date(), 'yyyyMMdd-HHmmss')}.html`,
          },
        ],
      ]
    : "list",
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium", headless: true },
    },
    {
      name: "Firefox",
      use: { browserName: "firefox", headless: true },
    },
    {
      name: "WebKit",
      use: { browserName: "webkit", headless: true },
    },
  ],
};
export default config;
