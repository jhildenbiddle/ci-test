// Modules
// =============================================================================
import add from '../../src/add.js';


// Tests
// =============================================================================
describe('add.js', () => {
    it('should add numbers', () => {
        expect(add(1, 2)).to.equal(3);
    });
});

describe('data.json', () => {
    it('should contain numeric data', () => {
        const data = window.__json__['data'];
        const a    = data.a;
        const b    = data.b;

        expect(a + b).to.equal(3);
    });
});

describe('page.html', () => {
    it('should contain text "Hello World"', () => {
        const fixture = window.__html__['page.html'];

        document.body.insertAdjacentHTML('beforeend', fixture);
        expect(document.querySelector('p').textContent).to.equal('Hello World');
    });
});
