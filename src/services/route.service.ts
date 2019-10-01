import _ from 'underscore';

export class RouteService {
  static params() {
    const search = location.hash.split('?')[1];
    if (search === undefined) { return {}; }
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  }

  static queryString(params) {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
  }

  static path() {
    return location.hash.split('?')[0].replace('#/', '').replace(/\/$/, '');
  }

  static host() {
    return location.host;
  }
  static subdomain() {
    return location.hostname.split('.')[0];
  }

  static current(routeConfig: {path: string, component: string, attributes?: any}[]) {
    return {..._.findWhere(routeConfig, {path: RouteService.path()})};
  }
}
