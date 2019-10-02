import {CrudHttpService} from "./crud.service";

export class AssignmentHttpService extends CrudHttpService {
  constructor() {
    super('assignments');
  }
}
