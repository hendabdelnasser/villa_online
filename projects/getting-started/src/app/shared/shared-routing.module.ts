import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AboutComponent } from '../components/about/about.component';
// import { ContactComponent } from '../components/contact/contact.component';
import { ContractorProjectsComponent } from '../components/contractor-projects/contractor-projects.component';
import { ProjDashboardComponent } from '../components/dashboard/dashboard/proj-dashboard/proj-dashboard.component';
import { ProjDetailsComponent } from '../components/dashboard/proj-details/proj-details.component';
// import { HomeComponent } from '../components/home/home.component';
import { ModalsComponent } from '../components/modals/modals.component';
import { ProjectDetailsComponent } from '../components/projects/project-details/project-details.component';
// import { ProjectsComponent } from '../components/projects/projects.component';
import { ClientCreationComponent } from '../components/register/client-creation/client-creation.component';
import { NewProjectComponent } from '../components/register/new-project/new-project.component';
import { NewServiceComponent } from '../components/register/new-service/new-service.component';
// import { SignupComponent } from '../components/register/signup/signup.component';
// import { ServicesComponent } from '../components/services/services.component';
import { ProjectInvoicesComponent } from '../components/tables/project-invoices/project-invoices.component';
import { SharedComponent } from './shared.component';
import { UpdateProjectComponent } from '../components/register/update-project/update-project.component';

const approutes: Routes = [{ path: '', component: SharedComponent,children:[
  //  { path: `home`, component: HomeComponent },
   { path: ``, redirectTo: `project-manager`, pathMatch: `full` },
  //  { path: `about`, component: AboutComponent },
  //  { path: `projects`, component: ProjectsComponent },
  //  { path: `services`, component: ServicesComponent },
  //  { path: `contact`, component: ContactComponent },
  //  { path: `login`, component: SignupComponent },
  { path: `project-details/:id`, component: ProjectDetailsComponent },
   { path: `create-client`, component: ClientCreationComponent },
   { path: `update-client/:id`, component: ClientCreationComponent },
   { path: `modals`, component: ModalsComponent },
   { path: `project-manager`, component: ProjectInvoicesComponent },
   { path: `new-service`, component: NewServiceComponent },
   { path: `update-service/:id`, component: NewServiceComponent },
   { path: `new-project`, component: NewProjectComponent },
   { path: `update-project/:id`, component: UpdateProjectComponent },
   { path: `contractor-projects`, component: ContractorProjectsComponent },
   { path: `proj-details/:id`, component: ProjDetailsComponent },
   { path: `proj-dashboard/:id`, component: ProjDashboardComponent },
  //  { path: `*`, component: HomeComponent },
] }];

@NgModule({
  imports: [RouterModule.forChild(approutes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
