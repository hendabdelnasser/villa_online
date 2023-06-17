import { Component, EventEmitter, Output } from '@angular/core';
import { DashboardPanelService } from '../../ashboard-panel/service/dashboard-panel.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'projects/getting-started/src/environments/environment';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.scss']
})
export class BlogSectionComponent {
  projects=[{id:0,tenantId:0,blogTitle: '', blogContent: '', blogImage: ''}];
  isLoaded:boolean=false;
  formData : FormData = new FormData();
  project={id:0,tenantId:0,blogTitle: '', blogContent: '', blogImage: ''}

  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  hasImg:boolean=false;

  getProjects(){
    this._dashService.get(`/Blog/GetAllBlogs?tenantId=1`).subscribe(
      (res=>{
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.projects =res['result']
          if(this.projects.length > 0){
            this.hasImg = true
          }

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
  addBlog(){
    this.isLoaded=false
    this._dashService.post(`/Blog/CreateBlog?blogTitle=${this.project.blogTitle}&blogContent=${this.project.blogContent}`,this.formData).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
      this.isLoaded=true

          this.message.create('success','تم اضافة البيانات بنجاح')
          this.project={id:0,tenantId:0,blogTitle: '', blogContent: '', blogImage: ''}
          this.images=[];
          this.formData.delete('file')
          this.getProjects()
        }else{
          this.message.create('error','من فضلك حاول مرة اخري')
        }
      })
      )
    }
  imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/Blogs/`;

  deleteProject(id:number,index:number){
    this.isLoaded=false;
    this._dashService.delete(`/Blog/DeleteBlog?id=${id}`).subscribe((response) => {
      //@ts-ignore
      if(response['success']){
        this.isLoaded=true
        this.projects = this.projects.filter((item, inx) => inx !== index);
        this.message.create('success','تم الحذف  بنجاح')
        this.hasImg=false
      }

    }, (error=>{
      this.message.create('error',' حاول مرة أخري ... لا يمكن الحذف ')
    })
    );
  }


  onModalUpdate(id:number){
    this._dashService.get(`/Blog/GetSingleBlog?id=${id}`).subscribe((response: any) => {
      //@ts-ignore
      if(response['success']){
        this.project.id = response['result'].id;
        this.project.blogTitle = response['result'].blogTitle;
        this.project.blogContent = response['result'].blogContent;
        this.project.blogImage = response['result'].blogImage;
      }

    }, (error=>{
      this.message.create('error',' حاول مرة أخري  ')
    })
    );
  }

  updateProject(){
    this.isLoaded=false
    this._dashService.put(`/Blog/UpdateBlog?blogId=${this.project.id}&blogTitle=${this.project.blogTitle}&blogContent=${this.project.blogContent}`,this.formData).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
          this.isLoaded=true

          this.message.create('success','تم اضافة البيانات بنجاح')
          this.project={id:0,tenantId:0,blogTitle: '', blogContent: '', blogImage: ''}
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
