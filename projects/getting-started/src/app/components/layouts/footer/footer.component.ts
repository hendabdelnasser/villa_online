import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardPanelService } from '../../panel/ashboard-panel/service/dashboard-panel.service';
import { environment } from 'projects/getting-started/src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public _Router: Router, private _dashboardServcie: DashboardPanelService) {}
  year = new Date().getFullYear();

  ContactMethodObject = [{key: '', value: '', id:'', tenantId:'', order: '',extraLink: ''}];
  locationImage = `${environment.baseUrl}/wwwroot/Uploads/panal/locationImg.png`;

  ngOnInit(): void {
    this.loadFooterContact();
  }

  loadFooterContact() {
    this._dashboardServcie.get('/services/app/HomePanal/GetAllContactUSMethodPanal?tenantId=1').subscribe(
      (res: any) => {
        if(res['success']){
            this.ContactMethodObject = res['result'];
          }
      }
    );
  }
}
