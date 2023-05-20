import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) {}


  get(path:string, config?:object)
  {
    return this._http.get(environment.baseUrl +  path, {
      ...config,
      headers: {
        'Authorization': this.getToken() ?? ''
      },
    });
  }

  post(path:string, body:any, config?: any)
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

  getToken(): string|undefined
  {
    return localStorage['token'] && `Bearer ${localStorage['token']}`;
  }

}
