import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';
import { tracked } from '@glimmer/tracking';
import { all } from 'rsvp';

interface TasksSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: []
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

type Task = { name: string, date: string, status:boolean, hide:boolean };

export default class TasksComponent extends Component<TasksSignature> {
  defaultStatus = false;

  @tracked
  allTasks: Task[] = [];

  @tracked
  isAded = false;

   @action
  setaded(value: boolean) {
    this.isAded = value;
  }

  @action
  addTask(name: string, date: string) {
    this.allTasks = [...this.allTasks, { name, date, status: this.defaultStatus, hide: true}];
  }

  @action
  changeStatus(index: number) {
    const task = this.allTasks[index]!;
    this.allTasks[index] = { ...task, status: !task.status };
    this.allTasks = [...this.allTasks];
    this.filterByAll();
  }

  @action
  SuppTask(task: Task) {
     let index = 0;
    this.allTasks.map((task) => {
       if (task.name === name && task.date === date) {
         index = this.allTasks.indexOf(task);
       }
     });
     this.allTasks.splice(index, 1);
     this.allTasks = [...this.allTasks];
     this.filterByAll();
  }

  @action
  SuppAllTask() {
    this.allTasks = [];
    this.filterByAll();
  }

  @action
  modify() {
    //TODO
  }

  @action
  filterByAll(){
    let Taskindex = 0;
    this.allTasks.forEach((task) => {
      this.allTasks[Taskindex] = { ...task, hide: true };
      Taskindex++;
    });
    this.allTasks = [...this.allTasks];
  }

  @action
  filterByPending(){
    let Taskindex = 0;
    this.allTasks.forEach((task) => {
      if (task.status == false) {
        this.allTasks[Taskindex] = { ...task, hide: true };
      }
      else{
        this.allTasks[Taskindex] = { ...task, hide: false };
      }
      Taskindex++;
    });
    this.allTasks = [...this.allTasks];
    console.log("filterByPending");
    console.log(this.allTasks);
  }

  @action
  filterByCompleted(){
    let Taskindex = 0;
    this.allTasks.forEach((task) => {
      if (task.status == true) {
        this.allTasks[Taskindex] = { ...task, hide: true };
      }
      else{
        this.allTasks[Taskindex] = { ...task, hide: false };
      }
      Taskindex++;
    });
    this.allTasks = [...this.allTasks];
    console.log("filterByCompleted");
    console.log(this.allTasks);
  }
}
