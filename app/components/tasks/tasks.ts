import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';
import { tracked } from '@glimmer/tracking';
import { all } from 'rsvp';
import date from 'ember-boilerplate/utils/date';
import { runTask } from 'ember-lifeline';



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
  userModifyingTask = false;
  indexTaskModifying = 0;

  @tracked
  allTasks: Task[] = [];


  @tracked
  isAdded = false;

  @tracked
  bannerMessage = "";

  @tracked
  bannerBgColor = "";

   @action
  setAdded(value: boolean) {
    this.isAdded = value;
  }

  @action
  addTask(name: string, date: string) {
    if(this.userModifyingTask){
      this.bannerMessage = "Task modified successfully";
      this.bannerBgColor = "bg-crayon";
      this.allTasks[this.indexTaskModifying] = { name, date, status: this.defaultStatus, hide: true};
      this.allTasks = [...this.allTasks];
      this.filterByAll();
      this.userModifyingTask = false;
      this.indexTaskModifying = 0;
    }
    else{
      this.bannerMessage  = "Task added successfully";
      this.bannerBgColor = "bg-checkedGreen";
      this.allTasks = [...this.allTasks, { name, date, status: this.defaultStatus, hide: true}];
    }
    this.messageCouldown();
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
    let index = this.allTasks.indexOf(task);
     if (this.userModifyingTask && this.indexTaskModifying == index) {
        this.userModifyingTask = false;
     }
     this.allTasks.splice(index, 1);
     this.allTasks = [...this.allTasks];
     this.filterByAll();
     this.bannerMessage  = "Task deleted successfully";
     this.bannerBgColor = "bg-deleteRed";
     // run.later
     this.messageCouldown();
  }

  @action
  SuppAllTask() {
    this.allTasks = [];
    this.userModifyingTask = false;
    this.indexTaskModifying = 0;
    this.filterByAll();
  }

  @action
  modify(index:number) {
    const task = this.allTasks[index]!;
    this.taskname = task.name;
    this.date = task.date;
    this.userModifyingTask = true;
    this.indexTaskModifying = index;
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
      // this.allTasks[Taskindex] = { ...task, hide: !task.status };
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
  //#############################################################################################
  //#############################################################################################
  //#############################################################################################
  //#############################################################################################

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
        this.addTask(this.taskname, date(new Date()))
      }
      else{
        this.addTask(this.taskname, this.date)
      }
      this.taskname = "";
      this.date = "";
    }
    else{
      alert("Please enter a task name");
    }
  }

  messageCouldown(){
    console.log("messageCouldown");
    this.setAdded(true);
    runTask(this,() => {
      this.setAdded(false);
    }, 3000);
  }
}
