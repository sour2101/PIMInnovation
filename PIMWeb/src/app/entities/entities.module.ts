import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { PrimengModule } from '../externalmodule/primeng.module';
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { DynamicFormsBootstrapUIModule } from '@ng-dynamic-forms/ui-bootstrap';

import { EntitiesRoutingModule } from './entities-routing.module';
import { CreateEntityComponent } from './components/create-entity/create-entity.component';
import { FieldBuilderComponent } from '../dynamic-forms/components/field-builder/field-builder.component';

import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { SearchEntityComponent } from './components/search-entity/search-entity.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CreateEntityComponent,FieldBuilderComponent, SearchEntityComponent],
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    DynamicFormsCoreModule,
    DynamicFormsBootstrapUIModule,
    DynamicFormsPrimeNGUIModule,
    DynamicFormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    PrimengModule,
    TranslateModule
  ],
  exports:[CreateEntityComponent]
})
export class EntitiesModule { }
