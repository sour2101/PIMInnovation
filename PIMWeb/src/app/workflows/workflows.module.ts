import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowsRoutingModule } from './workflows-routing.module';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { WorkflowFormComponent } from './components/workflow-form/workflow-form.component';
import { PrimengModule } from '../externalmodule/primeng.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkflowListComponent, WorkflowFormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    WorkflowsRoutingModule
  ],
  exports:[
    WorkflowListComponent
  ]
})
export class WorkflowsModule { }
