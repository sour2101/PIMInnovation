import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';

import { LookupTableListComponent } from './components/lookup-table-list/lookup-table-list.component';
import { LookupTableFormComponent } from './components/lookup-table-form/lookup-table-form.component';
import { ForbiddenComponent } from '../core/components/forbidden/forbidden.component';
import { LayoutComponent } from '../core/components/layout/layout.component';
import { LookupColumnFormComponent } from './components/lookup-column-form/lookup-column-form.component';
import { LookupImportComponent } from './components/lookup-import/lookup-import.component'; 

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'lookuptableList',
        component:LookupTableListComponent,
      },
      { path: 'createLookuptable', component: LookupColumnFormComponent },
      { path: 'createLookuptable/:id', component: LookupColumnFormComponent },
      { path: 'createLookupColumn', component: LookupTableFormComponent },
      { path: 'lookupimport', component: LookupImportComponent },
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
export class LookupTablesRoutingModule { }
