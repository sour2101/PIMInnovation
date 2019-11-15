import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {

  formArray;
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.shortName].valid; }
  get isDirty() { return this.form.controls[this.field.shortName].dirty; }

  ngOnInit() {
    this.formArray = <FormArray>this.form.controls[this.field.shortName];
    // this.tableData = <FormArray>this.form.controls[this.field.shortName].value;
  }
}
