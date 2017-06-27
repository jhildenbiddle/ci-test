# ci-test

[![Build Status](https://img.shields.io/travis/jhildenbiddle/ci-test.svg?style=flat-square)](https://travis-ci.org/jhildenbiddle/ci-test)
[![Codecov](https://img.shields.io/codecov/c/github/jhildenbiddle/ci-test.svg?style=flat-square)](https://codecov.io/gh/jhildenbiddle/ci-test)

## Description

Sample code used for evaluating JavaScript testing frameworks:

*   [Jest](https://facebook.github.io/jest/)
*   [Karma](https://karma-runner.github.io) + [Mocha](https://mochajs.org/) + [Chai](http://chaijs.com/) + [Istanbul](https://istanbul.js.org/)
*   [TestCafé](http://devexpress.github.io/testcafe/)

## Goals

1.  A consistent baseline configuration for each framework:

    *   A modern JavaScript environment (ES6+)
    *   Local browser testing
    *   Remote browser testing (SauceLabs)
    *   Test fixtures (HTML, JSON, etc.)
    *   Code coverage reports

2.  Integration with common test-related services:

    *   Continuous Integration using [Travis CI](https://travis-ci.org/)
    *   Code coverage history and statistics using [Codecov](https://codecov.io/)

## Quickstart

```shell
# Clone repo
git clone https://github.com/jhildenbiddle/ci-test.git

# Install dependencies
npm install

# Run local tests
npm run test:cafe
npm run test:jest
npm run test:karma

# Run remote tests (see "Notes" below)
npm run test:cafe-remote
npm run test:karma-remote
```

## Notes

1.  **Node 8 (or 7.6 + polyfill) required**

    The sample code uses JavaScript's new [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) / [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) feature which requires Node 7.6 or above. The code also makes use of the [util.promisify()](https://nodejs.org/api/util.html#util_util_promisify_original) utility function introduced in Node 8.x, but a [polyfill is available](https://github.com/ljharb/util.promisify) for older versions.

2.  **Install Chrome 59+ for "headless" browser testing**

    Local tests are configured to use Chrome in "headless" mode by default. This requires Chrome 59 or above. If you do not have Chrome 59 (or above) installed or prefer to test with different browers, the settings for each test framework will need to be updated (see comments in `package.json`, `karma.config.js`, etc).

3.  **Add SauceLabs environment variables for remote browser testing**

    For remote testing on SauceLabs, be sure to set your SAUCE_USERNAME and SAUCE_ACCESS_KEY enironment variables for authentication. Details can be found on the [SauceLabs wiki](https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Environment+Variables+for+Authentication+Credentials).
