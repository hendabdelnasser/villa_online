import { Component } from '@angular/core';
import { environment } from 'projects/getting-started/src/environments/environment';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent {

  imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/Blogs/`;
  blog = {id:0,tenantId:0,blogTitle: '', blogContent: '', blogImage: ''};
  isLoaded:boolean=false;

  constructor(private _apiService:ApiService, private router: ActivatedRoute, private message:NzMessageService) {
    let id = Number.parseInt(router.snapshot.paramMap.get('id')!);

    this.GetSingleBlog(id);
  }

  GetSingleBlog(id: number){
    this.isLoaded = true;
    this._apiService.get(`/Blog/GetSingleBlog?id=${id}`).subscribe((response: any) => {
      //@ts-ignore
      if(response['success']){
        this.blog.id = response['result'].id;
        this.blog.blogTitle = response['result'].blogTitle;
        this.blog.blogContent = response['result'].blogContent;
        this.blog.blogImage = response['result'].blogImage;
      }

      this.isLoaded = false;
    }, (error=>{
      this.message.create('error',' حاول مرة أخري  ')
    })
    );
  }
}
