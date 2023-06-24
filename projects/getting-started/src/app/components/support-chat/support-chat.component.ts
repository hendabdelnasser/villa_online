import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../services/api.service';
import { SignalRService } from '../../services/signal-rservice.service';

@Component({
  selector: 'app-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.scss']
})
export class SupportChatComponent {

  supportChat = {id: 0, tenantId: 0, message: '', supportId: 0, createdByUser: '', createdByUserId:'', createdOn: ''};
  supportChatList = []!;
  currentUser = {userName: '', userId: 0};
  messageContent = '';
  supportId = 0

  AllSupport=[];
  isLoaded:boolean=false;
  support={
    name:'',
    phone: '',
    email: '',
    message: '',
    id:0,
    tenantId:0,
    tickectNumber: '',
    supportChats: [{id: 0, tenantId: 0, message: '', supportId: 0, createdByUser: '', createdByUserId:'', createdOn: ''}]
  }


  constructor(private _apiservice:ApiService,private message:NzMessageService,private _signalR: SignalRService) { }

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
    this._apiservice.get(`/Support/GetAllTicketsForCurrentUser?tenantId=1&userId=${this.currentUser.userId}`).subscribe(
      (res: any)=>{
        this.isLoaded=true
        //@ts-ignore
        if(res['success']){
        //@ts-ignore
          this.AllSupport =res['result'];
        }
      }, (err: any) =>  console.log(err.error))
  }

  getSingleSupportChat(id: number, index: number){
    this.supportId = id;

    this._apiservice.get(`/Support/GetSupportChat?supportId=${id}`).subscribe(
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
      toUser: null,
      tenantId:1
    }

    this._apiservice.post(`/Support/SendSupportMessage`, chatRequest).subscribe(
      (res: any)=>{
        if(res['success']){
          this.messageContent = '';
          this.getSingleSupportChat(this.supportId, 0);
        }
      }) 
  }

  onRecieveMessage(){
    console.log("tracking...");
    this._signalR.on('RecieveMessage', (SupportId) => {
      this.getSingleSupportChat(SupportId, 0);
    })
  }
}
