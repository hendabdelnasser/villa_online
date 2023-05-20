import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'projects/getting-started/src/app/services/project.service';
import { projectModel } from 'projects/getting-started/src/app/services/models/projectModel';
import { regionModel } from 'projects/getting-started/src/app/services/models/regionModel';
import { ActivatedRoute } from '@angular/router';
import lgZoom from 'lightgallery/plugins/zoom';
import { LightGallery } from 'lightgallery/lightgallery';
@Component({
  selector: 'app-phases-detail',
  templateUrl: './phases-detail.component.html',
  styleUrls: ['./phases-detail.component.scss']
})
export class PhasesDetailComponent implements OnInit {
  imgUrl:string='http://villaonline.co/wwwroot/Uploads/';
  isReview:boolean=false;
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 0;
  id: number = 0;
  region = new regionModel;
  projectDetails = new projectModel;
notes:string='';
isVisible:boolean=false;
  constructor(private _apiService: ProjectService,private message:NzMessageService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    // console.log(this.id);
   }

  ngOnInit(): void {
    this.getProjectById(this.id)
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
  reviewPhaseId:number=0;
  // showModal(id:number){
  //   this.reviewPhaseId=id
  // // console.log('idshow',this.reviewPhaseId)

  // }
updatePhase(){
  // console.log('id',this.reviewPhaseId)
  let reviewPhase={
    id: this.reviewPhaseId,
    isReview: true,
    reviewNote: this.notes,
    review:this.value
  }
  this._apiService.post(`/services/app/Project/ReviewPhase`,reviewPhase).subscribe(
    (res=>{
      // @ts-ignore
      if(res['success']){
        this.message.create('success','تم تقييم المرحلة بنجاح');
        this.notes='';
        this.value=0
    this.isVisible = false;
        this.getProjectById(this.id)
      }
    })
  )
  }
  private lightGallery!: LightGallery;
  private needRefresh = false;
  settings = {
    counter: false,
    plugins: [lgZoom]
  };
  onInit = (detail:any): void => {
    this.lightGallery = detail.instance;
  };
  fileType(name:string){
    return name.split(".").pop();
  }
  // isVisible:boolean=false;
  showModal(id:number): void {
    // console.log(id)
    this.reviewPhaseId=id;
    this.isVisible = true;
  }

  handleOk(): void {
    // console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    // console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
