import { Component } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { SignalRService } from './services/signal-rservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gettingStarted';
  constructor(private wowService: NgwWowService, private signalR: SignalRService) {
    this.wowService.init();
    signalR.startConnection();
  }
}
