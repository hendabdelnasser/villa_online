import { Component, OnInit } from '@angular/core';
import { DashboardPanelService } from '../../ashboard-panel/service/dashboard-panel.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-be-partner',
  templateUrl: './be-partner.component.html',
  styleUrls: ['./be-partner.component.scss']
})
export class BePartnerComponent implements OnInit {
  projects=[];
  isLoaded:boolean=false;
  formData : FormData = new FormData();
  project={description:'',order:0,typeID:0,id:0,tenantId:0}


  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(){
    this._dashService.get(`/services/app/HomePanal/GetAllBePartners?tenantId=1`).subscribe(
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

    addContact(){
    // console.log(this.project)
    this.isLoaded=false;
    let fetch={
      Description: this.project.description,
      tenantId:1
    }
    this._dashService.post(`/services/app/HomePanal/CreateBePartner`,fetch).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
         this.isLoaded=true;

          this.message.create('success','تم اضافة البيانات بنجاح')
          this.project={description: '',order:0,typeID:0,id:0, tenantId: 0}
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

      this._dashService.delete(`/services/app/HomePanal/DeleteBePartner?Id=${id}`).subscribe((response) => {
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

}
