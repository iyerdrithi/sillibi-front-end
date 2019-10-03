export class SessionService {
  static get(): {token: string, permissions: any, user_id: string} {
    const cached = JSON.parse(localStorage.getItem('session')) || {};
    return {
      permissions: cached.permissions || {},
      token: cached.token,
      user_id: cached.user_id
    };
  }

  static set(data) {
    localStorage.setItem('session', JSON.stringify(data));
  }

  static clear() {
    localStorage.removeItem('session');
  }
}
