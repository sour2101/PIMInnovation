import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { PrimengModule  } from "../externalmodule/primeng.module";
import { TranslateModule } from "@ngx-translate/core";

import { IntegrationsRoutingModule } from './integrations-routing.module';
import { ImportDatamodelComponent } from './components/import-datamodel/import-datamodel.component';
import { IntegrationJobsComponent } from './components/integration-jobs/integration-jobs.component';
import { ExportDatamodelComponent } from './components/export-datamodel/export-datamodel.component';
import { ImportProfileComponent } from './components/import-profile/import-profile.component';
import { ImportProfileFormComponent } from './components/import-profile-form/import-profile-form.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';

@NgModule({
  declarations: [ImportDatamodelComponent, IntegrationJobsComponent, ExportDatamodelComponent, ImportProfileComponent, ImportProfileFormComponent, JobDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IntegrationsRoutingModule,
    PrimengModule,
    TranslateModule
  ]
})
export class IntegrationsModule { }
