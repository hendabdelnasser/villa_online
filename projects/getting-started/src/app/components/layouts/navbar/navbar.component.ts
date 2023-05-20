import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlartModel } from '../../../services/models/alertModel';
import { UserModel } from '../../../services/models/userModel';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedStatus: boolean = false;
  userName: string = '';
  user:UserModel=new UserModel;
  userType:number=4;
  userId:number=4;
  alertLength=5;
  count:number=1;
  allShowAlerts:AlartModel[]=[];
  constructor(
    public _router: Router, private _userService: UserService,
     private _apiService:ApiService,private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getUserName();
    this._userService.getLoggedStatus().subscribe(status => {
      // console.log('status', status);
      this.loggedStatus = status;
    });

    // console.log("name", this.userName)

  }
  getUserName() {
    this.userName = this._userService.getUserName() ?? 'مستخدم جديد';

  }

}
