import {CrudHttpService} from "./crud.service";

export class CourseHttpService extends CrudHttpService {
  constructor() {
    super('courses');
  }

  headers() {
    return {};
  }
}
