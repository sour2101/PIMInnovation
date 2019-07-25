import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from '../externalmodule/primeng.module';

@NgModule({
  declarations: [RoleListComponent, RoleFormComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule
  ],
  exports:[RoleListComponent]
})
export class RolesModule { }