import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';

interface CalendarcomponentSignature {
  // The arguments accepted by the component
  Args: {
    filterByAll: () => void,
    filterByPending: () => void,
    filterByCompleted: () => void,
  };
  // Any blocks yielded by the component
  Blocks: {
    default: []
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class CalendarcomponentComponent extends Component<CalendarcomponentSignature> {

  @tracked
  showfilter: boolean = false;

  @action
  setfilter() {
    this.showfilter = !this.showfilter;
  }

  @action
  filterByAll(){
    this.args.filterByAll()
    this.setfilter()
  }

  @action
  filterByPending(){
    this.args.filterByPending()
    this.setfilter()
  }

  @action
  filterByCompleted(){
    this.args.filterByCompleted()
    this.setfilter()
  }


}
