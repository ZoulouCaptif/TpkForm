import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-boilerplate/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | main-block', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<MainBlock />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <MainBlock>
        template block text
      </MainBlock>
    `);

    assert.dom().hasText('template block text');
  });
});
