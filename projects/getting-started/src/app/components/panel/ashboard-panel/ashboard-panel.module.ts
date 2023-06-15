import { HomeBannerComponent } from './../projects-panel/home-banner/home-banner.component';
import { ContactUsComponent } from './../projects-panel/contact-us/contact-us.component';
import { ProjectsComponent } from '../projects-panel/projects/projects.component';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AshboardPanelRoutingModule } from './ashboard-panel-routing.module';
import { AshboardPanelComponent } from './ashboard-panel.component';
import { ProjectsPanelComponent } from '../projects-panel/projects-panel.component';
import { ServicesComponent } from '../projects-panel/services/services.component';
import { HowWorkComponent } from '../projects-panel/how-work/how-work.component';
import { PartnersComponent } from '../projects-panel/partners/partners.component';
import { AboutUsComponent } from '../projects-panel/about-us/about-us.component';
import { SignInComponent } from '../projects-panel/sign-in/sign-in.component';
import { ProfisionalityComponent } from '../projects-panel/profisionality/profisionality.component';
// import { ContactComponent } from '../../contact/contact.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PrivacyPanelComponent } from '../projects-panel/privacy/privacy.component';
import { RolesPanelComponent } from '../projects-panel/roles-panel/roles-panel.component';
import { ContactUsMethodComponent } from '../projects-panel/contact-us-method/contact-us-method.component';
import { BePartnerComponent } from '../projects-panel/be-partner/be-partner.component';
import { ConsultedComponent } from '../projects-panel/consulted/consulted.component';
import { QuestionsAndAnswersComponent } from '../projects-panel/questions-and-answers/questions-and-answers.component';
import { SupportComponent } from '../projects-panel/support/support.component';



@NgModule({
  declarations: [
    AshboardPanelComponent,
    ProjectsPanelComponent,
    ServicesComponent,
    ProjectsComponent,
    HowWorkComponent,
    PartnersComponent,
    AboutUsComponent,
    SignInComponent,
    ProfisionalityComponent,
    ContactUsComponent,
    HomeBannerComponent,
    PrivacyPanelComponent,
    RolesPanelComponent,
    ContactUsMethodComponent,
    BePartnerComponent,
    ConsultedComponent,
    QuestionsAndAnswersComponent,
    SupportComponent
  ],
  imports: [
    CommonModule,
    AshboardPanelRoutingModule,
    FormsModule,
<<<<<<< HEAD
   NzSpinModule 
=======
   NzSpinModule
>>>>>>> 73312e595339bc42ee6cde230526fad8daa1957c

  ]
})
export class AshboardPanelModule { }
