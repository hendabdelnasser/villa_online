import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsPanelComponent } from '../projects-panel/projects-panel.component';
import { AshboardPanelComponent } from './ashboard-panel.component';

const routes: Routes = [{ path: '', component: AshboardPanelComponent ,children:[
  { path: ``, redirectTo: `dashboard-panel`, pathMatch: `full` },
  {path:'dashboard-panel',component:ProjectsPanelComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AshboardPanelRoutingModule { }
