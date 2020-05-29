import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../core/guards/auth.guard";

import { LayoutComponent } from '../core/components/layout/layout.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserFormComponent } from './component/user-form/user-form.component'; 
import { ForbiddenComponent } from '../core/components/forbidden/forbidden.component';
import { UserRoleRightsComponent } from './component/user-role-rights/user-role-rights.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'userList',
        canActivateChild:[AuthGuard],
        component:UserListComponent
      },
      { path: 'user',  canActivateChild:[AuthGuard], component: UserFormComponent },
      { path: 'user/:id',  canActivateChild:[AuthGuard], component: UserFormComponent },
      { path: 'userRoleRights',  canActivateChild:[AuthGuard], component: UserRoleRightsComponent },
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
