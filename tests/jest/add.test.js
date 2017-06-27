// Modules
// =============================================================================
const { promisify } = require('util');
const fs            = require('fs');
const path          = require('path');
const readFileAsync = promisify(fs.readFile);

import add from '../../src/add.js';


// Functions
// =============================================================================
// Node v8.x or above required due to use of async/wait. For older versions,
// use the util.promisify polyfill: github.com/ljharb/util.promisify
const loadFixture = async (filePath) => {
    try {
        return await readFileAsync(path.resolve(__dirname, filePath), { encoding: 'utf8' });
    }
    catch(err) {
        throw new Error(err);
    }
}


// Tests
// =============================================================================
describe('add.js', () => {
    it('should add numbers', () => {
        expect(add(1, 2)).toBe(3);
    });
});

describe('data.json', () => {
    it('should contain numeric data', async () => {
        const data = require('../fixtures/data.json');
        const a    = data.a;
        const b    = data.b;

        expect(a + b).toBe(3);
    });
});

describe('page.html', () => {
    it('should contain text "Hello World"', async () => {
        const fixture = await loadFixture('../fixtures/page.html');

        document.body.insertAdjacentHTML('beforeend', fixture);
        expect(document.querySelector('p').textContent).toBe('Hello World');
    });
});
