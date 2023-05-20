import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Route, Router } from '@angular/router';
import { Project } from '../about/about.component';
import { DashboardPanelService } from '../panel/ashboard-panel/service/dashboard-panel.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  projects=[];
  isLoaded:boolean=false;
 formData : FormData = new FormData();
 project={title:'',data:'',order:0,typeID:0}
 imgUrl:string='http://villaonline.co/wwwroot/Uploads/panal/';

  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getProjects()
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
}
