import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-our-partners',
  templateUrl: './our-partners.component.html',
  styleUrls: ['./our-partners.component.scss']
})
export class OurPartnersComponent implements OnInit {

  constructor(private _apiservce:ApiService) { }

  ngOnInit(): void {
    this.getProjects()
  }
  projects=[{Id:0,description:'', tenantId: 0}]
  isLoaded=false;
  getProjects(){
    this._apiservce.get(`/services/app/HomePanal/GetAllBePartners?tenantId=1`).subscribe(
      (res: any)=>{
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.projects =res['result']
        }
      }
    )
  }
}
