import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {


  constructor(private _apiservice:ApiService)
  { }
  project1:{title:'',data:'',url:''}[]=[];
  project2:{title:'',data:'',url:''}[]=[];
  project3:{title:'',data:'',url:''}[]=[];
  imgUrl:string='http://villaonline.co/wwwroot/Uploads/panal/';

  ngOnInit(): void {
    this.getProjectByType(1)
    this.getProjectByType(2)
   this.getProjectByType(3)

    // console.log(this.project1,this.project2,this.project3)
  }
 getProjectByType(typeId:number){
  this._apiservice.get(`/services/app/ProjectPanal/GetAllByTypeID?TypeID=${typeId}`).subscribe(
    (res=>{
      if(typeId === 1){
      //@ts-ignore
        this.project1=res['result']
        // console.log("1",this.project1)

      }else if(typeId === 2){
      //@ts-ignore
      this.project2=res['result']
      // console.log("2",this.project2)

      }else{
        //@ts-ignore
        this.project3=res['result']
        // console.log("3",this.project3)

      }
    })
  )
 }
}
