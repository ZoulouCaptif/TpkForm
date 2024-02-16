import Component from "@glimmer/component";
import { action } from "@ember/object";

interface taskSignature {
  Args:
  {
    task: { title: string, content: string, status: boolean, hide:boolean },
  };
  Blocks: {
    default: []
  };
  Element: null;
}

export default class TaskComponent extends Component<taskSignature> {

  get status() {
    console.log(this.args.task.status)
    return this.args.task.status? "Completed" : "Pending";
  }
}

