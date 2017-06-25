// Modules
// =============================================================================
import add from '../../src/add.js';


// Tests
// =============================================================================
describe('Fixture (injected)', () => {
    it('should contain text "Hello World"', () => {
        const fixture = `
            <div id="fixture">
                <p>Hello World</p>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', fixture);
        expect(document.querySelector('#fixture p').textContent).to.equal('Hello World');
    });
});

describe('add.js', () => {
    it('should add numbers', () => {
        expect(add(1, 2)).to.equal(3);
    });
});
