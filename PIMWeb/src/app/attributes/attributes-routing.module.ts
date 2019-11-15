import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../core/components/layout/layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AttributeListComponent } from './components/attribute-list/attribute-list.component';
import { AttributeFormComponent } from './components/attribute-form/attribute-form.component';
import { AttributegroupFromComponent } from "./components/attributegroup-from/attributegroup-from.component";
import { ForbiddenComponent } from '../core/components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'attributeList',
        component: AttributeListComponent
      },
      { path: 'createAttribute', component: AttributeFormComponent },
      { path: 'createAttributeGroup', component: AttributegroupFromComponent },
      {
        path: 'forbidden',
        component: ForbiddenComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesRoutingModule { }
