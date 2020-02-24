import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';

import { TranslateModule } from '@ngx-translate/core'; 
import { PrimengModule } from "../externalmodule/primeng.module";

import { UserListComponent } from './component/user-list/user-list.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { UserPreferenceComponent } from './component/user-preference/user-preference.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [UserListComponent, UserFormComponent, UserPreferenceComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    SharedModule
  ],
  exports:[
    UserListComponent
  ]
})
export class UsersModule { }
