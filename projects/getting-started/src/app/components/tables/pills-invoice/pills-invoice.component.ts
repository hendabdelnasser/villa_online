import { projectModel } from './../../../services/models/projectModel';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../../services/api.service';
import { InvoiceCreate, InvoiceModel } from '../../../services/models/invoicesModel';

@Component({
  selector: 'app-pills-invoice',
  templateUrl: './pills-invoice.component.html',
  styleUrls: ['./pills-invoice.component.scss']
})
export class PillsInvoiceComponent implements OnInit {

  constructor(private _apiService: ApiService,private messages:NzMessageService,) { }

  ngOnInit(): void {
    this.getAllInvoices();
    this.getAllProjects();
    this.getCurrentUser();
  }
  invoices:InvoiceModel[]=[];
  isLoaded:boolean=false;
  /// invoices
  getAllInvoices(){
   this._apiService.get(`/services/app/Invoice/GetAll?tenantId=1`).subscribe(
     (res=>{
       // @ts-ignore
       if(res['success']){
        this.isLoaded=true;
         // @ts-ignore
         this.invoices=res['result'];
       }
     })
   )
  }
  deleteInvoice(id:number){
   this._apiService.delete(`/services/app/Invoice/Delete?Id=${id}`).subscribe(
     (res=>{
       //@ts-ignore
       if(res['success']){
         this.messages.create('success','تم حذف الفاتورة بنجاح');
         this.getAllInvoices()
       }
     })
   )
  }
  isVisible=false

showModal(): void {
  this.isVisible = true;
}
handleOk(): void {
  // console.log('Button ok clicked!');
  this.isVisible = false;
}
handleCancel(): void {
  // console.log('Button cancel clicked!');
  this.isVisible = false;
}
projects:projectModel[]=[]
invoice:InvoiceCreate=new InvoiceCreate
getAllProjects(){
  this._apiService.get(`/services/app/Project/GetAll?tenantId=1`).subscribe(
    (res=>{
      //@ts-ignore
      if(res['success']){
        //@ts-ignore
        this.projects=res['result']
      }
    })
  )
}
userId:number=0;
getCurrentUser(){
  this._apiService.get(`/services/app/Session/GetCurrentLoginInformations`).subscribe(
    (res=>{
      // @ts-ignore
      this.userId=res.result.user.id

    })
  )
}
getCustomer(target:any){
  // console.log(target.value)
  let value=+target.value
  this.invoice.customerId=this.projects.filter(x=> x.id === value)[0].userId
}
AddInvoice(){
  this.invoice.userId=this.userId;
  this._apiService.post(`/services/app/Invoice/CreateInvoice`,this.invoice).subscribe(
    (res=>{
      //@ts-ignore
      if(res['success']){
        this.messages.create('success','تم اضافة الفاتورة بنجاح')
        this.isVisible = false;
        this.getAllInvoices()
      }
    })
  )
}
}
