import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../core/components/layout/layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { ForbiddenComponent } from '../core/components/forbidden/forbidden.component';


const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'menuList',
        canActivateChild:[AuthGuard],
        component:MenuListComponent
      },
      { path: 'submenu/:id',  canActivateChild:[AuthGuard], component: MenuFormComponent },
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
export class MenuRoutingModule { }
