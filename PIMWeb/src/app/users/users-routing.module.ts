import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../core/guards/auth.guard";

import { LayoutComponent } from '../core/components/layout/layout.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserFormComponent } from './component/user-form/user-form.component'; 
import { ForbiddenComponent } from '../core/components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'userList',
        component:UserListComponent
      },
      { path: 'createUser', component: UserFormComponent },
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
export class UsersRoutingModule { }
