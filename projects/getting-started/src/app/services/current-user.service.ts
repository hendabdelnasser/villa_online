import { Injectable , OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService implements OnInit  {

  currentUser = {userName: '', userId: 0}

  constructor() { }

  ngOnInit(){
    this.GetCurrentUser();
  }

  GetCurrentUser(){
    let user = <any>localStorage.getItem('user');

    if(user){
      this.currentUser.userId = user.userId;
      this.currentUser.userName = user.userName
    }
  }
  
}
