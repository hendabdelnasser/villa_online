import { Component, OnInit } from '@angular/core';
import { DashboardPanelService } from '../panel/ashboard-panel/service/dashboard-panel.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor(private _dashService:DashboardPanelService) { }

  ngOnInit(): void {
    this.getProjects()
  }
  projects=[{data:'',titel:''}]
  getProjects(){
    this._dashService.get(`/services/app/HomePanal/GetAllTermsPanal?tenantId=1`).subscribe(
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
