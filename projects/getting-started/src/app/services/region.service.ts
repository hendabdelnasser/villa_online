import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
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

  getToken(): string|undefined
  {
    return localStorage['token'] && `Bearer ${localStorage['token']}`;
  }

}