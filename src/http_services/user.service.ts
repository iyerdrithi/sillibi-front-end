import {CrudHttpService} from "./crud.service";

export class UserHttpService extends CrudHttpService {
  constructor() {
    super('users');
  }

  headers() {
    return {};
  }
}
