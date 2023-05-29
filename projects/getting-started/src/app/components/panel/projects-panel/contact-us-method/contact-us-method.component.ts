import { Component, OnInit } from '@angular/core';
import { DashboardPanelService } from '../../ashboard-panel/service/dashboard-panel.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-contactus-method',
  templateUrl: './contact-us-method.component.html',
  styleUrls: ['./contact-us-method.component.scss']
})
export class ContactUsMethodComponent implements OnInit {

  projects=[];
  isLoaded:boolean=false;
  formData : FormData = new FormData();
  project={key:'',value:'',order:0,typeID:0,id:0,tenantId:0}


  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(){
    this._dashService.get(`/services/app/HomePanal/GetAllContactUSMethodPanal?tenantId=1`).subscribe(
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
      key: this.project.key,
      value: this.project.value,
      tenantId:1
    }
    this._dashService.post(`/services/app/HomePanal/CreateContactUsMethod`,fetch).subscribe(
      (res=>{
        //@ts-ignore
        if(res['success']){
      this.isLoaded=true;

          this.message.create('success','تم اضافة البيانات بنجاح')
          this.project={key:'',value:'',order:0,typeID:0,id:0, tenantId: 0}
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

      this._dashService.delete(`/services/app/HomePanal/DeleteContactMethodUS?Id=${id}`).subscribe((response) => {
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
      this._dashService.get(`/services/app/HomePanal/GetSingleContactUsMethod?id=${id}`).subscribe((response: any) => {
        //@ts-ignore
        if(response['success']){
          this.project.id = response['result'].id;
          this.project.tenantId = response['result'].tenantId;
          this.project.key = response['result'].key;
          this.project.value = response['result'].value;
        }

      }, (error=>{
        this.message.create('error',' حاول مرة أخري ... لا يمكن الحذف ')
      })
      );
    }

    updateContactUsMethod(){
      this.isLoaded = false;

      this._dashService.put(`/services/app/HomePanal/UpdateContactUSMethod`,this.project).subscribe(
        (res=>{
          //@ts-ignore
          if(res['success']){
          this.isLoaded=true;
  
            this.message.create('success','تم اضافة البيانات بنجاح')
            this.project={key:'',value:'',order:0,typeID:0,id:0, tenantId: 0}
            this.formData.delete('file')
            this.getProjects()
          }else{
            this.message.create('error','من فضلك حاول مرة اخري')
          }
        })
        )
    }
}
