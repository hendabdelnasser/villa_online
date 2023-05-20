import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import { UsernameValidator } from '../username-validator';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-client-creation',
  templateUrl: './client-creation.component.html',
  styleUrls: ['./client-creation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientCreationComponent implements OnInit {

  isSubmitted: boolean = false;
  userTypes: Array<{ label: string, value: number }> = [
    {
      label: 'مستخدم',
      value: 0
    },{
      label: 'عميل',
      value: 1
    },{
      label: 'مقاول',
      value: 2
    }
  ];

  form: FormGroup = new FormGroup({});
  regions: Array<{ id: number, name: string }> = [];
  errorMessage: string|null = 'برجاء مراجعه البيانات المدخله';
  isUpdate: boolean = false;
  isLoaded: boolean = false;
  isCreatedSuccessfully: boolean = false;
  isHasCreationError: boolean = false;
  isHasUpdateError: boolean = false;
  isUpdatedSuccessfully: boolean = false;
  buttonLoaded:boolean=false;
  userId:number=0;
  private getRegions()
  {
    this._apiService.get('/services/app/Region/GetAll').subscribe(response => {
      // @ts-ignore
      this.regions = response['result'];
    })
  }

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _apiService: ApiService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private message: NzMessageService) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(response => {
      if(response['id']) {
        this.isUpdate = true;
        this.getClientData(response['id']);
        this.userId=response['id'];
      } else {
        this.isLoaded = true;
      }
    });

    this.form = this.fb.group({
      id:[''],
      userName: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('[.a-zA-Z0-9 ]*'),
        UsernameValidator.cannotContainSpace
        ]
      ],
      name:['',[Validators.required]],
      emailAddress: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
      password: [123, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      regionId: ['', [Validators.required]],
      userType: [this.userTypes[0], [Validators.required]],
      notes: [''],
      tenantName: ['default', [Validators.required]]
    });
    this.getRegions();
  }

  register() {
    this.isSubmitted = true;
    this.buttonLoaded=true;
    if(this.form.valid) {
      for(let item in this.form.value) {
        if(item === 'userType' || item === 'regionId') {
           this.form.value[item] = +this.form.value[item];
        }
      }
      this._userService.register('/services/app/User/Create', this.form.value).subscribe((response) => {
          // console.log(response);

          this.createdSuccessfully()
      }, (error) => {
        this.createdFail(error?.error?.error?.message);
        this.resetAlert(5000);
      }, () => {
        this.resetAlert(5000);
      })
    }
  }

  clearForm() {
    if(confirm('هل انت متأكد؟')){
      this.form.reset();
      this.isSubmitted = false;
      this.resetAlert(0);
    }
  }

  private getClientData(id: string) {
    this._apiService.get(`/services/app/User/Get?Id=${id}`).subscribe(response => {
      // @ts-ignore
      this.form.patchValue(response['result']);
    }, (error) => {
      this.isLoaded = true;
    }, () => {
      this.isLoaded = true;
    })
  }

  private createdSuccessfully()
  {
    this.isHasCreationError = false;
    this.isCreatedSuccessfully = true;
    this.buttonLoaded=false;
    this.message.create('success', `تم اضافة المستخدم بنجاح`);
    this._router.navigateByUrl('/project-manager');
  }

  private updatedSuccessfully()
  {
    this.isHasUpdateError = false;
    this.isUpdatedSuccessfully = true;
    this.buttonLoaded=false;
    this.message.create('success', `تم تعديل بيانات المستخدم بنجاح`);
    this._router.navigateByUrl('/project-manager');
  }

  private createdFail(messages: any)
  {
    this.isCreatedSuccessfully = false;
    this.isHasCreationError = true;
    this.buttonLoaded=false;
    this.message.create('error', messages);
  }

  private resetAlert(ms : number)
  {
    setTimeout(() => {
      this.isHasCreationError = this.isCreatedSuccessfully = this.isUpdatedSuccessfully = this.isHasUpdateError = false;
    }, ms);
  }

  updateClient() {
    this.isSubmitted = true;
    if(this.form.valid) {
      this._apiService.put('/services/app/User/Updates', this.form.value).subscribe((response) => {
        this.updatedSuccessfully();
      }, (error) => {
        this.updatedFail(error?.error?.error?.message);
        this.resetAlert(5000);
      }, () => {
        this.resetAlert(5000);
      });
    }
  }

  private updatedFail(messages:any)
  {
    this.isUpdatedSuccessfully = false;
    this.isHasUpdateError = true;
    this.buttonLoaded=false;
    this.message.create('error', messages);
  }



}
