# ci-test

[![Build Status](https://img.shields.io/travis/jhildenbiddle/ci-test.svg?style=flat-square)](https://travis-ci.org/jhildenbiddle/ci-test)
[![Codecov](https://img.shields.io/codecov/c/github/jhildenbiddle/ci-test.svg?style=flat-square)](https://codecov.io/gh/jhildenbiddle/ci-test)
[![Codacy grade](https://img.shields.io/codacy/grade/ec212742ff4d4af19a959cae2018565b.svg?style=flat-square)](https://www.codacy.com/app/jhildenbiddle/ci-test?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jhildenbiddle/ci-test&amp;utm_campaign=Badge_Grade)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Sample code used for evaluating JavaScript testing frameworks:

- [Jest](https://facebook.github.io/jest/)
- [Karma](https://karma-runner.github.io) + [Mocha](https://mochajs.org/) + [Chai](http://chaijs.com/) + [Istanbul](https://istanbul.js.org/)
- [TestCafé](http://devexpress.github.io/testcafe/)

## Goals

1. A consistent baseline configuration for each framework:

   - A modern JavaScript environment (ES6+ via [Babel](http://babeljs.io/))
   - Local browser testing
   - Remote browser testing ([SauceLabs](https://saucelabs.com/))
   - Test fixtures (HTML, JSON, etc.)
   - Code coverage ([Istanbul](https://istanbul.js.org/))
   - Code linting ([ESLint](http://eslint.org/))

2. Integration with common test-related services:

   - Continuous Integration using [Travis CI](https://travis-ci.org/)
   - Code coverage history and statistics using [Codecov](https://codecov.io/)
   - Code quality history and statistics using [Codacy](https://codacy.com/)

## Quickstart

```shell
# Clone repo
git clone https://github.com/jhildenbiddle/ci-test.git

# Change to cloned repo directory
cd ci-test

# Install dependencies
npm install

# Run local tests
npm run test:cafe
npm run test:jest
npm run test:karma
npm run test:karma-debug

# Run remote tests (see "Notes" below)
npm run test:cafe-remote
npm run test:karma-remote
```

## Notes

1. **Node 8 (or 7.6 + polyfill) required**

   The sample code uses JavaScript's new [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) / [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) feature which requires Node 7.6 or above. The code also makes use of the [util.promisify()](https://nodejs.org/api/util.html#util_util_promisify_original) utility function introduced in Node 8.x, but a [polyfill is available](https://github.com/ljharb/util.promisify) for older versions.

1. **Install Chrome 59+ for "headless" browser testing**

   Local tests are configured to use Chrome in "headless" mode by default. This requires Chrome 59 or above. If you do not have Chrome 59 (or above) installed or prefer to test with different browers, the settings for each test framework will need to be updated:

   - **Jest**: No browers to specify (test are executed using [jsdom](https://github.com/tmpvar/jsdom))
   - **Karma**: edit `karma.conf.js` and install the appropriate [karma launchers](https://www.npmjs.com/search?q=karma+launcher)
   - **TestCafé**: edit `package.json` and specify browsers via command line args

1. **Set SauceLabs username and access key for remote testing**

    These can be set as environment variables (see [SauceLabs wiki](https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Environment+Variables+for+Authentication+Credentials) for details) or in `saucelabs.config.js`.
