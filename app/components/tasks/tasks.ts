import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import date from 'ember-boilerplate/utils/date';
import { runTask } from 'ember-lifeline';
import type Task  from 'ember-boilerplate/interface/Task';
import store from 'ember-boilerplate/services/store';
import { inject as Service } from '@ember/service'; //TO FIX ID PROBLEME



interface TasksSignature {
  // The arguments accepted by the component
  Args: {
    startTasksTab: Task[];
  };
  // Any blocks yielded by the component
  Blocks: {
    default: []
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class TasksComponent extends Component<TasksSignature> {
  defaultStatus = false;
  userModifyingTask = false;
  indexTaskModifying = 0;

  @Service store: Service;

  @tracked
  allTasks: Task[] = [];

  @tracked
  taskname = '';

  @tracked
  date = '';


  @tracked
  isAdded = false;

  @tracked
  bannerMessage = "";

  @tracked
  bannerBgColor = "";


  @action
  updateTasksTab() {
    this.allTasks = [...this.allTasks, ...this.args.startTasksTab];
  }

   @action
  setAdded(value: boolean) {
    this.isAdded = value;
  }

  @action
  async addTask(name: string, date: string) {
    if(this.userModifyingTask){
      this.bannerMessage = "Task modified successfully";
      this.bannerBgColor = "bg-crayon";
      this.store.peekRecord('task', this.allTasks[this.indexTaskModifying]!.id).destroyRecord();
      this.store.createRecord('task', {name: name, date: date, status: this.allTasks[this.indexTaskModifying]!.status}).save();
      this.allTasks[this.indexTaskModifying] = { id :this.allTasks[this.indexTaskModifying]!.id , name, date, status: this.allTasks[this.indexTaskModifying]!.status};
      this.allTasks = [...this.allTasks];
      this.userModifyingTask = false;
      this.indexTaskModifying = 0;
    }
    else{
      this.bannerMessage  = "Task added successfully";
      this.bannerBgColor = "bg-checkedGreen";
      this.store.createRecord('task', {name: name, date: date, status: this.defaultStatus}).save();
      this.filterByAll();
    }
    this.messageCouldown();
  }

  @action
  changeStatus(index: number) {
    const task : Task = {date: this.allTasks[index]!.date, name: this.allTasks[index]!.name, status: this.allTasks[index]!.status, id: this.allTasks[index]!.id };
    this.allTasks[index] = { ...task, status: !task.status };
    this.allTasks = [...this.allTasks];
    this.store.peekRecord('task', this.allTasks[index]!.id).save();
  }

  @action
  SuppTask(index: number) {
    if (this.userModifyingTask && this.indexTaskModifying == index) {
      this.userModifyingTask = false;
    }
    let taskId = this.allTasks[index]?.id;
    this.store.peekRecord('task', taskId).destroyRecord();
    this.indexTaskModifying = index;
    this.allTasks.splice(index,1 );
    this.allTasks = [...this.allTasks];
  }

  @action
  async SuppAllTask() {
    this.userModifyingTask = false;
    this.indexTaskModifying = 0;
    let tasks = await this.store.findAll("task");
    tasks.forEach((task: Task) => {
      task.destroyRecord();
    });
    this.filterByAll();
    this.bannerMessage  = "Task deleted successfully";
    this.bannerBgColor = "bg-deleteRed";
    this.messageCouldown();
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
  async filterByAll(){
    let startTasksTab: Task[] = [];
    const tasks = await this.args.startTasksTab;
    tasks.forEach((task: Task) => {
      startTasksTab = [...startTasksTab, task]
    });
    this.allTasks = [...startTasksTab];
  }

  @action
  async filterByPending(){
    let startTasksTab: Task[] = [];
    const tasks = await this.store.findAll("task");
    tasks.forEach((task: Task) => {
      if(task.status === false){
        startTasksTab.push({id: task.id, name: task.name, date : task.date, status: task.status});
      }
    });
    this.allTasks = [...startTasksTab];
  }

  @action
  async filterByCompleted(){
    let startTasksTab: Task[] = [];
    const tasks = await this.store.findAll("task");
    tasks.forEach((task: Task) => {
      if(task.status === true){
        startTasksTab.push({id: task.id, name: task.name, date : task.date, status: task.status});
      }
    });
    this.allTasks = [...startTasksTab];
  }


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
