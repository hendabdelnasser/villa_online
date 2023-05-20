import { UserModel } from './../../../../services/models/userModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectService } from 'projects/getting-started/src/app/services/project.service';
import { NotesModel } from 'projects/getting-started/src/app/services/models/notesModel';
import { phaseModel, projectModel } from 'projects/getting-started/src/app/services/models/projectModel';
import { regionModel } from 'projects/getting-started/src/app/services/models/regionModel';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.scss']
})
export class NotesDetailComponent implements OnInit {
  id:number=0;
  projectDetails = new projectModel;
  userType:number=4;
  userId:number=0;
  user=new UserModel;
  region = new regionModel;
  projectPhase = new phaseModel;

  constructor(private _apiService: ProjectService, private route: ActivatedRoute,
    private router: Router,private message:NzMessageService) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    // console.log(this.id);

  }

  ngOnInit(): void {
    this.getProjectById(this.id)
    this.getPhaseByProjectId(this.id)
    this.getNotesForCustomer()
    this.getCurrentUser()
  }

  private getProjectById(id: number) {
    this._apiService.get(`/services/app/Project/Get?Id=${id}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.projectDetails = response['result'];
        // console.log(this.projectDetails);
        this.getRegionById(this.projectDetails.regionId)
        this.getConstructorById(this.projectDetails.userId)
      }
    }, console.error);
  }
  private getRegionById(Id: number = 1) {
    this._apiService.get(`/services/app/Region/Get?Id=${Id}`).subscribe(response => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.region = response['result'];
        // console.log(this.region);
      }
    }, console.error);
  }
  private getConstructorById(id: number = 1) {
    this._apiService.get(`/services/app/User/Get?Id=${id}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.constructors = response['result'];
      }
    }, console.error);
  }
  getCurrentUser(){
    this._apiService.get(`/services/app/Session/GetCurrentLoginInformations`).subscribe(
      (res=>{
        //@ts-ignore
        this.user=res.result.user;
        this.userId=this.user.id;
        this.userType=this.user.userType
        this.getNotesForCustomer()
      })
    )
  }
  private getPhaseByProjectId(id: number = 1) {
    this._apiService.get(`/services/app/Project/GetProjectPhaseCurrant?Id=${id}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.projectPhase = response['result'];
      }
    }, console.error);
  }
  //chatNotes
  chatNotes:string="";
  sendChat(){
    if( this.projectPhase.id ==0){
      this.message.create('error','لا توجد مرحلة حالية')
    }else{
      let chat={
        projectId:this.id,
        customerId: this.projectDetails.userId,
        userId: this.userId,
        projectPhaseId: this.projectPhase.id,
        noteBody: this.chatNotes
      }
      this._apiService.post(`/services/app/Note/CreateNew`,chat).subscribe(
        (res=>{
          //@ts-ignore
          if(res['success']){
            // console.log('added chat')
            this.chatNotes=''
            this.getNotesForCustomer()
        }
      })
      )
    }

  }
  allNotes:NotesModel[]=[]
 getNotesForCustomer(){
   this._apiService.get(`/services/app/Note/GetAllForProject?ProjectId=${this.id}`).subscribe(
     (res=>{
       //@ts-ignore
       if(res['success']){
         //@ts-ignore
         this.allNotes=res['result']
       }
     })
   )
 }
}
