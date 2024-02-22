import Model, { attr } from '@ember-data/model';

export default class TaskModel extends Model {
  @attr('string') name!: string;
  @attr('string') date!: string;
  @attr('boolean') status!: boolean;
  @attr('boolean') hide!: boolean;
}
