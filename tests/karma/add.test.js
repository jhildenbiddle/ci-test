// Modules
// =============================================================================
import add from '../../src/add.js';
import { expect } from 'chai';


// Tests
// =============================================================================
describe('add.js', function() {
    it('should add numbers', function() {
        expect(add(1, 2)).to.equal(3);
    });
});

describe('data.json', function() {
    it('should contain numeric data', function() {
        const data = window.__json__.data;
        const a    = data.a;
        const b    = data.b;

        expect(a + b).to.equal(3);
    });
});

describe('page.html', function() {
    it('should contain text "Hello World"', function() {
        const fixture = window.__html__['page.html'];

        document.body.insertAdjacentHTML('beforeend', fixture);
        expect(document.querySelector('p').textContent).to.equal('Hello World');
    });
});
