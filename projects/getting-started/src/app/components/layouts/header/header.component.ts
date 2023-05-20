import { NotesModel } from './../../../services/models/notesModel';
import { AlartModel } from './../../../services/models/alertModel';
import { UserModel } from './../../../services/models/userModel';
import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../../services/api.service';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
    this.getCurrentLoginUser();

    // console.log("name", this.userName)

  }

  logout() {
    this._userService.logout();
  }


  getUserName() {
    this.userName = this._userService.getUserName() ?? 'مستخدم جديد';

  }
  getCurrentLoginUser(){
    this._apiService.get(`/services/app/Session/GetCurrentLoginInformations`).subscribe(
      (res=>{
        //@ts-ignore
        this.user=res['result'].user;
        this.userType=this.user.userType;
        this.userId=this.user.id;
        this.getAlert()
    this.getAllAlerts()

      })
    )
  }
  //Alarts
  allAlerts:AlartModel[]=[];
  allAlertslength:number=0;
  items2:any

  getAlert(){
    if(this.userType == 0){
      this._apiService.get(`/services/app/Alert/GetByUser?UserId=${this.userId}`).subscribe(
        (res=>{
          //@ts-ignore
          if(res['success']){
            //@ts-ignore
            this.allAlertslength=res['result'].length;
            //@ts-ignore
            this.allAlerts=res['result'].slice(0,5)
            this.items2=this.allAlerts.map(a=>a.id)
          }
        })
      )
    }else if(this.userType == 2){
      this._apiService.get(`/services/app/Alert/GetToConestractor?UserId=${this.userId}`).subscribe(
        (res=>{
          //@ts-ignore
          if(res['success']){
            //@ts-ignore
            this.allAlertslength=res['result'].length;
            //@ts-ignore
            this.allAlerts=res['result'].slice(0,5)
            // console.log(this.allAlerts)
            this.items2=this.allAlerts.map(a=>a.id)
          }
        })
      )
    }else{
      this._apiService.get(`/services/app/Alert/GetToCustomer?UserId=${this.userId}`).subscribe(
        (res=>{
          //@ts-ignore
          if(res['success']){

            //@ts-ignore
            this.allAlertslength=res['result'].length;
            //@ts-ignore
            this.allAlerts=res['result'].slice(0,5)
            // console.log(this.allAlerts)
            this.items2=this.allAlerts.map(a=>a.id)
          }
        })
      )
    }
  }
  calculateDiff(dateSent:Date){
    // console.log(dateSent)
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    // console.log((currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),currentDate.getHours(),currentDate.getMinutes()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate(),dateSent.getHours(),dateSent.getMinutes())/(1000 * 60 * 60 * 24) )
    // return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),currentDate.getHours(),currentDate.getMinutes()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate(),dateSent.getHours(),dateSent.getMinutes()) ) /(1000 * 60 * 60 * 24));

    let diffMs = (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),currentDate.getHours(),currentDate.getMinutes()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate(),dateSent.getHours(),dateSent.getMinutes())); // milliseconds
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    // console.log(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes");
    if(diffDays == 0){
      return diffHrs + "ساعات و" + diffMins + " دقائق"
    }else if(diffHrs == 0){
      return diffDays + " ايام "
    }else if(diffMins == 0){
      return diffDays + " ايام, " + diffHrs + " ساعات"
    }else{
      return diffDays + " ايام, " + diffHrs + " ساعات, " + diffMins + " دقائق"
    }

  }
  items:any
  getAllAlerts(){
    if(this.userType == 0){
      this._apiService.get(`/services/app/Alert/GetAllToUser?UserId=${this.userId}`).subscribe(
        (res=>{
          //@ts-ignore
          if(res['success']){
            //@ts-ignore
            this.allShowAlerts=res['result']
            this.items=this.allShowAlerts.map(a=>a.id)
            // console.log(this.items)
          }
        })
      )
    }else if(this.userType == 2){
      this._apiService.get(`/services/app/Alert/GetAllToConestractor?UserId=${this.userId}`).subscribe(
        (res=>{
          //@ts-ignore
          if(res['success']){
            //@ts-ignore
            this.allShowAlerts=res['result']
            this.items=this.allShowAlerts.map(a=>a.id)
            // console.log(this.items)
          }
        })
      )
    }else{
      this._apiService.get(`/services/app/Alert/GetAllToCustomer?UserId=${this.userId}`).subscribe(
        (res=>{
          //@ts-ignore
          if(res['success']){
            //@ts-ignore
            this.allShowAlerts=res['result'];
            this.items=this.allShowAlerts.map(a=>a.id)
            // console.log(this.items)
          }
        })
      )
    }
  }
  readList(){
    this._apiService.post(`/services/app/Alert/ReadList`,this.items).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
          setTimeout(() => {
            this.getAllAlerts()
          }, 3000);
        }
      })
    )
  }
  readList2(){
    this._apiService.post(`/services/app/Alert/ReadList`,this.items2).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
          setTimeout(() => {
            this.getAlert()
          }, 3000);
        }
      })
    )
  }
}
