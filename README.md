![Workflow Badge](https://github.com/ipnate/tic-tac-toe/actions/workflows/build-test-deploy.yml/badge.svg)

# Tic Tac Toe

## Description

This is a basic Tic Tac Toe game created with HTML, CSS, and JavaScript. It leverages ES6 modules for a modern development approach and utilizes Webpack to build and serve the application, enabling hot loading during development.

The project employs `Node.js v16.20.2`, `webpack@5 (with supporting packages)`, `vitest@0.34.6` for unit testing, and `playwright@1.43.1` for end-to-end testing.

A `.nvmrc` file specifies the required Node.js version, a `package.json` file lists necessary packages, and a `pnpm-lock.yaml` is included for dependency management with pnpm.

The implementation does not rely on any CSS or frontend JavaScript frameworks.

## Configuration

#### Webpack

Webpack is configured to generate a production build by default. To switch to development mode, update `mode: production` to `mode: development` in the `webpack.config.js` file.

The build process bundles all JavaScript into a `bundle.js` file, which is injected into the `<body>` of `index.html`. CSS and the favicon are also injected during the build.

Webpack's configuration in `webpack.config.js` allows for further customization. There's no need to manually reference links, styles, or scripts in index.html, as Webpack injects dependencies during the build process.

The Webpack dev server offers the same functionality with hot loading and does not produce a minified production build.

#### Vitest

Vitest uses a largely default configuration, providing access to globals like `document` and implementing `jsdom` for direct DOM manipulation testing.

Currently, the tests are run directly from a specified file. If you add more test files, you may want to adapt the `vitest.config.js` for flexibility.

#### Playwright

Playwright runs in `headless` mode by default. The `playwright.config.js` file defines three projects for testing in `Chromium`, `Firefox`, and `Webkit` browser engines.

Test results are output to the console in development mode. The `GitHub Actions CI` pipeline generates an `HTML` report for each browser, storing it as an artifact.

## Installation

#### Prerequisites
```
NVM (Node Version Manager)
Node v16.20.2
```

This project uses [pnpm](https://pnpm.io/). Go check them out if you don't have them locally installed.

```bash
$ npm install -g pnpm@8
$ pnpm install
```

## Usage

```bash
$ pnpm start
```

This will start the webpack dev server at `localhost:8080`.

## Build

```bash
$ pnpm run build
```

This will create a production-ready `index.html` and `bundle.js` in the `dist` directory.

## Testing

#### Unit tests (vitest)

```bash
$ pnpm test:vi:run
```

This will run the vitest unit tests.

#### End to end testing (Playwright)
Install Playwright browsers and dependencies:
```bash
$ pnpm test:pw:ci
```

Build the project:
```bash
$ pnpm run build
```

Run the tests:
```bash
$ pnpm test:pw:run:all # Runs tests headlessly in all browsers
$ pnpm test:pw:run:chromium # Runs tests headlessly in Chromium 
$ pnpm test:pw:run:firefox 
$ pnpm test:pw:run:webkit
```
Add the `--headed` flag to view the tests running in a browser window.

## Contributing

Pull requests are welcome. The default branch is `master`, and it is protected. You can branch off it and submit a pull request.

If you create a pull request, the CI pipeline will trigger the GitHub Actions workflow and run the build, unit tests, and end-to-end tests. All tests must pass before your changes can be merged into the `master` branch.

Additionally, a contributor needs to approve your changes before they can be merged into `master`.

After the pull request is merged into `master`, the CI/CD pipeline will run again, completing the entire workflow. This includes running the build, unit tests, end-to-end tests, and deploying the build to GitHub Pages under http://ipnate.github.io/tic-tac-toe.

## Build Pipline

The project makes use of `GitHub Actions` for its continuous integration and continuous deployment (CI/CD) pipeline. There are four shared workflows that combine into a build, test, and deploy workflow. They all run on `Ubuntu` workers with `Node v16`.

Retention for all artifacts is set to `7 days`.

#### Build
- Installs `pnpm@8`.
- Installs all dependencies using `pnpm@8`.
- Caches all the dependencies.
- Builds the production build using Webpack.
- Uploads the build artifact to be used later.
- Uploads the build artifact to be deployed to `GitHub Pages` later.

#### Unit Tests
- Installs `pnpm@8`
- Checks the cache for the dependencies.
- If it couldn't find a cache, it installs the dependencies using `pnpm@8`.
- Runs the `Vitest` unit tests.

#### End to End Tests

This part spins up three jobs, one for each of the browsers: `Chromium`, `Firefox`, and `Webkit`.

- Installs `pnpm@8`
- Checks the cache for the dependencies.
- If it couldn't find the cache, it installs the `Playwright` browsers. In the case of the `Webkit` job, it always reinstalls the dependencies because `Webkit` requires other file system dependencies that can't be cached.
- Downloads the Build artifact created in the Build step.
- Runs the `Playwright` tests against the Build.
- Uploads the `playwright-report` artifact for inspection by developers.

#### Deploy

- If the branch is 'master', it will proceed.
- Configures `GitHub Pages`.
- Deploys the artifact that was uploaded in the build step to `GitHub Pages`.
- Outputs the page URL.

## License

[MIT](https://choosealicense.com/licenses/mit/)