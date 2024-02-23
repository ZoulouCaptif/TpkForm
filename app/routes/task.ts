import Route from '@ember/routing/route';
import { inject as Service } from '@ember/service';
import { parseJsonSafe } from '@mikro-orm/core';
import { array } from 'yup';
import type Task from 'ember-boilerplate/interface/Task';

export default class TaskRoute extends Route {

  @Service store: Service;

  async getTasks(){
      return await this.store.findAll("task");
  }

  async model() {
    return this.getTasks();
  }

}
