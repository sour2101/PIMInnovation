import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls:['../field-builder/field-builder.component.css']
})
export class DropdownComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;

  formArray;
  ngOnInit() {
    this.formArray = <FormArray>this.form.controls[this.field.shortName];
    // this.tableData = <FormArray>this.form.controls[this.field.shortName].value;
  }
}
