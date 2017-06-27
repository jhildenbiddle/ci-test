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
fixture('add.js');

    test('should add numbers', async t => {
        await t.expect(add(1,2)).eql(3);
    });

fixture('data.json');

    test('should contain numeric data', async t => {
        const data = require('../fixtures/data.json');
        const a    = data.a;
        const b    = data.b;

        await t.expect(a + b).eql(3);
    });

fixture('page.html').page('../fixtures/page.html');

    test('should contain text "Hello World"', async t => {
        const elm = Selector('p');

        await t.expect(elm.textContent).eql('Hello World');
    });
