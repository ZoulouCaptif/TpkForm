import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import date from 'ember-boilerplate/utils/date';
import { action } from '@ember/object';
import { get } from '@ember/helper';

interface MainBlockSignature {
  Args: {};
  Blocks: {
    default: []
  };
}

export default class MainBlockComponent extends Component<MainBlockSignature> {}
