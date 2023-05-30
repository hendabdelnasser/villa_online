import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(private _apiservce:ApiService) { }

  ngOnInit(): void {
    this.getProjects()
  }
  projects=[{Id:0,question:'', answer: '',tenantId: 0}]
  isLoaded=false;
  getProjects(){
    this._apiservce.get(`/services/app/HomePanal/GetAllQuestionsAndAnswers?tenantId=1`).subscribe(
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
