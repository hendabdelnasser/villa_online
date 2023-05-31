import { environment } from 'projects/getting-started/src/environments/environment';
import { DashboardPanelService } from './../panel/ashboard-panel/service/dashboard-panel.service';
import { Component, OnInit } from '@angular/core';
export class Project{
  title:string='';
      data:string='';
      url:string='';
  }
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  imgUrl:string=`${environment.baseUrl}/wwwroot/Uploads/panal/`;

  constructor(private _dashService:DashboardPanelService) { }

  projects:Project[]=[]
  ngOnInit(): void {
    this.getProjects()
  }
  getProjects(){
    this._dashService.get(`/services/app/HomePanal/GetAllAboutUS?tenantId=1`).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.projects =res['result']
        }
      })
    )
  }
}
