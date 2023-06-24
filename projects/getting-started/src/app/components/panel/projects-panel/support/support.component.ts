import { Component } from '@angular/core';
import { DashboardPanelService } from '../../ashboard-panel/service/dashboard-panel.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SignalRService } from 'projects/getting-started/src/app/services/signal-rservice.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  projects=[];
  isLoaded:boolean=false;
  formData : FormData = new FormData();
  project={name:'',phone: '', email: '', message: '',id:0,tenantId:0,tickectNumber: ''}

  supportChat = {id: 0, tenantId: 0, message: '', supportId: 0, createdByUser: '', createdByUserId:'', createdOn: '', toUserId: 0};
  supportChatList = []!;
  currentUser = {userName: '', userId: 0};
  messageContent = '';
  supportId = 0
  toUserId = 0
  AllSupport=[];


  constructor(private _dashService:DashboardPanelService,
              private message:NzMessageService,
              private _signalR: SignalRService) { }

  ngOnInit(): void {
    this.GetCurrentUser();
    this.getProjects();
    this.onRecieveMessage();
  }

  GetCurrentUser(){
    let userStorage = localStorage.getItem('user');

    if(userStorage){
      let user = JSON.parse(userStorage.toString());

      this.currentUser.userId = user.userId;
      this.currentUser.userName = user.userName
    }
  }

  getProjects(){
    this._dashService.get(`/Support/GetAllSupport?tenantId=1`).subscribe(
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

  getSingleSupport(id: number, index: number){
    this._dashService.get(`/Support/GetSingleSupport?id=${id}`).subscribe(
      (res=>{
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
         // this.projects =res['result']
         this.project.message = res['result'].message
        }
      })
    )
  }

  getSingleSupportChat(id: number, ToUserId: number){
    this.supportId = id;
    this.toUserId = ToUserId;

    this._dashService.get(`/Support/GetSupportChat?supportId=${id}`).subscribe(
      (res: any)=>{
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
          this.supportChatList = res['result'];
        }
      })
  }

  sendMessage(){
    let chatRequest = {
      message: this.messageContent,
      supportId: this.supportId,
      createdByUserId: this.currentUser.userId,
      toUserId: this.toUserId ? this.toUserId : 0,
      tenantId:1
    }

    this._dashService.post(`/Support/SendSupportMessage`, chatRequest).subscribe(
      (res: any)=>{
        if(res['success']){
          this.messageContent = '';
          this.getSingleSupportChat(this.supportId, this.toUserId);
        }
      })
    
  }

  onRecieveMessage(){
    console.log("tracking...");
    this._signalR.on('RecieveMessage', (SupportId) => {
      this.getSingleSupportChat(SupportId, this.toUserId);
    })
  }
}
