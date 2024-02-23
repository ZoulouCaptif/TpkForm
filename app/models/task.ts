import Model, { attr } from '@ember-data/model';

export default class Task extends Model {
  @attr('string') name: string;
  @attr('string') date: string;
  @attr('boolean') status: boolean;
  @attr('boolean') hide: boolean;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    task: Task;
  }
}
