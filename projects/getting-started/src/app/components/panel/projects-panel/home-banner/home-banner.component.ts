import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardPanelService } from '../../ashboard-panel/service/dashboard-panel.service';
import { environment } from 'projects/getting-started/src/environments/environment';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {


  projects=[{id:0,url:''}];
  isLoaded:boolean=false;
 formData : FormData = new FormData();
 project={url:'', id: 0, tenantId: 0}


  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getProjects()
  }
  getProjects(){
    this._dashService.get(`/services/app/HomePanal/GetAllHomePanal?tenantId=1`).subscribe(
      (res=>{
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.projects =res['result']


        }
      })
    )
  }

  getSingleHomePanel(id: number){
    this._dashService.get(`/services/app/HomePanal/GetHomePanal?id=${id}`).subscribe(
      (res: any)=>{
        if(res['success']){
          this.project =res['result']
        }
      })
  }

  @Output() public onUploadFinished = new EventEmitter();
images:any[]=[];

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

        reader.onload = (event) => {
          // console.log(event?.target?.result);
          this.images.push(event?.target?.result);
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
          // this.images.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
        // console.log(event.target.files[i]);

        // this.AddArrDocument.push(event.target.files[i].name)
        // for (const i of this.AddArrDocument) {
        //   this.newProject.projectDocument[2] = i
        // }
      }
    }
  }
  deleteImg(index:number){
    // console.log(this.images);
    this.images.splice(index,1);
    this.formData.delete('file'+index)
  }
  
  addAbout(){
    this.isLoaded=false;

    this._dashService.post(`/HomePanal/CreateNewHomePanal`,this.formData).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
          this.isLoaded=true;

          this.message.create('success','تم اضافة البيانات بنجاح')
          this.project={url:'', id: 0, tenantId: 0}
          this.images=[];
        this.formData.delete('file')

          this.getProjects()
        }else{
          this.message.create('error','من فضلك حاول مرة اخري')
        }
      })
      )
    }
    imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/panal/`;

    deleteProject(id:number,index:number){
      this.isLoaded=false;
      this._dashService.delete(`/services/app/HomePanal/DeleteHomePanal?Id=${id}`).subscribe((response) => {
        //@ts-ignore
        if(response['success']){
      this.isLoaded=true;

          this.projects = this.projects.filter((item, inx) => inx !== index);
          this.message.create('success','تم الحذف  بنجاح')
        }

      }, (error=>{
        this.message.create('error',' حاول مرة أخري ... لا يمكن الحذف ')
      })
      );
    }

    updateHomePanel() {
      this.isLoaded=false;

    this._dashService.post(`/HomePanal/UpdateHomePanal?id=${this.project.id}`,this.formData).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
          this.isLoaded=true;

          this.message.create('success','تم تعديل البيانات بنجاح')
          this.project={url:'',id: 0, tenantId: 0}
          this.images=[];
          this.formData.delete('file')

          this.getProjects()
        }else{
          this.message.create('error','من فضلك حاول مرة اخري')
        }
      })
      )
      
    }
  }

