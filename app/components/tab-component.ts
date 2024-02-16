import { action } from '@ember/object';
import Component from '@glimmer/component';
import { all } from 'rsvp';

interface TabComponentSignature {
  // The arguments accepted by the component
  Args: {
    allTasks: { title: string, content: string, status:boolean }[],
    changeStatus: Function,
    suppTask: Function;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: []
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class TabComponentComponent extends Component<TabComponentSignature> {

}
