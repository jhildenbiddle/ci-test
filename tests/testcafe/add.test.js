// Modules
// =============================================================================
import { ClientFunction, Selector } from 'testcafe';
import add from '../../src/add.js';


// Functions
// =============================================================================
const injectFixture = ClientFunction(content => {
    document.body.insertAdjacentHTML('beforeend', content);
});


// Tests
// =============================================================================
fixture('Fixture (page)')
    .page('../fixtures/page.html');

    test('should contain text "Hello World"', async t => {
        const elm = Selector('p');

        await t.expect(elm.textContent).eql('Hello World');
    });

fixture('Fixture (injected)');

    test('should contain text "Hello World"', async t => {
        const fixture = '<p>Hello World</p>';
        const elm     = Selector('p');

        await injectFixture(fixture);
        await t.expect(elm.textContent).eql('Hello World');
    });

fixture('add.js');

    test('should add numbers', async t => {
        await t.expect(add(1,2)).eql(3);
    });
