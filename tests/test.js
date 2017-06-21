import { Selector } from 'testcafe';

fixture `Index Page`
    .page `../index.html`;

test('Check for existence of text', async t => {
    const paragraph = await new Selector('body > p');

    await t.expect(paragraph.textContent).eql('Foobar');
});