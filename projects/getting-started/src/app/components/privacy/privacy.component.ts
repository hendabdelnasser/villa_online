import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private _apiservce:ApiService) { }

  ngOnInit(): void {
    this.getProjects()
  }
  projects=[{title:'',data:''}]
  isLoaded=false;
  getProjects(){
    this._apiservce.get(`/services/app/HomePanal/GetAllPrivacyPanal?tenantId=1`).subscribe(
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
}
