import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../core/components/layout/layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { ForbiddenComponent } from '../core/components/forbidden/forbidden.component';
import { WorkflowFormComponent } from './components/workflow-form/workflow-form.component';


const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'workflowList',
        component:WorkflowListComponent
      },
      { path: 'createWorkflow', component: WorkflowFormComponent },
      { path: 'createWorkflow/:id', component: WorkflowFormComponent },
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
export class WorkflowsRoutingModule { }
