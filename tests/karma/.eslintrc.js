// Cascading config (merges with parent config)
// http://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
module.exports = {
    "plugins": [
        "chai-expect",
        "mocha"
    ],
    "rules": {
        "mocha/no-exclusive-tests": ["warn"],
        "mocha/no-global-tests"   : ["error"],
        "mocha/no-identical-title": ["error"],
        "mocha/no-mocha-arrows"   : ["error"]
    }
};
