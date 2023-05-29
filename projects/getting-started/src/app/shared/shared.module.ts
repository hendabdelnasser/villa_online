import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
// import { AboutComponent } from '../components/about/about.component';
// import { ContactComponent } from '../components/contact/contact.component';
import { ContractorProjectsComponent } from '../components/contractor-projects/contractor-projects.component';
import { ProjDashboardComponent } from '../components/dashboard/dashboard/proj-dashboard/proj-dashboard.component';
import { ProjDetailsComponent } from '../components/dashboard/proj-details/proj-details.component';
// import { HomeComponent } from '../components/home/home.component';
// import { FooterComponent } from '../components/layouts/footer/footer.component';
// import { HeaderComponent } from '../components/layouts/header/header.component';
import { ModalsComponent } from '../components/modals/modals.component';
import { ProjectDetailsComponent } from '../components/projects/project-details/project-details.component';
// import { ProjectsComponent } from '../components/projects/projects.component';
import { ClientCreationComponent } from '../components/register/client-creation/client-creation.component';
import { NewProjectComponent } from '../components/register/new-project/new-project.component';
import { NewServiceComponent } from '../components/register/new-service/new-service.component';
// import { SignupComponent } from '../components/register/signup/signup.component';
// import { ServicesComponent } from '../components/services/services.component';
import { ProjectInvoicesComponent } from '../components/tables/project-invoices/project-invoices.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgwWowModule } from 'ngx-wow';
import { PaypalAngularModule, PaypalAppConfigModel } from 'paypal-angular';
import { SwiperModule } from 'swiper/angular';
// import { AppRoutingModule } from '../app-routing.module';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { ServiceInvoiceComponent } from '../components/tables/service-invoice/service-invoice.component';
import { ClientsInvoiceComponent } from '../components/tables/clients-invoice/clients-invoice.component';
import { ConstructorsInvoiceComponent } from '../components/tables/constructors-invoice/constructors-invoice.component';
import { PillsInvoiceComponent } from '../components/tables/pills-invoice/pills-invoice.component';
import { PhasesDetailComponent } from '../components/dashboard/proj-details/phases-detail/phases-detail.component';
import { PillsDetailComponent } from '../components/dashboard/proj-details/pills-detail/pills-detail.component';
import { NotesDetailComponent } from '../components/dashboard/proj-details/notes-detail/notes-detail.component';
import { HeaderComponent } from '../components/layouts/header/header.component';
import { LightgalleryModule } from 'lightgallery/angular/13';
import { AdminInvoiceComponent } from '../components/tables/admin-invoice/admin-invoice.component';
import { UpdateProjectComponent } from '../components/register/update-project/update-project.component';

const paypalConfig: PaypalAppConfigModel = {
  sandbox: 'AbAtXs6_juFW5Qu1Vno3ZhTlR9icI8gbuaPxFGFNokcQArlF2PHE2Ep-Ba-9FUSxFjse1t0MHVYf3332',
  production: '...YOUR-PAYPAL-CLIENT-ID-PRODUCTION...'
};
@NgModule({
  declarations: [
    SharedComponent,
    // HomeComponent,
    // FooterComponent,
    HeaderComponent,
    // AboutComponent,
    // ProjectsComponent,
    // ServicesComponent,
    // ContactComponent,
    ProjectDetailsComponent,
    // SignupComponent,
    ModalsComponent,
    ProjectInvoicesComponent,
    ClientCreationComponent,
    NewServiceComponent,
    ContractorProjectsComponent,
    NewProjectComponent,
    UpdateProjectComponent,
    ProjDashboardComponent,
    ProjDetailsComponent,
    ServiceInvoiceComponent,
    ClientsInvoiceComponent,
    ConstructorsInvoiceComponent,
    PillsInvoiceComponent,
    PhasesDetailComponent,
    PillsDetailComponent,
    NotesDetailComponent,
    AdminInvoiceComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    // BrowserModule,
    // AppRoutingModule,
    NgwWowModule,
    // BrowserAnimationsModule,
    RouterModule,
    CarouselModule,
    SwiperModule,
    NgZorroAntdModule,
    FormsModule,
    FormsModule,
    // HttpClientModule,
    ReactiveFormsModule,
    PaypalAngularModule.forRoot(paypalConfig),
    FileUploadModule,
    ReactiveFormsModule,
    LightgalleryModule,
  ],
  exports:[
    HeaderComponent,
    // FooterComponent
  ]
})
export class SharedModule { }
