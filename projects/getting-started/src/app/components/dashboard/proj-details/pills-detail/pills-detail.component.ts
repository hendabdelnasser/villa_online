import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InvoiceModel } from 'projects/getting-started/src/app/services/models/invoicesModel';
import { ProjectService } from 'projects/getting-started/src/app/services/project.service';

@Component({
  selector: 'app-pills-detail',
  templateUrl: './pills-detail.component.html',
  styleUrls: ['./pills-detail.component.scss']
})
export class PillsDetailComponent implements OnInit {
id:number=0;
  constructor(private _apiService: ProjectService, private route: ActivatedRoute,
    private router: Router,private message:NzMessageService) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    // console.log(this.id);

  }

  ngOnInit(): void {
    this.getAllInvoices()
  }
  invoices:InvoiceModel[]=[];
  getAllInvoices(){
    this._apiService.get(`/services/app/Invoice/GetAllByProject?ProjectId=${this.id}`).subscribe(
      (res=>{
         //@ts-ignore
        if(res['success']){
           //@ts-ignore
          this.invoices=res['result']
        }
      })
    )
  }
}
