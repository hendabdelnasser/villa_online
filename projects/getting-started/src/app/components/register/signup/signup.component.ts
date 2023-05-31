import { UserModel } from './../../../services/models/userModel';
import { ApiService } from './../../../services/api.service';
import { InputsAddModelComponent } from './../inputs-add-model/inputs-add-model.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, ElementRef, Output, EventEmitter } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { environment } from 'projects/getting-started/src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  userType:number=3;
  userId:number=2;
  error:string='';
 imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/panal/`;

  @Output() customerChange:EventEmitter<number> =new EventEmitter<number>();

  constructor(private _userService: UserService, private fb: FormBuilder,
     private _router: Router,private message:NzMessageService,private _apiService:ApiService,
     private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }
  ngOnInit(): void {
    this.getSignInImg()
    this.form = this.fb.group({
      userNameOrEmailAddress: ['', [Validators.required]],
      password: ['', [Validators.required]],
      tenantName: ['default', [Validators.required]],
      rememberClient: [true, [Validators.required]]
    });
  }

  setUserDataInLocalStorage(userObj: Object)
  {
    localStorage['user'] = JSON.stringify(userObj);
    // @ts-ignore
    localStorage['token'] = userObj['accessToken'];

  }
  signIn=[{url:''}]
  getSignInImg(){
    this._apiService.get(`/services/app/HomePanal/GetAllSigneInPanal?tenantId=1`).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.signIn =res['result']

        }
      })
    )
  }
userName:string='';
  login() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this._userService.login('/TokenAuth/Authenticate', this.form.value).subscribe((response) => {
        // @ts-ignore
        if (response['success']) {
          // @ts-ignore
          this.setUserDataInLocalStorage(response['result']);
          this._userService.setLoggedStatus(true);
          // console.log(response)
          // @ts-ignore
          this.userType=response['result'].userType;
          // @ts-ignore
          this.userId=response['result'].userId;
          this.customerChange.emit(this.userId)
          // @ts-ignore
          this.userName=response['result'].userName;
          if(this.userType === 0){
            this._router.navigateByUrl('/project-manager');
          }else if(this.userType === 2){
            this._router.navigateByUrl('/contractor-projects');
          }else{
            this._router.navigateByUrl('/contractor-projects');
          // @ts-ignore
              if(response['result'].currantProject){
              this.createCustomButtonModal()

              }
          }

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
  RequiredInCurrant=[]
  createCustomButtonModal(): void {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'طلب مرفقات و بيانات من العميل',
      nzContent: InputsAddModelComponent,
      nzFooter: [
        {
          label: 'لاحقا',
          shape: 'round',
          onClick: () => modal.destroy()
        }
      ]
    });
  }

}
