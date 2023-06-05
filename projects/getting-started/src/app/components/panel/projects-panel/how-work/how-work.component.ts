  import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardPanelService } from '../../ashboard-panel/service/dashboard-panel.service';
import { environment } from 'projects/getting-started/src/environments/environment';
import { RichTextTools } from '../../../../services/rich-text.setting'
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-how-work',
  templateUrl: './how-work.component.html',
  styleUrls: ['./how-work.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class HowWorkComponent implements OnInit, AfterViewInit {

  projects=[];
  isLoaded:boolean=false;
  baseUrl: string = "";
 formData : FormData = new FormData();
 tools: object = RichTextTools;
 showRichTextEditor = false;
 project={id: '',title:'',data:'',order:0,typeID:0};
 //imgUrl:string='https://localhost:44311/wwwroot/Uploads/panal/';
  imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/panal/`;


  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { 

    this.baseUrl = (window.location.protocol.includes('https') ? 'wss' : 'ws') + `://${location.host}/`
  }

  ngOnInit(): void {
    this.getProjects();
  }


  ngAfterViewInit(): void {
    this.showRichTextEditor = true;
  }

  getProjects(){
    this._dashService.get(`/services/app/HomePanal/GetAllHowWork?tenantId=1`).subscribe(
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
    this.isLoaded=false;
    let fetch={
        tenantId: 1,
        data: this.project.data,
        title:this.project.title
    }

    this._dashService.post(`/HomePanal/CreateNewHowWork?Title=${this.project['title']}&Data=${this.project['data']}`,this.formData, fetch).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
      this.isLoaded=true;

          this.message.create('success','تم اضافة البيانات بنجاح')
          this.project={id:'',title:'',data:'',order:0,typeID:0,}
          this.images=[];
          this.formData.delete('file')
          this.getProjects()
        }else{
          this.message.create('error','من فضلك حاول مرة اخري')
        }
      })
      )
  }
  addAboutImg(){
    console.log(this.project)

    this.isLoaded=false;

  this._dashService.post(`/HomePanal/CreateNewHowWork?Title=${this.project['title']}`,this.formData).subscribe(
    (res=>{
      //@ts-ignore

      if(res['success']){
    this.isLoaded=true;

        this.message.create('success','تم اضافة الصور بنجاح')
        this.project={id:'',title:'',data:'',order:0,typeID:0,}
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

    this._dashService.delete(`/services/app/HomePanal/DeleteHowWork?Id=${id}`).subscribe((response) => {
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
      this._dashService.get(`/services/app/HomePanal/GetHowWork?id=${id}`).subscribe((response: any) => {
        //@ts-ignore
        if(response['success']){
          this.project.id = response['result'].id;
          this.project.title = response['result'].title;
          this.project.data = response['result'].data;
        }

      }, (error=>{
        this.message.create('error',' حاول مرة أخري ... لا يمكن الحذف ')
        })
      );
    }

    updateHowTowork(){
      this.isLoaded=false;
      let fetch={
          tenantId: 1,
          data: this.project.data,
          title:this.project.title
      }

      this._dashService.post(`/HomePanal/UpdateHowWork?Id=${this.project['id']}&Title=${this.project['title']}&Data=${this.project['data']}`,this.formData, fetch).subscribe(
        (res: any)=>{
          if(res['success']){
             this.isLoaded=true;

            this.message.create('success','تم تعديل البيانات بنجاح')
            this.project={id:'',title:'',data:'',order:0,typeID:0,}
            this.images=[];
            this.formData.delete('file')
            this.getProjects()
          }else{
            this.message.create('error','من فضلك حاول مرة اخري')
          }
        })
    }
  }

