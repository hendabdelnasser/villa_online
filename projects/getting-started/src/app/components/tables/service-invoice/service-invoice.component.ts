import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { serviceModel } from '../../../services/models/serviceModel';

@Component({
  selector: 'app-service-invoice',
  templateUrl: './service-invoice.component.html',
  styleUrls: ['./service-invoice.component.scss']
})
export class ServiceInvoiceComponent implements OnInit {
  services: serviceModel[] = [];
isLoaded:boolean=false;
  constructor(private _router:Router,private _apiService: ApiService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getAllServices();
  }
  newService(){
    this._router.navigateByUrl('/new-service');
  }
  private getAllServices(tenantId: number = 1) {
    this._apiService.get(`/services/app/Service/GetAll?tenantId=${tenantId}`).subscribe((response) => {
      // @ts-ignore
      if(!response['error']) {
        this.isLoaded=true;
        // @ts-ignore
        this.services = response['result'];
      }
    }, console.error);
}
deleteService(serviceElement: number, index: number) {
  this._apiService.delete(`/services/app/Service/Delete?Id=${serviceElement}`).subscribe((response) => {
    this.services = this.services.filter((item, inx) => inx !== index);
    // console.log('deleted successfully');
  }, (error=>{
    this.message.create('error','هذه الخدمة متعلقة بمشروع')
  })
  );
}
}
