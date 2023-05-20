import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedStatus:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _apiService: ApiService, private _route: Router) {
      this.loggedStatus.next(this.isLogged());
  }

  isLogged(): boolean
  {
    return !!localStorage['token'];
  }

  getLoggedStatus()
  {
    return this.loggedStatus.asObservable();
  }

  setLoggedStatus(status:boolean): void
  {
    this.loggedStatus.next(status);
  }

  login(path:string, credential:any)
  {
    return this._apiService.post(path, credential);
  }

  register(path:string, credential:any)
  {
    return this._apiService.post(path, credential);
  }
  reset(path:string, credential:any)
  {
    return this._apiService.post(path, credential);
  }
  logout()
  {
    // localStorage.clear();
    // this.setLoggedStatus(false);
    // this._route.navigateByUrl('/login');
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // let token = localStorage.getItem('token');
    this._route.navigate(['/login']);
    this.setLoggedStatus(false);
  }

  getUserName(): string|undefined
  {
    return localStorage['user'] && JSON.parse(localStorage['user'])['userName'];
  }

  getToken(): string|undefined
  {
    return localStorage['token'] && `Bearer ${localStorage['token']}`;
  }

}
