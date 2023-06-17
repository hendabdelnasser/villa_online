import { Component } from '@angular/core';
import { environment } from 'projects/getting-started/src/environments/environment';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/Blogs/`;
  projects=[{id:0,tenantId:0,blogTitle: '', blogContent: '', blogImage: ''}];
  isLoaded:boolean=false;

  constructor(private _apiService:ApiService,private message:NzMessageService) {
    this.getProjects();
  }

  getProjects(){
    this.isLoaded = true;
    this._apiService.get(`/Blog/GetAllBlogs?tenantId=1`).subscribe(
      (res=>{
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.projects =res['result'];
          this.isLoaded = false
        }
      })
    )
  }
}
