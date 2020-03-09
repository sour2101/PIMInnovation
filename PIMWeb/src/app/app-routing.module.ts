
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { HomeModule } from "./home/home.module";
import { OrganizationModule } from './organization/organization.module';
import { IntegrationsModule } from "./integrations/integrations.module";
import { DynamicFormsModule } from "./dynamic-forms/dynamic-forms.module";
import { EntitiesModule } from './entities/entities.module';
import { MenuModule } from './menu/menu.module'

import { AuthGuard } from "./core/guards/auth.guard";
import { AttributesModule } from './attributes/attributes.module';
import { LookupTablesModule } from './lookup-tables/lookup-tables.module';
import { WorkflowsModule } from './workflows/workflows.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'home',
    canActivate:[AuthGuard],
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'menuList',
    canActivate:[AuthGuard],
    data: { preload: true },
    loadChildren: './menu/menu.module#MenuModule'
  },
  {
    path: 'userList',
    canActivate:[AuthGuard],
    data: { preload: true },
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'roleList',
    canActivate:[AuthGuard],
    loadChildren: './roles/roles.module#RolesModule'
  },
  {
    path: 'orgChart',
    canActivate:[AuthGuard],
    loadChildren: './organization/organization.module#OrganizationModule'
  },
  {
    path: 'importdatamodel',
    canActivate:[AuthGuard],
    loadChildren: './integrations/integrations.module#IntegrationsModule'
  },
  {
    path: 'entity',
    canActivate:[AuthGuard],
    loadChildren: './entities/entities.module#EntitiesModule'
  },
  {
    path: 'attributeList',
    canActivate:[AuthGuard],
    loadChildren: './attributes/attributes.module#AttributesModule'
  },
  {
    path: 'lookuptableList',
    canActivate:[AuthGuard],
    loadChildren: './lookup-tables/lookup-tables.module#LookupTablesModule',
    data: { preload: true }
  },
  {
    path: 'workflowList',
    canActivate:[AuthGuard],
    loadChildren: './workflows/workflows.module#WorkflowsModule',
    data: { preload: true }
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
  
]
@NgModule({

  imports: [
    LoginModule,
    CoreModule,
    HomeModule,
    UsersModule,
    RolesModule,
    OrganizationModule,
    IntegrationsModule,
    DynamicFormsModule, 
    EntitiesModule,
    AttributesModule,
    LookupTablesModule,
    MenuModule,
    WorkflowsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

