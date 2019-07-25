import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../core/guards/auth.guard";

import { LayoutComponent } from '../core/components/layout/layout.component';
import { ImportDatamodelComponent } from "./components/import-datamodel/import-datamodel.component";
import { IntegrationJobsComponent } from "./components/integration-jobs/integration-jobs.component";
import { ExportDatamodelComponent } from "./components/export-datamodel/export-datamodel.component";
import { ImportProfileComponent } from './components/import-profile/import-profile.component';
import { ImportProfileFormComponent } from './components/import-profile-form/import-profile-form.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { ForbiddenComponent } from '../core/components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'importdatamodel',
        component:ImportDatamodelComponent
      },
      {
        path:'exportdatamodel',
        component:ExportDatamodelComponent
      },
      { 
        path: 'integrationjobs',
        component: IntegrationJobsComponent 
      },
      { 
        path: 'jobDetails/:id',
        component: JobDetailsComponent 
      },
      { 
        path: 'importProfileList',
        component: ImportProfileComponent 
      },
      { 
        path: 'creatImportProfile',
        component: ImportProfileFormComponent 
      },
      {
        path:'forbidden',
        component:ForbiddenComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationsRoutingModule { }
