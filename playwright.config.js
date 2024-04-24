const config = {
  workers: 4,
  testDir: 'tests/end-to-end',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  matrix: {
    browser: ['chromium', 'firefox', 'webkit'],
    viewport: [{ width: 800, height: 600 }, { width: 1200, height: 768 }],
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium', headless: true },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox', headless: true },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit', headless: true },
    },
  ],
};
export default config;