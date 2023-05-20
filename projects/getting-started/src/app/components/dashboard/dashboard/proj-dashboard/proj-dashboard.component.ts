import { NotesModel } from './../../../../services/models/notesModel';
import { AddPhase, projectDocumentModel } from './../../../../services/models/projectModel';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserModel } from './../../../../services/models/userModel';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { phaseModel, projectModel, projectTypeModel, serviceModel } from 'projects/getting-started/src/app/services/models/projectModel';
import { regionModel } from 'projects/getting-started/src/app/services/models/regionModel';
import { ProjectService } from 'projects/getting-started/src/app/services/project.service';
import { environment } from 'projects/getting-started/src/environments/environment';
import { CreateprojectModel } from 'projects/getting-started/src/app/services/models/createProject';
//import { AnyAaaaRecord } from 'dns';
import { NzSelectSizeType } from 'ng-zorro-antd/select/select.component';
import lgZoom from 'lightgallery/plugins/zoom';
import { LightGallery } from 'lightgallery/lightgallery';
@Component({
  selector: 'app-proj-dashboard',
  templateUrl: './proj-dashboard.component.html',
  styleUrls: ['./proj-dashboard.component.scss']
})
export class ProjDashboardComponent implements OnInit {
  id: number = 0;
  projectTypes:projectTypeModel[]=[];
  Project:projectModel = new projectModel();
  _hubConnection: HubConnection | undefined;
  regions:regionModel[]=[];
  newService = new serviceModel;
  checkService=new serviceModel;
  newPhase = new phaseModel;
  addArrServices: serviceModel[] = [];
  addArrPhases: phaseModel[] = [];
  addServiceBtn = false;
  addPhaseBtn = false;
  services: serviceModel[] = [];
  allPhases: phaseModel[] = [];
  constructors:UserModel[]=[]
  addphase:AddPhase=new AddPhase;
  currentUser:UserModel=new UserModel;
  userType:number=5;
isDone:boolean=false;
userId:number=0;
imgUrl:string='http://villaonline.co/wwwroot/Uploads/';
isLoaded:boolean=false;
  constructor(private _projSrc:ProjectService,private route: ActivatedRoute,
    private router: Router,private messages:NzMessageService) { }

 ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = +params['id'];
    this.addphase.id=this.id;
  });
  this.get(this.id);
  this.getAllProjectTypes();
  this.getAllRegion();
  this.getAllConstructors();
  this.getAllSevices();
  this.getCurrentLoginUser();
  this.getPhasesDone(this.id);
  this.getCurrentPhase();
}


  get(id:number |undefined) {

    this._projSrc.get('/services/app/Project/Get?id='+id).subscribe(data => {
       // @ts-ignore
       if(data['success']){
        // @ts-ignore
        this.Project = data['result'] as projectModel
      //  console.log("project",this.Project);
       this.isLoaded=true;
       }

      })
    }

    currentPhaseId:number=0;
    getCurrentPhase(){
      this._projSrc.get(`/services/app/Project/GetProjectPhaseCurrant?Id=${this.id}`).subscribe(
        (res=>{
          //@ts-ignore
          this.currentPhaseId=res['result'].id
        })
      )
    }

    //project type
  getAllProjectTypes(){
    this._projSrc.get(`/services/app/ProjectType/GetAll`).subscribe(data=>{
      // @ts-ignore
      this.projectTypes=data['result'] as projectTypeModel[]
      // console.log("type",this.projectTypes)
    })
  }

  getProjectTypeName(projTypeId:number){
    let type:projectTypeModel[]
    type=this.projectTypes.filter(s=>s.id == projTypeId);
    return type[0]?.name
  }

  //region name
  private getAllRegion() {
    this._projSrc.get(`/services/app/Region/GetAll`).subscribe(response => {
      // @ts-ignore
      if (!response['error']) {
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
  getCurrentLoginUser(){
    this._projSrc.get(`/services/app/Session/GetCurrentLoginInformations`).subscribe(
      (res=>{
        // @ts-ignore
        if(res['success']){
          // @ts-ignore
          this.currentUser=res['result'].user
          this.userType=this.currentUser.userType
          this.userId=this.currentUser.id
          if(this.userType==0){
            this.getNotesByProject(this.id);

          }else{
            this.getNotesForConstructors()
          }
        }
      })
    )
  }
  /* About Contractors*/
 private getAllConstructors(tenantId: number = 1, typeId: number = 2) {
   this._projSrc.get(`/services/app/User/GetAllUserByType?TenantId=${tenantId}&TypeID=${typeId}`).subscribe((response) => {
     // @ts-ignore
     if (!response['error']) {
       // @ts-ignore
       this.constructors = response['result'];
     }
   }, console.error);
 }

  private getAllSevices(tenantId: number = 1) {
    this._projSrc.get(`/services/app/Service/GetAll?tenantId=${tenantId}`).subscribe(response => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.services = response['result'];
        for (const i of this.services) {
          // debugger
          this.allPhases = i.phases;

        }
      }
    }, console.error);
  }

//add services
selectServices(target: any) {
  //getted from event
  this.newService.serviceId = target.value;
  this.addphase.projectServiceId=target.value;
  this.newService.name = target.options[target.options.selectedIndex].text;    ;
  // console.log(this.newService.serviceId)
  this._projSrc.get(`/services/app/Service/GetPhases?Id=`+this.newService.serviceId).subscribe((response) => {
    // @ts-ignore
  // console.log(response['result']);
  this.clearPhase()
    // @ts-ignore
  this.allPhases = response['result'] ;
  // console.log("phases",this.allPhases)

  });

}

selectPhase(target : any) {
  //getted from event
  this.newPhase.phaseId = target.value;
  this.newPhase.title = target.options[target.options.selectedIndex].text;

  this._projSrc.get(`/services/app/Service/GetPhase?Id=${+target.value}`).subscribe(
    (res=>{
      // @ts-ignore
      if(res['success']){
        // @ts-ignore
        let phase=res['result'];
        this.newPhase.implementPeriod=phase.implementPeriod;
        this.newPhase.implementPeriodType=phase.implementPeriodType;
        this.newPhase.userId=phase.userId
        // @ts-ignore
        // console.log(this.newPhase)
      }
    })
)}
totalWeight:number=0;
/////new Phase
addNewPhase() {
  let ph=this.newPhase;
  let service=this.newService;
  // console.log("phase ph",ph)
  let tempS : serviceModel= {
    description: service.description,
    id : +service.id,
    name : service.name,
    phases : service.phases,
    projectId : service.projectId,
    projectPhases : [],
    serviceId : service.serviceId

  }

  this.addArrServices=this.Project.projectServices;
  if(this.addArrServices.filter(s=>s.serviceId == tempS.serviceId).length==0)
  {

    this.addArrServices.push(tempS)
  }

  tempS = this.addArrServices.filter(s=>s.serviceId == tempS.serviceId)[0];

  // console.log("arr after push",this.addArrServices)
  let temp : phaseModel= {
    implementPeriod: ph.implementPeriod,
    implementPeriodType: +ph.implementPeriodType,
    phaseId: +ph.phaseId,
    dateDone: ph.dateDone,
    dateStart: ph.dateStart,
    id: ph.id,
    isCurrant: ph.isCurrant,
    inputs: ph.inputs,
    isDone: ph.isDone,
    projectServiceId: ph.projectServiceId,
    isReview: ph.isReview,
    title: ph.title,
    userId: +ph.userId,
    doneWight:ph.doneWight
  }
  this.checkService=this.addArrServices.filter(s=>s.serviceId == tempS.serviceId)[0];
  // console.log(temp)
  if(this.checkService['projectPhases'].filter(s=>s.phaseId == temp.phaseId).length==0)
  {
    // console.log("NotExist");
    this.totalWeight=this.Project.totalWight;
    this.totalWeight=this.totalWeight + temp.doneWight
    if(this.totalWeight <= 100){
      this.addArrPhases.push(temp)
      this.addphase={
        projectID: this.id,
        serviceId: +this.addphase.projectServiceId,
        phaseId: +temp.phaseId,
        implementPeriod: temp.implementPeriod,
        implementPeriodType: +temp.implementPeriodType,
        userId: +temp.userId,
        projectServiceId:+this.addphase.projectServiceId,
        dateStart:temp.dateStart,
        doneWight:temp.doneWight
        }
        this.addArrServices.filter(s=>s.serviceId === tempS.serviceId)[0].projectPhases.push(temp);
        this.clearPhase();
        // console.log("service array after push phase",this.addArrServices);
        // console.log('phase',this.addphase)
       this.sendToApi(this.addphase)
       // this.addPhaseBtn = !this.addPhaseBtn;
    }else{
      this.clearPhase()
    this.messages.create('error', `  مجموع الاوزان للمراحل تعدي 100 %`);
    temp = this.checkService['projectPhases'].filter(s=>s.phaseId == temp.phaseId)[0];
    this.get(this.id)
    }
    // console.log(this.addArrPhases)
  }else{
    this.messages.create('error', `  هذه المرحلة موجودة بالفعل`);
    // console.log(temp);

    temp = this.checkService['projectPhases'].filter(s=>s.phaseId == temp.phaseId)[0];
    this.clearPhase()
    this.get(this.id)
  }

}
sendToApi(addPhase:any){
  this._projSrc.post(`/services/app/Project/AddPhase`,addPhase).subscribe(
    (res)=>{
      // console.log('res',res);
      // @ts-ignore
      if(res['success']){
        this.get(this.id);
        this.isVisible = false;
      }
    }
  )
}
/////new Service
addNewService(service: serviceModel) {
  this.addArrServices.push(service)
  this.addServiceBtn = !this.addServiceBtn;
  // console.log(...this.addArrServices);
}
mainService(service: serviceModel) {
  this.addArrServices.push(service)
  console.log("main",...this.addArrServices);
}

addPhase2() {
  this.addPhaseBtn = !this.addPhaseBtn;
  this.clearPhase();
}
addService() {
  this.addServiceBtn = !this.addServiceBtn;
  this.clearPhase();
}
clearPhase() {
  this.newPhase.dateStart = new Date;
  this.newPhase.implementPeriod = 1;
  this.newPhase.implementPeriodType = 0;
  // this.newPhase.title = ''
  this.newPhase.phaseId=0
  this.newPhase.userId=0
  this.newPhase.doneWight=0
}
// savePhase(){
//   console.log(this.addphase)
//   this._projSrc.post(`/service/app/Project/AddPhase`,this.addphase).subscribe(
//     (res)=>{
//       console.log(res);
//       // @ts-ignore
//       if(res['success']){
//         this.get(this.id);
//       }
//     }
//   )
// }
updateProjectPhaseDone:{id:number,isDone:boolean}={id:1,isDone:true};
// change isDone of Phase
changeIsDone(target:any,phId:number){
  // console.log(target.value)
this.isDone=target.value;
this.updateProjectPhaseDone={

  id: phId,
  isDone: this.isDone,
}

}
updateProjectDone(updateProjectPhaseDone:{id:number,isDone:boolean}){
  this._projSrc.put(`/services/app/Project/UpdateProjectPhaseDone`,updateProjectPhaseDone).subscribe(
    (res=>{
      //@ts-ignore
      if(res['success']){
        this.messages.create('success','تم تعديل المرحلة بنجاح')
        this.get(this.id)
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
handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);

  //Show image preview
  var reader = new FileReader();
  reader.onload = (event: any) => {
    this.getImageUrl = event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload);
  // console.log(this.fileToUpload + "______" + this.fileToUpload.name)
}
@Output() public onUploadFinished = new EventEmitter();
formData : FormData = new FormData();
uploadFile = (files: FileList | null ) => {
 var f = files as FileList;
 if (f.length === 0) {
     return;
   }
   let filesToUpload : File[] = files as unknown as File[];

   Array.from(filesToUpload).map((file, index) => {
     return this.formData.append('file', file, file.name);
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


 // Preview Image in html
 onFileChange(event: any) {
   if (event.target.files && event.target.files[0]) {
     var filesAmount = event.target.files.length;

     for (let i = 0; i < filesAmount; i++) {
       var reader = new FileReader();

       reader.onload = (event: any) => {
         // console.log(event.target.result);
         this.images.push(event.target.result);
       }

       reader.readAsDataURL(event.target.files[i]);
       // console.log(event.target.files[i]);

       this.AddArrDocument.push(event.target.files[i].name)
       for (const i of this.AddArrDocument) {
         this.newProject.projectDocument[2] = i
       }
     }
   }
 }
 fileType(name:string){
  return name.split(".").pop();
}
 deleteImg(index:number){
  //  console.log(this.images);
   this.images.splice(index,1);

   this.formData.delete('file'+index)
 }
  updatePhase(phId:number,type:number){
    // console.log('update images',this.images)
    // console.log('update formData',this.formData.getAll('file'))
    let TypeID=type;
    if(this.images.length === 0){
      this.messages.create('error','من فضلك قم بتحميل الملفات اولا')
    }else{
    this._projSrc.post(`/project/UploadPhase?UserId=${this.userId}&ProjectPhaseId=${phId}&TypeID=${TypeID}`,this.formData).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
      // console.log('success')
          this.messages.create('success',' تم تحميل الملفات بنجاح')
          this.get(this.id);
          this.images=[]
          this.formData.delete('file')
        }
      })
    )
  }
}
  back(){
    if (this.userType == 0){
      this.router.navigateByUrl('/project-manager');
    }else{
      this.router.navigateByUrl('/contractor-projects')
    }
  }

  price:number=0;
 date:Date=new Date;
 AllphasesDone:phaseModel[]=[];
 size: NzSelectSizeType = 'default';
 phasesSelect:number[]=[];
 getPhasesDone(id:number){
  this._projSrc.get(`/services/app/Project/GetProjectPhaseDone?Id=${id}`).subscribe(
    (res=>{
      //@ts-ignore
      if(res['success']){
        //@ts-ignore
        this.AllphasesDone=res['result']
        // console.log(this.AllphasesDone)
      }
    })
  )
 }

 createInvoice(){
  let invoice={
    projectId: this.id,
  customerId: this.Project.userId,
  userId: this.userId,
  price: this.price,
  date: this.date,
  phases: this.phasesSelect
  }
  // console.log(invoice)
  this._projSrc.post(`/services/app/Invoice/CreateNew`,invoice).subscribe(
    (res=>{
      // @ts-ignore
      if(res['success']){
        this.messages.create('success','تم انشاء الفاتورة بنجاح')
        this.isVisible2=false
      }
    })
  )
 }
 //chatNotes
 chatNotes:string="";
 sendChat(){
  if(this.currentPhaseId==0){
    this.messages.create('error','لا توجد مراحل حالية')
  }else{
    let chat={
      projectId:this.id,
      customerId: this.Project.userId,
      userId: this.userId,
      projectPhaseId: this.currentPhaseId,
      noteBody: this.chatNotes
    }
    this._projSrc.post(`/services/app/Note/CreateNew`,chat).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
          // console.log('added chat')
          this.chatNotes=''

          if(this.userType==0){
            this.getNotesByProject(this.id);

          }else{
            this.getNotesForConstructors()
          }
        }
      })
    )
  }

 }
 allNotes:NotesModel[]=[]
 getNotesByProject(id:number){
  this._projSrc.get(`/services/app/Note/GetAllForProject?ProjectId=${id}`).subscribe(
    (res=>{
      //@ts-ignore
      this.allNotes=res['result']
    })
  )
 }
getNotesForConstructors(){
  this._projSrc.get(`/services/app/Note/GetAllForConstractor?ProjectId=${this.id}&UserId=${this.userId}`).subscribe(
    (res=>{
      //@ts-ignore
      if(res['success']){
        //@ts-ignore
        this.allNotes=res['result']
      }
    })
  )
}
isVisible=false
isVisible2=false

showModal(): void {
  this.isVisible = true;
}
showModal2(): void {
  this.isVisible2 = true;
}
handleOk(): void {
  // console.log('Button ok clicked!');
  this.isVisible = false;
}
handleOk2(): void {
  // console.log('Button ok clicked!');
  this.isVisible2 = false;
}
handleCancel(): void {
  // console.log('Button cancel clicked!');
  this.isVisible = false;
}
handleCancel2(): void {
  // console.log('Button cancel clicked!');
  this.isVisible2 = false;
}

// preview image
private lightGallery!: LightGallery;
  private needRefresh = false;
  settings = {
    counter: false,
    plugins: [lgZoom],
    exThumbImage: 'data-external-thumb-image'
  };
  onInit = (detail:any): void => {
    this.lightGallery = detail.instance;
  };
}
