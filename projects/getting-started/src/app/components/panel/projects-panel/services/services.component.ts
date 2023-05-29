import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardPanelService } from './../../ashboard-panel/service/dashboard-panel.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'app-panel-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services=[];
  servr?:any;
  isLoaded:boolean=false;
  formData : FormData = new FormData();
  service={title:'',data:'',order:0}


  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getServices()
  }
  getServices(){
    this._dashService.get(`/services/app/ServicePanal/GetAll?tenantId=1`).subscribe(
      (res=>{
        console.log(res,"ssssssssssssssssssss");
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.services =res['result'];
        }
      })
    )
  }
  deleteService(id:number,i:number){
    this.isLoaded=false;

    this._dashService.delete(`/services/app/ServicePanal/DeleteServicePanal?Id=${id}`).subscribe((response) => {
      //@ts-ignore
      if(response['success']){
    this.isLoaded=true;

        this.services = this.services.filter((item, inx) => inx !== i);
        this.message.create('success','تم الحذف  بنجاح')
        this.getServices()
      }

    }, (error=>{
      this.message.create('error',' حاول مرة أخري ... لا يمكن الحذف ')
    })
    );
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
  addService(){
    this.isLoaded=false;

    this._dashService.post(`/servicepanal/CreateNew?Title=${this.service.title}&Data=${this.service.data}&order=${this.service.order}`,this.formData).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
    this.isLoaded=true;

          this.message.create('success','تم اضافة الخدمة بنجاح')
          this.service={title:'',data:'',order:0}
          this.formData.delete('file')
          this.images=[];
          this.getServices()
        }else{
          this.message.create('error','من فضلك حاول مرة اخري')

        }
      })
    )
  }
  getdata(id:number,i:number){
    debugger
    console.log(id,"id",i,"II");
    this.isLoaded=false;
      this._dashService.get(`/services/app/ServicePanal/GetAll?tenantId=1`).subscribe(
        (res=>{
          console.log(res,"ssssssssssssssssssss");
          this.isLoaded=true
          //@ts-ignore
          if(res['success']){
            this.isLoaded=true;
          //@ts-ignore
            this.servr =res['result'].filter(s=>s.id==id)
            console.log(this.servr,"sssssssss");
          }
        })
      )

  }
  update(){
    debugger
    console.log(this.servr);
    this._dashService.post(`/servicepanal/Update?serciceid=1&Title=${this.servr[0]['title']}&Data=${this.servr[0]['data']}&order=${this.servr[0]['order']}`,this.formData).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
    this.isLoaded=true;

          this.message.create('success','تم تعديل الخدمة بنجاح')
          this.service={title:'',data:'',order:0}
          this.formData.delete('file')
          this.images=[];
          this.getServices()
        }else{
          this.message.create('error','من فضلك حاول مرة اخري')

        }
      })
    )
  }
}
