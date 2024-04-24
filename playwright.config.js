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
};
export default config;