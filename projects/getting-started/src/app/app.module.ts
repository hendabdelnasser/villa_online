import { PrivacyComponent } from './components/privacy/privacy.component';
import { RolesComponent } from './components/roles/roles.component';
import { ForgetPasswordComponent } from './components/register/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/register/reset-password/reset-password.component';
import { LightgalleryModule } from 'lightgallery/angular/13';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule, Pipe,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgwWowModule } from 'ngx-wow';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SwiperModule } from 'swiper/angular';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaypalAngularModule, PaypalAppConfigModel } from "paypal-angular"
import { FileUploadModule } from 'ng2-file-upload';
import { BlogComponent } from './components/blog/blog.component';
// import { NewServiceComponent } from './components/register/new-service/new-service.component';
// import { ContractorProjectsComponent } from './components/contractor-projects/contractor-projects.component';
// import { NewProjectComponent } from './components/register/new-project/new-project.component';
// import { ProjDashboardComponent } from './components/dashboard/dashboard/proj-dashboard/proj-dashboard.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ServicesComponent } from './components/how-work/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { OurServicesComponent } from './components/ourservices/ourservices.component';

// import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { SignupComponent } from './components/register/signup/signup.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
// import { ModalsComponent } from './components/modals/modals.component';
// import { ProjectInvoicesComponent } from './components/tables/project-invoices/project-invoices.component';
// import { ClientCreationComponent } from './components/register/client-creation/client-creation.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { GuardService } from './services/guard.service';
import { InputsAddModelComponent } from './components/register/inputs-add-model/inputs-add-model.component';
import { OurPartnersComponent } from './components/our-partners/our-partners.component';
import { ConsultedsComponent } from './components/consulteds/consulteds.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { BlogSectionComponent } from './components/panel/projects-panel/blog-section/blog-section.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { SupportChatComponent } from './components/support-chat/support-chat.component';


// import { ValuesPipe } from './components/home/pipe';
// import { ProjDetailsComponent } from './components/dashboard/proj-details/proj-details.component';
registerLocaleData(en);

const paypalConfig: PaypalAppConfigModel = {
  sandbox: 'AbAtXs6_juFW5Qu1Vno3ZhTlR9icI8gbuaPxFGFNokcQArlF2PHE2Ep-Ba-9FUSxFjse1t0MHVYf3332',
  production: '...YOUR-PAYPAL-CLIENT-ID-PRODUCTION...'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    // HeaderComponent,
    AboutComponent,
    ProjectsComponent,
    ServicesComponent,
    ContactComponent,
    // ProjectDetailsComponent,
    SignupComponent,
    ResetPasswordComponent,
    NavbarComponent,
    InputsAddModelComponent,
    ForgetPasswordComponent,
    BlogComponent,
    // ModalsComponent,
    // ProjectInvoicesComponent,
    // ClientCreationComponent,
    // NewServiceComponent,
    // ContractorProjectsComponent,
    // NewProjectComponent,
    // ProjDashboardComponent,
    // ProjDetailsComponent,
    PrivacyComponent,
    RolesComponent,
    OurServicesComponent,
    BlogComponent,
    OurPartnersComponent,
    ConsultedsComponent,
    QuestionsComponent,
    SingleBlogComponent,
    SupportChatComponent,
    
  ],
  imports: [
    // CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgwWowModule,
    BrowserAnimationsModule,
    RouterModule,
    CarouselModule,
    SwiperModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PaypalAngularModule.forRoot(paypalConfig),
    FileUploadModule,
    ReactiveFormsModule,
    SharedModule,
    LightgalleryModule
    ],
    exports:[
      // HeaderComponent
    ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
