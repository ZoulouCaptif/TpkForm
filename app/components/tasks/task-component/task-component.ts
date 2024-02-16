import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import date from 'ember-boilerplate/utils/date';
import { action } from '@ember/object';

interface TaskComponentSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: []
  };
  Element: null;
}

export default class TaskComponentComponent extends Component<TaskComponentSignature> {}
