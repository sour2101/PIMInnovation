import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { OrganizationRoutingModule } from './organization-routing.module';

import { PrimengModule } from "../externalmodule/primeng.module";
import { ContextMenuModule } from 'ngx-contextmenu'; 

import { OrganizationChartComponent } from './components/organization-chart/organization-chart.component';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';

@NgModule({
  declarations: [OrganizationChartComponent, OrganizationFormComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    ContextMenuModule,
    TranslateModule
  ],
  exports:[
    OrganizationChartComponent
  ]
})
export class OrganizationModule { }
