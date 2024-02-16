import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import date from 'ember-boilerplate/utils/date';
import { action } from '@ember/object';

interface TaskComponentSignature {
  // The arguments accepted by the component
  Args: {
    addTask: () => void,
    setaded: () => void;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: []
  };
  taskname: string;
  date: string;
  Element: null;

}

export default class TaskComponentComponent extends Component<TaskComponentSignature> {

  @tracked
  taskname = '';

  @tracked
  date = '';



  @action
  changedata(event: Event) {
    this.taskname = (event.target as HTMLInputElement).value;
  }

  @action
  changedate(event: Event) {
    this.date = (event.target as HTMLInputElement).value;
  }

  @action
  add(){
    if (this.taskname) {
      if (!this.date) {
        this.args.addTask(this.taskname, date(new Date()))
      }
      else{
        this.args.addTask(this.taskname, this.date)
      }
      this.taskname = "";
      this.date = "";
      this.args.setaded(true);
      setTimeout(() => {
        this.args.setaded(false);
      }, 3 * 1000);
    }
    else{
      alert("Please enter a task name");
    }
  }
}
