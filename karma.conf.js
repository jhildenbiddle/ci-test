const htmlFiles = './tests/fixtures/*.html';
const jsonFiles = './tests/fixtures/*.json';
const testFiles = './tests/karma/*.test.js';
const pkg       = require('./package');


// Local config
// =============================================================================
const localConfig = {
    // Add browsers via Karma launchers
    // https://www.npmjs.com/search?q=karma+launcher
    browsers: ['ChromeHeadless'],
    files: [
        htmlFiles,
        jsonFiles,
        testFiles
    ],
    preprocessors: {
        [htmlFiles]: ['html2js'],
        [jsonFiles]: ['json_fixtures'],
        [testFiles]: ['webpack', 'sourcemap'],
    },
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha', 'coverage'],
    webpack: {
        devtool: 'inline-source-map',
        module: {
            rules: [{
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [
                            ['istanbul', { exclude: ['**/*.test.js'] }]
                        ]
                    },
                }]
            }]
        }
    },
    webpackMiddleware: {
        stats: 'errors-only'
    },
    // Code coverage
    // https://www.npmjs.com/package/karma-coverage
    coverageReporter: {
        reporters: [
            { type: 'html' },
            { type: 'lcovonly' },
            { type: 'text-summary' }
        ]
    },
    // HTML Fixtures
    // https://www.npmjs.com/package/karma-html2js-preprocessor
    html2JsPreprocessor: {
        stripPrefix: 'tests/fixtures/'
    },
    // JSON Fixtures
    // https://www.npmjs.com/package/karma-json-fixtures-preprocessor
    jsonFixturesPreprocessor: {
        stripPrefix: 'tests/fixtures/',
        variableName: '__json__'
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
}


// Remote config
// =============================================================================
const remoteConfig = Object.assign({}, localConfig, {
    // SauceLabs browers
    // See https://saucelabs.com/platforms for complete list
    customLaunchers: {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7',
            version: '35'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '30'
        },
        sl_ie_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        }
    },
    // Set browsers to all customLaunchers
    get browsers() {
        return Object.keys(this.customLaunchers);
    },
    // Add SauceLabs reporter
    reporters: ['mocha', 'coverage', 'saucelabs'],
    sauceLabs: {
        testName: `${pkg.name} (karma)`
    }
});


// Export
// =============================================================================
module.exports = function(config) {
    const isRemote   = Boolean(process.argv.indexOf('--remote') > -1);
    const testConfig = isRemote ? remoteConfig : localConfig;

    testConfig.logLevel = config.LOG_INFO;
    config.set(testConfig)
}
