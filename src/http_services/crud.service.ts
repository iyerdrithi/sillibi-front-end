import {SessionStorageService} from '../services/session-storage.service';
import {SessionService} from '../services/session.service';

export class CrudHttpService {
  static BASE_URL = `https://sillibi-group.herokuapp.com`;
  url: string;
  token: string;
  constructor(apiUrl: string) {
    // const env: any = EnvironmentService.config();
    // this.url = `${env.schema}://${env.host}/api/${apiUrl}`;
    // console.log(env);
    this.url = `https://sillibi-group.herokuapp.com/${apiUrl}`; //`http://localhost:3000/${apiUrl}`;
  }

  headers(): any {
    const token = SessionService.get().token;
    return {Authorization: `Bearer ${token}`};
  }

  async query(params: any, cache: boolean = false) {
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const fullUrl = `${this.url}?${queryString}`;
    return await this.getRequest(fullUrl, cache);
  }


  async findBy(params: any, cache: boolean = false) {
    const id = params.id;
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const fullUrl = `${this.url}/${id}?${queryString}`;
    return await this.getRequest(fullUrl, cache);
  }


  async find_by(params: any, cache: boolean = false) {
    const id = params.id;
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const fullUrl = `${this.url}/${id}?${queryString}`;
    return await this.getRequest(fullUrl, cache);
  }

  async upsert(payload: any) {
    if (payload.id === null || payload.id === undefined) {
      return this.post(payload);
    } else {
      return this.put(payload);
    }
  }

  async put(payload: any) {
    if (payload.id === null || payload.id === undefined) { return; }
    const fullUrl = `${this.url}/${payload.id}`;
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: {...this.headers(), 'Content-Type': 'application/json'},
      mode: 'cors',
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(payload),

    });
    return await response.json();
  }

  async delete(params: any) {
    if (params.id === null || params.id === undefined) { return; }
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    const fullUrl = `${this.url}/${params.id}?${queryString}`;
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: this.headers(),
      mode: 'cors',
    });
    return await response;
  }

  async post(payload: any, params?: any) {
    let fullUrl = '';
    if (params === undefined) {
      fullUrl = `${this.url}`;
    } else {
      const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
      fullUrl = `${this.url}?${queryString}`;
    }

    const response = await fetch(fullUrl, {
      method: 'POST',
      redirect: 'follow', // manual, *follow, error

      headers: {...this.headers(), 'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(payload),
    });
    return await response.json();
  }

  async find(id: string, cache: boolean = false) {
    const fullUrl = `${this.url}/${id}`;
    return await this.getRequest(fullUrl, cache);
  }

  async getRequest(fullUrl, cache: boolean = false) {
    const cachedData = SessionStorageService.get(fullUrl);
    if (cachedData && cache) {
      return cachedData;
    }
    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: this.headers(),
        mode: 'cors',
      });
      if (response.status === 204) {
        return [];
      } else if (response.status === 403) {
        // if (location.hash.includes('errors')) { return; }
        // location.hash = `/errors/unauthorized/?organization_id=${RouteService.params().organization_id}`;
        return;
      } else {
        const data = await response.json();
        if (cache) {
          SessionStorageService.set(fullUrl, data);
        }
        return data;
      }
    } catch (error) {
      console.error(error);
      // if (location.hash.includes('errors')) { return; }
      // location.hash = `/errors/server/?organization_id=${RouteService.params().organization_id}`;
    }
  }

}
