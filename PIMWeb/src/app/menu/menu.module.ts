import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from '../externalmodule/primeng.module';
import { SharedModule } from '../shared/shared.module'; 



@NgModule({
  declarations: [MenuListComponent, MenuFormComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    SharedModule
  ],
  exports:[MenuListComponent]
})
export class MenuModule { }
