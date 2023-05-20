import { UserModel } from './../../../services/models/userModel';
import { NzMessageService } from 'ng-zorro-antd/message';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class NewServiceComponent implements OnInit {

  isUpdate: boolean = false;

  service: { name: string, description: string, phases: any } = {
    name: '',
    description: '',
    phases: []
  };

  originalPhaseObj: { id: number, title: string, implementPeriod: string, implementPeriodType: string, userId: number, data:string[],inputs: string[], outputs: string[] } = {
    id: 0,
    title: '',
    implementPeriod: '',
    implementPeriodType: '',
    userId: 0,
    inputs: [],
    outputs: [],
    data:[]
  };


  phases: Array<{ id: number, title: string, implementPeriod: string, implementPeriodType: string, userId: number,data:string[], inputs: string[], outputs: string[] }> = [
    JSON.parse(JSON.stringify(this.originalPhaseObj))
  ];

  inputs: Array<{ name: string, id: number }> = [];
  outputs: Array<{ name: string, id: number }> = [];
  data: Array<{ name: string, id: number }> = [];

  isLoaded: boolean = false;
  isCreatedSuccessfully: boolean = false;
  isHasCreationError: boolean = false;
  isHasUpdateError: boolean = false;
  isUpdatedSuccessfully: boolean = false;
  buttonLoaded:boolean=false;
  errorMessage: string|null = 'برجاء مراجعه البيانات المدخله';
  users: UserModel[]= [];

  constructor(
    private _apiService: ApiService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private messages:NzMessageService) {
  }


  ngOnInit(): void {
    this._activatedRoute.params.subscribe(response => {
      if(response['id']) {
        this.isUpdate = true;
        this.getServiceData(response['id']);
      } else {
        this.isLoaded = true;
      }
    })
    this.getInputsAndOutputs();
    this.getUserByType(2);
  }

  getInputsAndOutputs() {
    this._apiService.get('/services/app/Service/GetInputOuput', {
      parameters: {
        type: 0
      }
    }).subscribe((response) => {
      // @ts-ignore
      this.inputs = response['result'] ?? [];
    }, console.error);

    this._apiService.get('/services/app/Service/GetInputOuput', {
      parameters: {
        type: 1
      }
    }).subscribe((response) => {
      // @ts-ignore
      this.outputs = response['result'] ?? [];
    }, console.error);
    this._apiService.get('/services/app/Service/GetInputOuput', {
      parameters: {
        type: 2
      }
    }).subscribe((response) => {
      // @ts-ignore
      this.data = response['result'] ?? [];
    }, console.error);
  }

  addNewPhase() {
    this.phases.push(JSON.parse(JSON.stringify(this.originalPhaseObj)));
    // console.log(this.phases)
  }

  deleteCurrentPhase(index: number) {
    this.phases.splice(index, 1);
  }

  checkIsPhasesHasLength(): boolean {
    return this.phases.length === 1
  }

  addNewService() {
    this.buttonLoaded=true;
    let emptyPhase=this.phases.filter(x => x.userId===0);
    // console.log('empty',emptyPhase)
    if(emptyPhase.length !== 0){
      this.messages.create('error','من فضلك ادخل بيانات المرحلة')
    }else{
       this._apiService.post('/services/app/Service/CreateNew', {...this.service, phases: this.phases}).subscribe((response) => {
      // console.log(response);
      this.createdSuccessfully();
    }, (error) => {
      this.createdFail(error?.error?.error?.validationErrors);
      this.resetAlert(5000);
    }, () => {
      this.resetAlert(5000);
    });
    }

  }

  private getServiceData(id: string) {
    this._apiService.get(`/services/app/Service/Get?Id=${id}`).subscribe(response => {
      // @ts-ignore
      this.service = response['result'];
      this.phases = this.service.phases ?? [JSON.parse(JSON.stringify(this.originalPhaseObj))];
    }, (error) => {
      this.isLoaded = true;
    }, () => {
      this.isLoaded = true;
      // console.log('now', this.isLoaded);
    })
  }

  private getUserByType(typeId: number)
  {
    this._apiService.get(`/services/app/User/GetAllUserByType?TypeID=${typeId}`).subscribe(response => {
      // @ts-ignore
      if(response['error']) {

      } else {
        // @ts-ignore
        this.users = response['result'];
        // console.log(this.users)
      }
    });
  }

  private createdSuccessfully()
  {
    this.isHasCreationError = false;
    this.isCreatedSuccessfully = true;
    this.buttonLoaded=false;
    this.messages.create('success', `تم اضافة الخدمة بنجاح`);
    this._router.navigateByUrl('/project-manager');

  }

  private updatedSuccessfully()
  {
    this.isHasUpdateError = false;
    this.isUpdatedSuccessfully = true;
    this.buttonLoaded=false;
    this.messages.create('success', `تم تعديل الخدمة بنجاح`);
    this._router.navigateByUrl('/project-manager');
  }

  private createdFail(messages: any)
  {
    this.isCreatedSuccessfully = false;
    this.isHasCreationError = true;
    this.buttonLoaded=false;
    this.messages.create('error',messages);
  }

  private resetAlert(ms : number)
  {
    setTimeout(() => {
      this.isHasCreationError = this.isCreatedSuccessfully = this.isUpdatedSuccessfully = this.isHasUpdateError = false;
    }, ms);
  }

  updateService() {
    this.buttonLoaded=true;
    let emptyPhase=this.phases.filter(x => x.userId===0);
    // console.log('empty',emptyPhase)
    if(emptyPhase.length !== 0){
      this.messages.create('error','من فضلك ادخل بيانات المرحلة')
    }else{
    this._apiService.put('/services/app/Service/Update', {...this.service, phases: this.phases}).subscribe((response) => {
      this.updatedSuccessfully();
    }, (error) => {
      this.updatedFail();
      this.resetAlert(5000);
    }, () => {
      this.resetAlert(5000);
    });
  }
  }
  clearForm() {
    this.service = {
      name: '',
      description: '',
      phases: []
    };
    this.phases = [JSON.parse(JSON.stringify(this.originalPhaseObj))];
  }

  private updatedFail()
  {
    this.isUpdatedSuccessfully = false;
    this.isHasUpdateError = true;
    this.buttonLoaded=false;
  }
}



