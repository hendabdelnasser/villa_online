import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'projects/getting-started/src/environments/environment';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {


  form: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  userType:number=3;
  userId:number=2;
  error:string=''

  constructor(private _apiService: ApiService, private fb: FormBuilder,
     private _router: Router,private message:NzMessageService) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });
  }

  forget() {
    this.isSubmitted = true;
    let email=this.form.controls['email'].value;
    let password =this.form.controls['password'].value
    if (this.form.valid) {
      this._apiService.post(`/services/app/ChangePassword/ResetPasswordByEmail?Email=${email}&NewPassword=${password}&TenantId=1`).subscribe((response) => {
        // @ts-ignore
        if (response['success']) {
          // @ts-ignore
          // console.log(response)
        this.message.create('success',this.error || 'تم تغيير كلمة المور بنجاح');
          this._router.navigate(['/login'])
        }
      }, (error)=>{
        // console.log(error.error.error.details)
        this.error=error.error.error.details;
        this.message.create('error',this.error || 'تاكد من البيانات المدخلة');
        // this.form.reset();
        this.error=''
      });
    }
  }


}


