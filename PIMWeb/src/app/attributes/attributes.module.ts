import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributesRoutingModule } from './attributes-routing.module';
import { AttributeListComponent } from './components/attribute-list/attribute-list.component';
import { PrimengModule } from '../externalmodule/primeng.module';
import { AttributeFormComponent } from './components/attribute-form/attribute-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AttributegroupFromComponent } from './components/attributegroup-from/attributegroup-from.component';
import { AttributebrsComponent } from './components/attributebrs/attributebrs.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [AttributeListComponent, AttributeFormComponent, AttributegroupFromComponent, AttributebrsComponent],
  imports: [
    CommonModule,
    AttributesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule,
    TranslateModule,
    PrimengModule
  ],
  exports: [
    AttributeListComponent
  ]
})
export class AttributesModule { }
