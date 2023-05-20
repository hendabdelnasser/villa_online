import { InvoiceModel } from './../../../services/models/invoicesModel';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { projectModel, phaseModel, serviceModel, projectDocumentModel } from '../../../services/models/projectModel';
import { regionModel } from '../../../services/models/regionModel';
import { UserModel } from '../../../services/models/userModel';
import { ProjectService } from '../../../services/project.service';
import { CreateprojectModel } from '../../../services/models/createProject';
import { NotesModel } from '../../../services/models/notesModel';
import lgZoom from 'lightgallery/plugins/zoom';
import { LightGallery } from 'lightgallery/lightgallery';
@Component({
  selector: 'app-proj-details',
  templateUrl: './proj-details.component.html',
  styleUrls: ['./proj-details.component.scss']
})
export class ProjDetailsComponent implements OnInit {
  id: number = 0;
  region = new regionModel;
  constructors = new UserModel;
  projectDetails = new projectModel;
  projectPhase = new phaseModel;
  projectService = new serviceModel;
  imgUrl:string='http://villaonline.co/wwwroot/Uploads/';
  user:UserModel=new UserModel;
  userId:number=0;
  isLoaded:boolean=false;
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
    this.getCurrentUser()
    this.getAllInvoices()
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
        this.isLoaded=true;
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
  private getPhaseByProjectId(id: number = 1) {
    this._apiService.get(`/services/app/Project/GetProjectPhaseCurrant?Id=${id}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.projectPhase = response['result'];
      }
    }, console.error);
  }
  isReview:boolean=false;
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 0;

notes:string=''
updatePhase(id:number){
  // console.log('id',id)
  let reviewPhase={
    id: id,
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
        this.isVisible = false;
        this.getProjectById(this.id)
      }
    })
  )
  }
  ///// image
imageUrl: string = "";
newProject = new CreateprojectModel;
getImageUrl?: string = this.newProject.image;
fileToUpload: any = null;
images:string[]=[];
AddArrDocument:projectDocumentModel[]=[]
// handleFileInput(file: FileList) {
//   this.fileToUpload = file.item(0);

//   //Show image preview
//   var reader = new FileReader();
//   reader.onload = (event: any) => {
//     this.getImageUrl = event.target.result;
//   }
//   reader.readAsDataURL(this.fileToUpload);
//   console.log(this.fileToUpload + "______" + this.fileToUpload.name)
// }
@Output() public onUploadFinished = new EventEmitter();
 formData : FormData = new FormData();
 uploadFile = (files: FileList | null ) => {
  var f = files as FileList;
  if (f.length === 0) {
      return;
    }
    let filesToUpload : File[] = files as unknown as File[];

    Array.from(filesToUpload).map((file, index) => {
      return this.formData.append('file'+index, file, file.name);
    });
    if (files && files[0]) {
      var filesAmount = files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          // console.log(event.target.result);
          this.images.push(event.target.result);
        }

        reader.readAsDataURL(files[i]);
        // console.log(files[i]);


      }
    }

  }
  userType:number=4;
  getCurrentUser(){
    this._apiService.get(`/services/app/Session/GetCurrentLoginInformations`).subscribe(
      (res=>{
        //@ts-ignore
        this.user=res.result.user;
        this.userId=this.user.id;
        this.userType=this.user.userType
      })
    )
  }
  data=[]
  updateIsReview(phId:number,type:number){
    // console.log(this.images)
    let TypeID=type
    if(this.images.length === 0){
      this.message.create('error','من فضلك قم بتحميل الملفات اولا')
    }else{
 // console.log('ff')
 this._apiService.post(`/project/UploadPhase?UserId=${this.userId}&Note=${this.notes}&ProjectPhaseId=${phId}&TypeID=${TypeID}`,this.formData).subscribe(
  (res=>{
    //@ts-ignore
    if(res['success']){
      this.getProjectById(this.id);
      // console.log("dddone")
      this.message.create('success','تم تحميل الملفات بنجاح')
      this.images=[]

    }
  })
)
    }

  }
  dataValue:string[]=[]
  AddData(phId:number,inOutId:number,i:number){
    let data={
      projectPhaseId:phId,
      phaseInputOutputId: inOutId,
      value: this.dataValue[i]
    }
    // console.log(data)
    this._apiService.post(`/services/app/Project/AddPhaseData`,data).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
          this.getProjectById(this.id)
          this.message.create('success','تم اضافة البيانات بنجاح');
        }
      })
    )
  }
  invoices:InvoiceModel[]=[];
  getAllInvoices(){
    this._apiService.get(`/services/app/Invoice/GetAllByProject?ProjectId=${this.id}`).subscribe(
      (res=>{
         //@ts-ignore
        if(res['success']){
           //@ts-ignore
          this.invoices=res['result']
        }
      })
    )
  }

deleteImg(index:number){
  // console.log(this.images);
  this.images.splice(index,1);
  this.formData.delete('file'+index)
}
isVisible:boolean=false
showModal(): void {
  this.isVisible = true;
}
handleCancel(): void {
  // console.log('Button cancel clicked!');
  this.isVisible = false;
}
handleOk(id:number): void {
// console.log(id)
  setTimeout(() => {
    this.isVisible = false;

  }, 3000);
  id=0
}
// preview image
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
}
