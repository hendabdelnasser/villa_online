import { regionModel } from 'projects/getting-started/src/app/services/models/regionModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { projectModel, projectTypeModel } from 'projects/getting-started/src/app/services/models/projectModel';
import { ApiService } from './../../services/api.service';
import { UserModel } from './../../services/models/userModel';
import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/getting-started/src/environments/environment';

@Component({
  selector: 'app-contractor-projects',
  templateUrl: './contractor-projects.component.html',
  styleUrls: ['./contractor-projects.component.scss']
})
export class ContractorProjectsComponent implements OnInit {
  user:UserModel=new UserModel;
  id:number=0;
  userType:number=0;
  userId:number=0;
  userName:string='';
  projects:projectModel[]=[];
  searchProject:projectModel[]=[];
  projectType:projectTypeModel[]=[];
  regions:regionModel[]=[]
  form:FormGroup= new FormGroup({});
  imgUrl:string= `${environment.baseUrl}/wwwroot/Uploads/`;
  isLoaded:boolean=false;

  constructor(private _apiservice:ApiService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getProjectType();
    this.getAllRegion();
    this.form = this.fb.group({
      keyword: [''],
      regionId: [0],
      projectType: [0],
      year:[''],
      userType: [this.userType],
    userID:[this.id],
    });
  }
  private getAllRegion() {
    this._apiservice.get(`/services/app/Region/GetAll`).subscribe(response => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.regions = response['result'];
        // console.log(this.regions)
      }
    }, console.error);
  }
  private getProjectType(){
    this._apiservice.get(`/services/app/ProjectType/GetAll`).subscribe((res)=>{
      // @ts-ignore
      if(res['success']){
        // @ts-ignore
        this.projectType=res['result']
      }
    })
  }
getCurrentUser(){
  this._apiservice.get(`/services/app/Session/GetCurrentLoginInformations`).subscribe(
    (res=>{
       // @ts-ignore
      if(res['success']){
         // @ts-ignore
        this.user=res['result'].user;
        // @ts-ignore
        this.id=this.user.id;
        this.userType=this.user.userType;
        this.userName=this.user.name;
        // console.log(this.user)
        if(this.userType === 2){
          this.getProjectsOfConstractor(this.id);
        }else{
          this.getProjectsOfCustomer(this.id)
            this.form.get('keyword')?.disable();
            this.form.patchValue({
              keyword:this.userName
            })
          }
      }
    })
  )
}
getProjectsOfConstractor(id:number){
  this._apiservice.get(`/services/app/Project/GetAllforConstructor?userId=${id}`).subscribe(
    (res)=>{
      // @ts-ignore
      if(res['success']){
        // @ts-ignore
        this.projects=res['result']
        this.isLoaded=true;
        // console.log(this.projects)
      }
    }
  )
}
getProjectsOfCustomer(id:number){
  this._apiservice.get(`/services/app/Project/GetAllforCustomer?userId=${id}`).subscribe(
    (res)=>{
      // @ts-ignore
      if(res['success']){
        // @ts-ignore
        this.projects=res['result'];
        this.isLoaded=true;
        // console.log(this.projects)
      }
    }
  )
}
projDetails(id:number){
  if(this.userType == 2){
  this.router.navigateByUrl('/proj-dashboard/'+id);
  }else{
  this.router.navigateByUrl('/proj-details/'+id);
  }
}
searchProjects(){
  if(this.form.get('year')?.value === ''){
    this.form.patchValue({
      year:0,
      projectType:+this.form.get('projectType')?.value,
      regionId:+this.form.get('regionId')?.value,
      userType: +this.userType,
      userID: +this.id,
    })
  }else{
  // console.log(this.id,this.userType)
    this.form.patchValue({
      year:this.form.get('year')?.value.getFullYear(),
      projectType:+this.form.get('projectType')?.value,
      regionId:+this.form.get('regionId')?.value,
      userType: +this.userType,
      userID: +this.id,
    })
  }

  // console.log(this.searchProject)
  this._apiservice.post(`/services/app/Project/Search`,this.form.value).subscribe(
    (res)=>{
      // @ts-ignore
      if(res['success']){
        // @ts-ignore
        this.projects=res['result']
this.form.patchValue({
  year:''
})
      }
    },console.error
  )
}
}
