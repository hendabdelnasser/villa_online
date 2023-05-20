import { Component, EventEmitter, OnInit, Output, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  userType:number=3;
  userId:number=2;
  error:string=''

  constructor(private _userService: UserService, private fb: FormBuilder,
     private _router: Router,private message:NzMessageService) { }
  ngOnInit(): void {
    this.login()
    this.form = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  setUserDataInLocalStorage(userObj: Object)
  {
    localStorage['user'] = JSON.stringify(userObj);
    // @ts-ignore
    localStorage['token'] = userObj['accessToken'];

  }
  login(){
    let user={
      userNameOrEmailAddress: "admin",
      password: "123qwe",
      tenantName: "default",
      rememberClient: true
    }
    this._userService.login('/TokenAuth/Authenticate', user).subscribe((response) => {
      // @ts-ignore
      if (response['success']) {
        // @ts-ignore
        this.setUserDataInLocalStorage(response['result']);
        this._userService.setLoggedStatus(true);
  }
})
  }
  userName:string='';
  reset() {
    // this.isSubmitted = true;
    // if (this.form.valid) {
    //   this._userService.reset('/TokenAuth/ResetPassword?Id=5&NewPassword=123456').subscribe((response) => {
    //     // @ts-ignore
    //     if (response['success']) {
    //       // @ts-ignore


    //     }
    //   }, (error)=>{
    //     console.log(error.error.error.details)
    //     this.error=error.error.error.details;
    //     this.message.create('error',this.error || 'تاكد من البيانات المدخلة');
    //     // this.form.reset();
    //     this.error=''
    //   });
    // }
  }


}

