import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { PrimengModule } from '../externalmodule/primeng.module';

// import { DynamicFormBuilderComponent } from './components/dynamic-form-builder/dynamic-form-builder.component';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FileComponent } from './components/file/file.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { LookupComponent } from './components/lookup/lookup.component';
import { TextAreaComponent } from './components/textarea/textarea.component';
import { NumericTextBoxComponent } from './components/numeric-text-box/numeric-text-box.component';  

@NgModule({
  declarations: [ CheckboxComponent, DropdownComponent, FileComponent, TextboxComponent, LookupComponent,TextAreaComponent, NumericTextBoxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    PrimengModule
  ],
  exports: [CheckboxComponent, DropdownComponent, FileComponent, TextboxComponent,LookupComponent,TextAreaComponent,NumericTextBoxComponent],
})
export class DynamicFormsModule { }
