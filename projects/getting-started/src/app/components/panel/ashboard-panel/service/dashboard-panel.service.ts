import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/getting-started/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardPanelService {

  constructor(private _http: HttpClient) { }

  get(path:string, config?:object)
  {
    return this._http.get(environment.baseUrl +  path, {
      ...config,
      headers: {
        'Authorization': this.getToken() ?? ''
      },
    });
  }

  post(path:string, body?:any, config?: any)
  {
    return this._http.post(environment.baseUrl +  path, body, {
      ...config,
      headers: {
        'Authorization': this.getToken() ?? ''
      },
    });
  }

  put(path:string, body:any, config?: any)
  {
    return this._http.put(environment.baseUrl +  path, body, {
      ...config,
      headers: {
        'Authorization': this.getToken() ?? ''
      },
    });
  }

  delete(path:string, config?: Object)
  {
    return this._http.delete( environment.baseUrl + path, {
      ...config,
      headers: {
        'Authorization': this.getToken() ?? ''
      },
    });
  }

  getToken(): string|undefined
  {
    return localStorage['token'] && `Bearer ${localStorage['token']}`;
  }
}
