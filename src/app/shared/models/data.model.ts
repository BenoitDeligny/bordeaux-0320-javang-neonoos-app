import { T } from '@angular/cdk/keycodes';

export class Data<T> {
  [x: string]: any;
  type: string;
  id: number;
  attributes: T;
  relationships: any;

  constructor(constructor: new (input?: T)  => T, type: string, data?: Data<T>) {
    if (data) {
      Object.assign(this, data);
      this.attributes = new constructor(this.attributes);
    } else {
      this.type = type;
      this.attributes = new constructor();
    }
  }
}
