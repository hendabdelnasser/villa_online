import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from '../../environments/environment';


class SignalRMethod {
  methodName!: string;
  method!: (...args: any[]) => void;
}

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;
  private methods: SignalRMethod[] = [];
  public onConnected = new EventEmitter();

  constructor() { }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseUrl +  '/SupportSignalR', 
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => localStorage.getItem('token')!
        })
      .configureLogging(signalR.LogLevel.None)
      .build();

      this.hubConnection.start()
        .then(() => {
          this.onConnected.emit();
          console.log('SignalR Connected...')
          console.log('SignalR Connected...' + environment.baseUrl +  '/SupportSignalR')
        })
        .catch((res:any) => {
          console.log(res)
        });
  }

  on = (methodName: string, method: (...args: any[]) => void) => {

    this.methods = this.methods.filter(item => item.methodName !== methodName);
    this.methods.push({ methodName: methodName, method: method });
    
    if(this.hubConnection) {
      this.hubConnection.on(methodName, method);
    }
  }
}
