import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./guards/auth.guard";
import { LayoutComponent } from '../core/components/layout/layout.component';
import { DashboardComponent } from "../home/components/dashboard/dashboard.component";
import { ForbiddenComponent } from "../core/components/forbidden/forbidden.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
      path:'',
      canActivate:[AuthGuard],
      component: LayoutComponent,
      children:[
        {
          path:'home',
          component:DashboardComponent
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
export class CoreRoutingModule { }
