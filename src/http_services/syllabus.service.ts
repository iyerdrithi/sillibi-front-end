import {CrudHttpService} from "./crud.service";

export class SyllabusHttpService extends CrudHttpService {
  constructor() {
    super('syllabuses');
  }
}
