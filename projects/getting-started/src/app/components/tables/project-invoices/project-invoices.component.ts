import { InvoiceModel } from './../../../services/models/invoicesModel';
import { UserModel } from './../../../services/models/userModel';
import {  projectModel, serviceModel } from 'projects/getting-started/src/app/services/models/projectModel';
import { FormBuilder } from '@angular/forms';
import { projectTypeModel } from './../../../services/models/projectModel';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaypalAppStyleModel, PaypalAppFundingModel, PaypalAngularService } from 'paypal-angular';
import { environment } from 'projects/getting-started/src/environments/environment';
import {ApiService} from "../../../services/api.service";
import { regionModel } from '../../../services/models/regionModel';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-project-invoices',
  templateUrl: './project-invoices.component.html',
  styleUrls: ['./project-invoices.component.scss']
})
export class ProjectInvoicesComponent implements OnInit {

  Projects:projectModel[] = [];
  // Imgurl = environment.baseUrlNotification+ "Uploads/Project/";
  imgUrl:string='http://villaonline.co/wwwroot/Uploads/';
  isLoaded:boolean=false;
  filter:number=2;
  payment: any;
  regions:regionModel[]=[];
  region:regionModel=new regionModel;
  projectType:projectTypeModel[]=[];
  locale = 'es_ES';
  env = 'sandbox';
  commit = true;
  user:UserModel=new UserModel;
userType:number=5;
userId:number=0;
  style: PaypalAppStyleModel = {
    label: 'paypal',
    color: 'gold',
    layout: 'vertical',
    shape: 'rect',
  };

  searchProject:{ keyword?: string,regionId:number,projectType: number,date:Date,year:number}={
    keyword:'',regionId:0,projectType:0,date:new Date,year:2022
  }
  onAuthorize(data: any, actions: any) {
    return actions.payment.execute().then((payment: any) => {
      // console.log('done');
    }, console.error);
  };

  constructor( private _router: Router,private paypalAngularService: PaypalAngularService,
    private _apiService: ApiService,private messages:NzMessageService,private fb:FormBuilder) { }

  totalAmount: number = 10;

  setTotalAmount(newValue: string): void
  {
    this.totalAmount = +newValue;
  }

  ngOnInit(): void {
    this.paypalAngularService.getPaypalRef();
    this.payment = (data: any, actions: any) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: {
                total: this.totalAmount,
                currency: 'USD'
              }
            }
          ]
        }
      });
    };
    this.getAllRegion();

    this.getAllProjects();
    this.getProjectType()
    this.getCurrentUser();

    this.form = this.fb.group({
      keyword: [''],
      regionId: ['0'],
      projectType: ['0'],
      year:[''],
      userType: this.userType,
      userID: this.userId,
    });
  }

  /**
   * About Services
   */


  private getAllProjects(tenantId: number = 1) {
    this._apiService.get(`/services/app/Project/GetAll?tenantId=${tenantId}`).subscribe((response) => {
      // @ts-ignore
      if(!response['error']) {
        this.isLoaded=true;
        // @ts-ignore
        this.Projects = response['result'];

      }
    }, console.error);
}
private getProjectType(){
  this._apiService.get(`/services/app/ProjectType/GetAll`).subscribe((res)=>{
    // @ts-ignore
    if(res['success']){
      // @ts-ignore
      this.projectType=res['result']
    }
  })
}

getCurrentUser(){
  this._apiService.get(`/services/app/Session/GetCurrentLoginInformations`).subscribe(
    (res=>{
      // @ts-ignore
      this.user=res.result.user;
      this.userType=this.user.userType;
      this.userId=this.user.id
    })
  )
}
  form: FormGroup = new FormGroup({});

searchProjects(){
  // console.log(this.form.value)
  if(this.form.get('year')?.value === ''){
    this.form.patchValue({
      year:0,
      projectType:+this.form.get('projectType')?.value,
    regionId:+this.form.get('regionId')?.value,
    userType: this.userType,
    userID: this.userId,
    })
  }else{
  this.form.patchValue({
    year:this.form.get('year')?.value.getFullYear(),
    projectType:+this.form.get('projectType')?.value,
    regionId:+this.form.get('regionId')?.value,
    userType: this.userType,
    userID: this.userId,
  })
  }

  // console.log(this.form.value)
  this._apiService.post(`/services/app/Project/Search`,this.form.value).subscribe(
    (res)=>{
      // @ts-ignore
      if(res['success']){
        this.isLoaded=true;
        // @ts-ignore
        this.Projects=res['result']
        this.form.patchValue({
          year:''
        })
      }

    },console.error
  )
}



  newProject()
  {
    this._router.navigateByUrl('/new-project');

  }
  ProjectDetails(id:number)
  {
    this._router.navigateByUrl('/proj-dashboard/'+id);

  }

  getRegionById(id:number){
    // console.log(id)
    this._apiService.get(`/services/app/Region/Get?Id=${id}`).subscribe(
      (res)=>{
        // @ts-ignore
        this.region=res['result']
// console.log(this.region)
      }

    )
    return this.region.name
  }



/*about regions */
private getAllRegion() {
  this._apiService.get(`/services/app/Region/GetAll`).subscribe(response => {
    // @ts-ignore
    if (!response['error']) {
      this.isLoaded=true;
      // @ts-ignore
      this.regions = response['result'];
      // console.log(this.regions)
    }
  }, console.error);
}
getRegionName(regionId:number){
  let type:regionModel[];
  type=this.regions.filter(s=>s.id == regionId);
  return type[0]?.name
}

 projectName:string=''
 getProject(id:number){
  this._apiService.get(`/services/app/Project/Get?Id=${id}`).subscribe(
    (res=>{
      //@ts-ignore
      this.projectName=res['result'].name
    })
  )
  return this.projectName
 }
 filterProject(fil:number){
  this.filter=fil
 }
 deleteProject(id:number,index:number){
    this._apiService.delete(`/services/app/Project/Delete?Id=${id}`).subscribe((response) => {
      //@ts-ignore
      if(response['success']){
        this.Projects = this.Projects.filter((item, inx) => inx !== index);
        this.messages.create('success','تم حذف المشروع بنجاح')
      }

    }, (error=>{
      this.messages.create('error','لا يمكن حذف المشروع')
    })
    );
  }
}
