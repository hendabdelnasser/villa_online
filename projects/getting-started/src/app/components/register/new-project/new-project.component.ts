import { HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { phaseModel, projectDocumentModel, projectModel, projectTypeModel, serviceModel } from '../../../services/models/projectModel';
import { regionModel } from '../../../services/models/regionModel';
import { UserModel } from '../../../services/models/userModel';
import { ProjectService } from '../../../services/project.service';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { environment } from 'projects/getting-started/src/environments/environment';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CreatephaseModel, CreateprojectModel, CreateserviceModel } from '../../../services/models/createProject';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  // regions: Array<{ label: string, value: number }> = [];
  constructors: UserModel[] = [];
  allPhases: phaseModel[] = [];
  addArrPhases: CreatephaseModel[] = [];
  addArrServices: CreateserviceModel[] = [];
  AddArrDocument: projectDocumentModel[] = [];
  allProjectType: projectTypeModel[] = [];
  newProject = new CreateprojectModel;
  newService = new CreateserviceModel;
  otherService = new CreateserviceModel;
  newPhase = new CreatephaseModel;
  clients: any;
  services: serviceModel[] = [];
  regions: any;
  imgURL: any;
  message: string = "";
  imagePath: any;
  images: string[] = [];
  addServiceBtn = false;
  addPhaseBtn = false;
  isHasCreationError: boolean | undefined;
  isCreatedSuccessfully: boolean | undefined;
