import { PrivacyComponent } from './components/privacy/privacy.component';
import { ForgetPasswordComponent } from './components/register/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/register/reset-password/reset-password.component';
import { GuardService } from './services/guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/register/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
//import { ServicesComponent } from './components/how-work/services.component';
import { RolesComponent } from './components/roles/roles.component';
import { OurServicesComponent } from './components/ourservices/ourservices.component';
import { BlogComponent} from './components/blog/blog.component';
import { OurPartnersComponent } from './components/our-partners/our-partners.component';
import { ConsultedComponent } from './components/panel/projects-panel/consulted/consulted.component';
import { ConsultedsComponent } from './components/consulteds/consulteds.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { SupportComponent } from './components/panel/projects-panel/support/support.component';


// import { AboutComponent } from './components/about/about.component';
// import { ContactComponent } from './components/contact/contact.component';
// import { ContractorProjectsComponent } from './components/contractor-projects/contractor-projects.component';
//import { ProjDashboardComponent } from './components/dashboard/dashboard/proj-dashboard/proj-dashboard.component';
// import { ProjDetailsComponent } from './components/dashboard/proj-details/proj-details.component';
// import { HomeComponent } from './components/home/home.component';
// import { ModalsComponent } from './components/modals/modals.component';
// import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
// import { ProjectsComponent } from './components/projects/projects.component';
// import { ClientCreationComponent } from './components/register/client-creation/client-creation.component';
// import { NewProjectComponent } from './components/register/new-project/new-project.component';
// import { NewServiceComponent } from './components/register/new-service/new-service.component';
// import { SignupComponent } from './components/register/signup/signup.component';
// import { ServicesComponent } from './components/services/services.component';
// import { ProjectInvoicesComponent } from './components/tables/project-invoices/project-invoices.component';

const routes: Routes = [
  { path: `home`, component: HomeComponent },
  { path: ``, redirectTo: `home`, pathMatch: `full` },
  { path: `about`, component: AboutComponent },
  { path: `projects`, component: ProjectsComponent },

  // { path: `project-details/:id`, component: ProjectDetailsComponent },
  //{ path: `services`, component: ServicesComponent },

  { path: `Roles`, component: RolesComponent },
  { path: `privacy`, component: PrivacyComponent },
  { path: `ourServices` , component:OurServicesComponent},

  { path: `contact`, component: ContactComponent },
  { path: `login`, component: SignupComponent },
  { path: `reset-password`, component: ResetPasswordComponent },
  { path: `forget-password`, component: ForgetPasswordComponent },
  {path: `blog`, component: BlogComponent},
  {path: `be-partner`, component: OurPartnersComponent},
  {path: `consulteds`, component: ConsultedsComponent},
  {path: `questions`, component: QuestionsComponent},
  {path: `support`, component: SupportComponent},
  // { path: `create-client`, component: ClientCreationComponent },
  // { path: `update-client/:id`, component: ClientCreationComponent },
  // { path: `modals`, component: ModalsComponent },
  // { path: `project-manager`, component: ProjectInvoicesComponent },
  // { path: `new-service`, component: NewServiceComponent },
  // { path: `update-service/:id`, component: NewServiceComponent },
  // { path: `new-project`, component: NewProjectComponent },
  // { path: `contractor-projects`, component: ContractorProjectsComponent },
  // { path: `proj-details/:id`, component: ProjDetailsComponent },
  // { path: `proj-dashboard/:id`, component: ProjDashboardComponent },

  { path: `*`, component: HomeComponent },
  { path:``, loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) ,canActivate:[GuardService]},
  { path: 'dashboard-panel', loadChildren: () => import('./components/panel/ashboard-panel/ashboard-panel.module').then(m => m.AshboardPanelModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
