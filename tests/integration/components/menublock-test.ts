import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-boilerplate/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | menublock', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Menublock />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Menublock>
        template block text
      </Menublock>
    `);

    assert.dom().hasText('template block text');
  });
});
