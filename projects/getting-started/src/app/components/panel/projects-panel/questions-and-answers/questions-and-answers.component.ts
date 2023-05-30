import { Component, OnInit } from '@angular/core';
import { DashboardPanelService } from '../../ashboard-panel/service/dashboard-panel.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-questions-and-answers',
  templateUrl: './questions-and-answers.component.html',
  styleUrls: ['./questions-and-answers.component.scss']
})
export class QuestionsAndAnswersComponent implements OnInit {

  projects=[];
  isLoaded:boolean=false;
  formData : FormData = new FormData();
  project={question:'',answer: '',order:0,typeID:0,id:0,tenantId:0}


  constructor(private _dashService:DashboardPanelService,private message:NzMessageService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(){
    this._dashService.get(`/services/app/HomePanal/GetAllQuestionsAndAnswers?tenantId=1`).subscribe(
      (res: any)=>{
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.projects =res['result']
        }
      })
  }

    addContact(){
    // console.log(this.project)
    this.isLoaded=false;
    let fetch={
      Question: this.project.question,
      Answer: this.project.answer,
      tenantId:1
    }
    this._dashService.post(`/services/app/HomePanal/CreateQuestionAndAnswer`,fetch).subscribe(
      (res: any)=>{
        //@ts-ignore
        if(res['success']){
         this.isLoaded=true;

          this.message.create('success','تم اضافة البيانات بنجاح')
          this.project={question: '',answer: '',order:0,typeID:0,id:0, tenantId: 0}
          this.formData.delete('file')
          this.getProjects()
        }else{
          this.message.create('error','من فضلك حاول مرة اخري')
        }
      })
    }

    deleteService(id:number,index:number){
      this.isLoaded=false;

      this._dashService.delete(`/services/app/HomePanal/DeleteQuestionAndAnswer?Id=${id}`).subscribe((response) => {
        //@ts-ignore
        if(response['success']){
      this.isLoaded=true;

          this.projects = this.projects.filter((item, inx) => inx !== index);
          this.message.create('success','تم الحذف  بنجاح')
        }

      }, (error: any)=>{
        this.message.create('error',' حاول مرة أخري ... لا يمكن الحذف ')
      })
      ;
    }

    openUpdatedModal(id: number, index: number){
      this._dashService.get(`/services/app/HomePanal/GetSingleQuestionAndAnswer?id=${id}`).subscribe((response: any) => {
        //@ts-ignore
        if(response['success']){
          this.project.id = response['result'].id;
          this.project.tenantId = response['result'].tenantId;
          this.project.question = response['result'].question;
          this.project.answer = response['result'].answer;
        }

      }, (error=>{
        this.message.create('error',' حاول مرة أخري ... لا يمكن الحذف ')
      })
      );
    }

    updateContactUsMethod(){
      this.isLoaded = false;

      this._dashService.put(`/services/app/HomePanal/UpdateQuestionAndAnswer`,this.project).subscribe(
        (res=>{
          //@ts-ignore
          if(res['success']){
          this.isLoaded=true;
  
            this.message.create('success','تم اضافة البيانات بنجاح')
            this.project={question:'',answer:'',order:0,typeID:0,id:0, tenantId: 0}
            this.formData.delete('file')
            this.getProjects()
          }else{
            this.message.create('error','من فضلك حاول مرة اخري')
          }
        })
        )
    }
}
