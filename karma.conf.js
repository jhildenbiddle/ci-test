// Dependencies
// =============================================================================
const pkg       = require('./package');
const saucelabs = require('./saucelabs.config');


// Constants & Variables
// =============================================================================
const files = {
    html: './tests/fixtures/*.html',
    json: './tests/fixtures/*.json',
    test: './tests/karma/*.test.js'
};


// Local config
// =============================================================================
const localConfig = {
    // Add browsers via Karma launchers
    // https://www.npmjs.com/search?q=karma+launcher
    browsers: [
        'ChromeHeadless'
    ],
    files: [
        files.html,
        files.json,
        files.test
    ],
    preprocessors: {
        [files.html]: ['html2js'],
        [files.json]: ['json_fixtures'],
        [files.test]: ['eslint', 'webpack', 'sourcemap']
    },
    frameworks: ['mocha', 'chai'],
    reporters : ['mocha', 'coverage'],
    webpack   : {
        devtool: 'inline-source-map',
        module: {
            rules: [{
                test   : /\.js$/,
                exclude: [/node_modules/],
                use    : [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: ['ie >= 9']
                                }
                            }]
                        ],
                        plugins: [
                            ['istanbul', {
                                exclude: ['**/*.test.js']
                            }]
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
        stripPrefix : 'tests/fixtures/',
        variableName: '__json__'
    },
    // Mocha reporter
    // https://www.npmjs.com/package/karma-mocha-reporter
    mochaReporter: {
        output: 'autowatch'
    },
    port       : 9876,
    colors     : true,
    autoWatch  : false,
    singleRun  : true,
    concurrency: Infinity
};


// Remote config
// =============================================================================
const remoteConfig = Object.assign({}, localConfig, {
    // SauceLabs browers (see platform configurator below)
    // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
    customLaunchers: {
        sl_chrome: {
            base       : 'SauceLabs',
            browserName: 'Chrome',
            platform   : 'Windows 10',
            version    : '26.0'
        },
        sl_edge: {
            base       : 'SauceLabs',
            browserName: 'MicrosoftEdge',
            platform   : 'Windows 10',
            version    : '13.10586'
        },
        sl_firefox: {
            base       : 'SauceLabs',
            browserName: 'Firefox',
            platform   : 'Windows 10',
            version    : '30'
        },
        sl_ie_11: {
            base       : 'SauceLabs',
            browserName: 'Internet Explorer',
            platform   : 'Windows 10',
            version    : '11.0'
        },
        sl_ie_10: {
            base       : 'SauceLabs',
            browserName: 'Internet Explorer',
            platform   : 'Windows 8',
            version    : '10.0'
        },
        sl_ie_9: {
            base       : 'SauceLabs',
            browserName: 'Internet Explorer',
            platform   : 'Windows 7',
            version    : '9.0'
        },
        sl_safari: {
            base       : 'SauceLabs',
            browserName: 'Safari',
            platform   : 'OS X 10.9',
            version    : '7.0'
        }
    },
    // Set browsers to all customLaunchers
    get browsers() {
        return Object.keys(this.customLaunchers);
    },
    // SauceLab settings
    sauceLabs: {
        username : saucelabs.username || process.env.SAUCE_USERNAME,
        accessKey: saucelabs.accessKey || process.env.SAUCE_ACCESS_KEY,
        testName : `${pkg.name} (karma)`,
        build    : process.env.TRAVIS_BUILD_NUMBER || 0
    }
});


// Export
// =============================================================================
module.exports = function(config) {
    const isRemote   = Boolean(process.argv.indexOf('--remote') > -1);
    const testConfig = isRemote ? remoteConfig : localConfig;

    if (isRemote) {
        // Disabled source maps to prevent SauceLabs timeouts
        // https://github.com/karma-runner/karma-sauce-launcher/issues/95
        testConfig.webpack.devtool = '';
        testConfig.webpack.module.rules[0].use[0].options.sourceMap = false;

        // Add SauceLabs reporter
        testConfig.reporters.push('saucelabs');

        // Remove text-summary reporter
        testConfig.coverageReporter.reporters = testConfig.coverageReporter.reporters.filter(obj => obj.type !== 'text-summary');
    }

    // eslint-disable-next-line
    console.log({
        TRAVIS_BUILD_ID    : process.env.TRAVIS_BUILD_ID,
        TRAVIS_BUILD_NUMBER: process.env.TRAVIS_BUILD_NUMBER,
        TRAVIS_JOB_ID      : process.env.TRAVIS_JOB_ID,
        TRAVIS_JOB_NUMBER  : process.env.TRAVIS_JOB_NUMBER
    });

    testConfig.logLevel = config.LOG_INFO;
    config.set(testConfig);
};
