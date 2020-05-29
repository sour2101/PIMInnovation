import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { OrganizationRoutingModule } from './organization-routing.module';

import { PrimengModule } from "../externalmodule/primeng.module";
import { ContextMenuModule } from 'ngx-contextmenu'; 

import { OrganizationChartComponent } from './components/organization-chart/organization-chart.component';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [OrganizationChartComponent, OrganizationFormComponent, MappingComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    ContextMenuModule,
    TranslateModule,
    SharedModule
  ],
  exports:[
    OrganizationChartComponent
  ]
})
export class OrganizationModule { }
