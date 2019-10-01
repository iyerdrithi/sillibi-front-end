export class SessionStorageService {
  static get(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  static set(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}
