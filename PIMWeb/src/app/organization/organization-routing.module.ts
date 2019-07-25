import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../core/guards/auth.guard";

import { LayoutComponent } from '../core/components/layout/layout.component';
import { OrganizationChartComponent } from "./components/organization-chart/organization-chart.component";
import { OrganizationFormComponent } from "./components/organization-form/organization-form.component";

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'orgChart',
        component:OrganizationChartComponent
      },
      { path: 'createOrg', component: OrganizationFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