isLoaded:boolean=false;
buttonLoaded:boolean=false;
userName='';
  users:UserModel[]=[]
  constructor(private _apiService: ProjectService, private _router: Router,private messages: NzMessageService) { }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllSevices();
    this.getAllRegion();
    this.getAllConstructors();
    this.getAllProjectType();
    this.getAllUSers();
    this.isLoaded=true
  }
  createdSuccessfully()
  {
    this.isHasCreationError = false;
    this.isCreatedSuccessfully = true;
    this.buttonLoaded=false;
    this.messages.create('success', `تم اضافة المشروع بنجاح`);
    this._router.navigateByUrl('/project-manager');
  }
  onSave() {
    this.buttonLoaded=true;
    this.newProject.projectDocument = this.AddArrDocument;
    this.newProject.projectService = this.addArrServices;
    // console.log("new project",this.newProject);
    this._apiService.post(`/services/app/Project/CreateNew`, this.newProject).subscribe(res => {
      // console.log(this.newProject);
      // console.log("added Successfully");
      // console.log(res);
      this.createdSuccessfully();
          // @ts-ignore
      var Pid = res['result']
      this._apiService.post(`/Project/Upload?PId=`+Pid, this.formData, {reportProgress: true, observe: 'events'})
      .subscribe(res=>
       {
        // console.log("done");
       });
    });

  }
  ///// image
  imageUrl: string = "";
  getImageUrl?: string = this.newProject.image;
  fileToUpload: any = null;

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

  /**
    * About Clients
   */
  private getAllClients(tenantId: number = 1, typeId: number = 1) {
    this._apiService.get(`/services/app/User/GetAllUserByType?TenantId=${tenantId}&TypeID=${typeId}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.clients = response['result'];
      }
    }, console.error);
  }

  /**
    * About Services
    */
  private getAllSevices(tenantId: number = 1) {
    this._apiService.get(`/services/app/Service/GetAll?tenantId=${tenantId}`).subscribe(response => {
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
  /**
   * About Regions
   */
  private getAllRegion(Id: number = 1) {
    this._apiService.get(`/services/app/Region/GetAll`).subscribe(response => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.regions = response['result'];
      }
    }, console.error);
  }

  /**
   * About Contractors
   */
  private getAllConstructors(tenantId: number = 1, typeId: number = 2) {
    this._apiService.get(`/services/app/User/GetAllUserByType?TenantId=${tenantId}&TypeID=${typeId}`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.constructors = response['result'];
      }
    }, console.error);
  }

  /**
 * About ProjectType
 */
  private getAllProjectType() {
    this._apiService.get(`/services/app/ProjectType/GetAll`).subscribe((response) => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.allProjectType = response['result'];
      }
    }, console.error);
  }

  selectProjectType(id: number) {
    //getted from event
    this.newProject.projectTypeId = +id;
    // console.log(this.newProject.projectTypeId)
  }
  selectClient(id: number) {
    //getted from event
    this.newProject.userId = +id;
    // console.log(this.newProject.userId)
  }

  selectRegion(id: number) {
    //getted from event
    this.newProject.regionId = +id;
    // console.log(this.newProject.regionId)
  }
  selectServices(target: any) {
    //getted from event
    this.newService.serviceId = +target.value;
    this.newService.name = target.options[target.options.selectedIndex].text;    ;
    // console.log(this.newService.serviceId)
    this.clearPhase()
    this._apiService.get(`/services/app/Service/GetPhases?Id=`+this.newService.serviceId).subscribe((response) => {
      // @ts-ignore
    // console.log(response['result']);
      // @ts-ignore
    this.allPhases = response['result'] ;
    });

  }
  selectPhase(target : any) {
    //getted from event
    this.newPhase.phaseId = +target.value;
    this.newPhase.title = target.options[target.options.selectedIndex].text;
    this._apiService.get(`/services/app/Service/GetPhase?Id=${+target.value}`).subscribe(
      (res=>{
        // @ts-ignore
        if(res['success']){
          // @ts-ignore
          let phase=res['result'];
          this.newPhase.implementPeriod=phase.implementPeriod;
          this.newPhase.implementPeriodType=phase.implementPeriodType;
          this.newPhase.userId=phase.userId
          // @ts-ignore
          // console.log(res['result'])
        }
      })
    )
    // console.log(this.newPhase.phaseId)
    // console.log(target.options[target.options.selectedIndex].text)
  }
  /////new Phase
  totalWeight:number=0;
  addNewPhase(ph: CreatephaseModel, service: CreateserviceModel) {
    let tempS : CreateserviceModel= {
      // description: service.description,
      // id : +service.id,
      name : service.name,
      // phases : service.phases,
      // projectId : +service.projectId,
      projectPhase : [],
      serviceId : +service.serviceId
    }
    // console.log(tempS);
    // console.log(this.addArrServices.filter(s=>s.id == tempS.id).length == 0);
    // console.log(this.addArrServices.filter(s=>s.serviceId == tempS.serviceId));

    if(this.addArrServices.filter(s=>s.serviceId == tempS.serviceId).length==0)
    {
      // console.log("NotExist");

      this.addArrServices.push(tempS)
    }
    tempS = this.addArrServices.filter(s=>s.serviceId == tempS.serviceId)[0];

    // console.log(ph.implementPeriod);
  //  console.log("phase");
  //  console.log("phase",tempS);
    // console.log("arr services",this.addArrServices)
    let temp : CreatephaseModel= {
      implementPeriod : ph.implementPeriod,
      implementPeriodType : ph.implementPeriodType,
      phaseId : +ph.phaseId,
      dateDone : ph.dateDone,
      dateStart : ph.dateStart,
      id : +ph.id,
      isCurrant : ph.isCurrant,
      isDone : ph.isDone,
      projectServiceId : +ph.projectServiceId,
      review :ph.review,
      title :ph.title,
      userId : +ph.userId,
      doneWight:+ph.doneWight
    }
    this.totalWeight=this.totalWeight+temp.doneWight;
    // console.log("weight",this.totalWeight);
    if(this.totalWeight >100){
      this.messages.create('error','لا يجب ان يتعدي مجموع الاوزان للمشروع عن 100%')
      this.totalWeight=this.totalWeight-temp.doneWight
    }else{
      this.addArrPhases.push(temp)
    // console.log(this.addArrServices.filter(s=>s.serviceId == tempS.serviceId)[0]);
    this.addArrServices.filter(s=>s.serviceId == tempS.serviceId)[0].projectPhase.push(temp);

    }


    this.clearPhase();
    // console.log("service array",this.totalWeight);

   // this.addPhaseBtn = !this.addPhaseBtn;
  }

  /////new Service
  addNewService(service: CreateserviceModel) {
    this.addArrServices.push(service)
    this.addServiceBtn = !this.addServiceBtn;
    // console.log(...this.addArrServices);
  }
  mainService(service: CreateserviceModel) {
    this.addArrServices.push(service)
    // console.log("main",...this.addArrServices);
  }

  addPhase() {
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
    this.newPhase.userId=0;
    this.newPhase.phaseId=0;
    this.newPhase.doneWight=0
    // this.newPhase.title = ''
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
  deleteImg(index:number){
    // console.log(this.images);
    this.images.splice(index,1);
    this.formData.delete('file'+index)
  }
  deletePhases(phId:number,sId:number){
 let service=this.addArrServices.filter(x => x.serviceId==sId);
 service[0].projectPhase.splice(phId,1)
 this.addArrPhases.splice(phId,1)
 this.addArrServices=this.addArrServices.filter(function(value, index, arr){
  return value.projectPhase.length !==0
})
  }

  getAllUSers(){
    this._apiService.get(`/services/app/User/GetAll`).subscribe(
      (res=>{
         //@ts-ignore
        if(res['success']){
           //@ts-ignore
          this.users=res['result'].items
          // console.log(this.users)
        }
      })
    )
  }
  getUserName(id:number){

    let user = this.users.filter(x => x.id === id)
    return user[0]?.name
  }
}

