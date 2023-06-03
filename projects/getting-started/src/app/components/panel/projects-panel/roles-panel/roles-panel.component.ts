import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardPanelService } from '../../ashboard-panel/service/dashboard-panel.service';

@Component({
  selector: 'app-roles-panel',
  templateUrl: './roles-panel.component.html',
  styleUrls: ['./roles-panel.component.scss']
})
export class RolesPanelComponent implements OnInit {

  projects=[];
  isLoaded:boolean=false;
 formData : FormData = new FormData();
 project={id:'',titel:'',data:'',order:0,typeID:0}


  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getProjects()
  }
  getProjects(){
    this._dashService.get(`/services/app/HomePanal/GetAllTermsPanal?tenantId=1`).subscribe(
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
    // console.log(this.project)
    this.isLoaded=false;
    let fetch={
      data: this.project.data,
      titel: this.project.titel,
      tenantId:1
    }
    this._dashService.post(`/services/app/HomePanal/CreateNewTerms`,fetch).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
      this.isLoaded=true;

          this.message.create('success','تم اضافة البيانات بنجاح')
          this.project={id:'',titel:'',data:'',order:0,typeID:0,}
          this.images=[];
          this.formData.delete('file')
          this.getProjects()
        }else{
          this.message.create('error','من فضلك حاول مرة اخري')
        }
      })
      )
    }
    deleteService(id:number,index:number){
      this.isLoaded=false;

      this._dashService.delete(`/services/app/HomePanal/DeleteTerms?Id=${id}`).subscribe((response) => {
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

    openUpdatedModal(id: number, index: number){
      this._dashService.get(`/services/app/HomePanal/GetTerms?id=${id}`).subscribe((response: any) => {
        //@ts-ignore
        if(response['success']){
          this.project.id = response['result'].id;
          this.project.titel = response['result'].titel;
          this.project.data = response['result'].data;
        }

      }, (error=>{
        this.message.create('error',' حاول مرة أخري ... لا يمكن الحذف ')
        })
      );
    }
    
    updateTerms(){
      this.isLoaded=false;
      let fetch={
          tenantId: 1,
          id:this.project.id,
          data: this.project.data,
          titel:this.project.titel
      }

      this._dashService.put('/services/app/HomePanal/UpdateTerms', fetch).subscribe(
        (res: any)=>{
          if(res['success']){
             this.isLoaded=true;

            this.message.create('success','تم تعديل البيانات بنجاح')
            this.project={id:'',titel:'',data:'',order:0,typeID:0,}
            this.images=[];
            this.formData.delete('file')
            this.getProjects()
          }else{
            this.message.create('error','من فضلك حاول مرة اخري')
          }
        })
    }
  }

