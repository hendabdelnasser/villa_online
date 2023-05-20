import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'projects/getting-started/src/environments/environment';
import { ApiService } from '../../../services/api.service';
import { regionModel } from '../../../services/models/regionModel';
import { UserModel } from '../../../services/models/userModel';

@Component({
  selector: 'app-constructors-invoice',
  templateUrl: './constructors-invoice.component.html',
  styleUrls: ['./constructors-invoice.component.scss']
})
export class ConstructorsInvoiceComponent implements OnInit {
regions:regionModel[]=[];
  region:regionModel=new regionModel;
  searchClient:{ keyword: string,regionId?:number,userType: number}={
    keyword:'',regionId:0,userType:1
  }
  constructors: UserModel[] = [];
isLoaded:boolean=false;
  constructor(private _apiService: ApiService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getAllRegion();
this.getAllConstructors();
  }
  private getAllConstructors(tenantId: number = 1, typeId: number = 2) {
    this._apiService.get(`/services/app/User/GetAllUserByType?TenantId=${tenantId}&TypeID=${typeId}`).subscribe(
      (response) => {
      // @ts-ignore
      if(!response['error']) {
        this.isLoaded=true
        // @ts-ignore
        this.constructors = response['result'];

      }
    }, console.error);
  }
  getRegionById(id:number){
    // console.log(id)
    this._apiService.get(`/services/app/Region/Get?Id=${id}`).subscribe(
      (res)=>{
        // @ts-ignore
        this.region=res['result']
// console.log(this.region)
      }

    )
    return this.region.name
  }

  deleteContractor(contractorElement: number, index: number) {
    this._apiService.delete(`/services/app/User/Delete?Id=${contractorElement}`).subscribe((response) => {
      this.constructors = this.constructors.filter((item, inx) => inx !== index);
    }, console.error);
  }

/*about regions */
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
    this.getAllConstructors();
  }, console.error);
}

deActivateUser(_id: number) {
  this._apiService.post(`/services/app/User/DeActivate`, {id: _id}).subscribe((response) => {
    this.getAllConstructors();
  }, console.error);
}

deleteUser(_id: number) {
  this._apiService.delete(`/services/app/User/Delete?Id=${_id}`).subscribe((response) => {
    this.getAllConstructors();
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
        this.constructors=res['result'];

        // console.log("cons",this.constructors)
        this.searchClient={keyword:'',regionId:0,userType:1}

    },console.error
  )
}

}
