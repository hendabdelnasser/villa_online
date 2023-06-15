import { Component } from '@angular/core';
import { DashboardPanelService } from '../../ashboard-panel/service/dashboard-panel.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  projects=[];
  isLoaded:boolean=false;
  formData : FormData = new FormData();
  project={name:'',phone: '', email: '', message: '',id:0,tenantId:0,tickectNumber: ''}


  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(){
    this._dashService.get(`/Support/GetAllSupport?tenantId=1`).subscribe(
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

  getSingleSupport(id: number, index: number){
    this._dashService.get(`/Support/GetSingleSupport?id=${id}`).subscribe(
      (res=>{
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
         // this.projects =res['result']
         this.project.message = res['result'].message
        }
      })
    )
  }
}
