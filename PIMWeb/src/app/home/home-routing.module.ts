import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../core/components/layout/layout.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EntityComponent } from "./components/entity/entity.component";
import { UserPreferencesComponent } from "./components/userPrefrence/userPref.component";

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      { 
        path: 'changeEntity', 
        component: EntityComponent 
      },
      { 
        path: 'userprefrence', 
        component: UserPreferencesComponent 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
