import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'projects/getting-started/src/environments/environment';
import { ApiService } from '../../../services/api.service';
import { regionModel } from '../../../services/models/regionModel';
import { UserModel } from '../../../services/models/userModel';

@Component({
  selector: 'app-admin-invoice',
  templateUrl: './admin-invoice.component.html',
  styleUrls: ['./admin-invoice.component.scss']
})
export class AdminInvoiceComponent implements OnInit {

  clients:UserModel[] = [];
  searchClient:{ keyword: string,regionId?:number,userType: number}={
    keyword:'',regionId:0,userType:0
  }
  regions:regionModel[]=[];
  region:regionModel=new regionModel;
  isLoaded:boolean=false;
  constructor(private _apiService: ApiService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllRegion()

  }
  private getAllRegion() {
    this._apiService.get(`/services/app/Region/GetAll`).subscribe(response => {
      // @ts-ignore
      if (!response['error']) {
        // @ts-ignore
        this.regions = response['result'];
        // console.log(this.regions)
      }
    }, console.error);
  }
  getRegionName(regionId:number){
    let type:regionModel[];
    type=this.regions.filter(s=>s.id == regionId);
    return type[0]?.name
  }
  private getAllClients(tenantId: number = 1, typeId: number = 0) {
    this._apiService.get(`/services/app/User/GetAllUserByType?TenantId=${tenantId}&TypeID=${typeId}`).subscribe((response) => {
      // @ts-ignore
      if(!response['error']) {
        this.isLoaded=true;
        // @ts-ignore
        this.clients = response['result'];
        // console.log('clients',this.clients);
      }
    }, console.error);
  }
  deleteClient(clientElement: number, index: number) {
    // console.log(clientElement, index);
    this._apiService.delete(`/services/app/User/Delete?Id=${clientElement}`).subscribe((response) => {
      this.clients = this.clients.filter((item, inx) => inx !== index);
      // console.log('deleted successfully');
    }, console.error);
  }
  resendEmail(clientId:number){
    let toUserID:number=clientId;
    let url=environment.invitationUrl
    this._apiService.post(`services/app/EmailService/SendInvitation?UserID=${toUserID}&url=${url}`,'').subscribe((res)=>{

      // @ts-ignore
      if(res['success']){
        // console.log('success')
        this.message.create('success','تم اعادة ارسال الدعوة بنجاح')
      }
    })
  }

  activateUser(_id: number) {
    this._apiService.post(`/services/app/User/Activate`, {id: _id}).subscribe((response) => {
      this.getAllClients();
    }, console.error);
  }

  deActivateUser(_id: number) {
    this._apiService.post(`/services/app/User/DeActivate`, {id: _id}).subscribe((response) => {
      this.getAllClients();
    }, console.error);
  }

  deleteUser(_id: number) {
    this._apiService.delete(`/services/app/User/Delete?Id=${_id}`).subscribe((response) => {
      this.getAllClients();
    }, console.error);
  }
  searchClients(userType:number){
    // console.log(this.searchClient)
    this.searchClient['userType']=userType;
    if(this.searchClient['regionId']==0){
      this.searchClient={
        keyword:this.searchClient['keyword'],userType:userType
      }
    }
    this._apiService.post(`/services/app/User/Search`,this.searchClient).subscribe(
      (res)=>{
          // @ts-ignore
          this.clients=res['result']
          this.searchClient={keyword:'',regionId:0,userType:0}

      },console.error
    )
  }


}
