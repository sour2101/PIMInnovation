import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupTablesRoutingModule } from './lookup-tables-routing.module';
import { LookupTableListComponent } from './components/lookup-table-list/lookup-table-list.component';
import { LookupTableFormComponent } from './components/lookup-table-form/lookup-table-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from '../externalmodule/primeng.module'; 
import { LookupColumnFormComponent } from './components/lookup-column-form/lookup-column-form.component';
import { LookupImportComponent } from './components/lookup-import/lookup-import.component'; 

@NgModule({
  declarations: [LookupTableListComponent, LookupTableFormComponent, LookupColumnFormComponent, LookupImportComponent],
  imports: [
    CommonModule,
    TranslateModule,
    LookupTablesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule
  ],
  exports:[LookupTableListComponent]
})
export class LookupTablesModule { }
