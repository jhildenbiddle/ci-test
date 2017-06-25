const isRemote  = Boolean(process.argv.indexOf('--remote') > -1);
const testFiles = './tests/karma/*.test.js';
const pkg       = require('./package');

const localConfig = {
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'chai'],
    files: [testFiles],
    preprocessors: {
        [testFiles]: ['webpack', 'sourcemap'],
    },
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
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
        dir: 'coverage/karma',
        reporters: [
            { type: 'html' },
            { type: 'lcovonly' },
            { type: 'text-summary' }
        ]
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
}

const remoteConfig = Object.assign({}, localConfig, {
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
    get browsers() {
        return Object.keys(this.customLaunchers);
    },
    reporters: ['mocha', 'saucelabs'],
    coverageReporter: {
        dir: 'coverage'
    },
    sauceLabs: {
        testName: `${pkg.name} (karma)`
    }
});

module.exports = function(config) {
    const finalConfig = isRemote ? remoteConfig : localConfig;

    finalConfig.logLevel = config.LOG_INFO;
    config.set(finalConfig)
}
