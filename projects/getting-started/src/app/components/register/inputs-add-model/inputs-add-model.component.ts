import { NzMessageService } from 'ng-zorro-antd/message';
import { UserModel } from './../../../services/models/userModel';
import { projectModel } from './../../../services/models/projectModel';
import { ApiService } from './../../../services/api.service';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import { environment } from 'projects/getting-started/src/environments/environment';

@Component({
  selector: 'app-inputs-add-model',
  templateUrl: './inputs-add-model.component.html',
  styleUrls: ['./inputs-add-model.component.scss']
})
export class InputsAddModelComponent implements OnInit,AfterViewInit {

  constructor(private _apiService :ApiService,private message:NzMessageService) { }
  project=new projectModel;
  projectId:number=0;
  imgUrl:string= `${environment.baseUrl}/wwwroot/Uploads/`;

  ngOnInit(): void {
    // this.getCurrentUser()
    // console.log("init",this.user)

  }
  ngAfterViewInit(): void {
  this.getCurrentUser()
    // console.log("view",this.user)
}
  isVisible2=false;
  showModal2(id:number): void {
    this.isVisible2 = true;
    this.projectId=id;
    this.getProjectById(id)
    // console.log("pp",id)
  }
  getProjectById(id:number){
    this._apiService.get(`/services/app/Project/Get?Id=${id}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.project = response['result'];

      }
    }, console.error);
  }
  RequiredInCurrant:projectModel[]=[]
  getRequiredInCurrant(id:number){
    this._apiService.get(`/services/app/Project/GetRequiredInCurrant?UserId=${id}`).subscribe(
      (res)=>{
        // console.log(res)
        //@ts-ignore
        this.RequiredInCurrant=res.result
      }
    )
  }
  user:UserModel=new UserModel;
  userId:number=0;
  getCurrentUser(){
    this._apiService.get(`/services/app/Session/GetCurrentLoginInformations`).subscribe(
      (res=>{
        //@ts-ignore
        this.user =res.result.user;
        // console.log("get",this.user)
        this.userId=this.user.id;
        this.getRequiredInCurrant(this.user.id)
      })
    )
  }
  handleOk2(): void {

      this.isVisible2 = false;

  }

  handleCancel2(): void {
    this.isVisible2 = false;
  }
images:string[]=[];
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
      // console.log("images",this.images)
    }

  }
  deleteImg(index:number){
    // console.log(this.images);
    this.images.splice(index,1);
    this.formData.delete('file'+index)
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
  data=[];
  notes:string=""
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
      // console.log("dddone")
      this.message.create('success','تم تحميل الملفات بنجاح')
      this.images=[]
      this.getProjectById(this.projectId)

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
    this._apiService.post(`/services/app/Project/AddPhaseData`,data).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
          this.message.create('success','تم اضافة البيانات بنجاح');
      this.getProjectById(this.projectId)

        }
      })
    )
  }
}
