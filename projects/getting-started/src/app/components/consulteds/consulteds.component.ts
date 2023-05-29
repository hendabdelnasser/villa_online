import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-consulteds',
  templateUrl: './consulteds.component.html',
  styleUrls: ['./consulteds.component.scss']
})
export class ConsultedsComponent implements OnInit {

  constructor(private _apiservce:ApiService) { }

  ngOnInit(): void {
    this.getProjects()
  }
  projects=[{Id:0,description:'', tenantId: 0}]
  isLoaded=false;
  getProjects(){
    this._apiservce.get(`/services/app/HomePanal/GetAllConsulted?tenantId=1`).subscribe(
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
