import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'text-area',
  templateUrl: './textarea.component.html'
})
export class TextAreaComponent implements OnInit {

  formArray;
  tableData;
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.shortName].valid; }
  get isDirty() { return this.form.controls[this.field.shortName].dirty; }

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.formArray=<FormArray>this.form.controls[this.field.shortName];
   // this.tableData = <FormArray>this.form.controls[this.field.shortName].value;
  }



  addRow() {
    const control = <FormArray>this.form.controls[this.field.shortName];
    for (let i = 0; i < control.value.length; i++) {
      if (control.value[i].name === null)
        return false;
    }
    
    control.push(this._fb.group({
      id: new FormControl(),
      name: new FormControl()
    }));

    this.tableData = control.value;
  }


  deleteRow(rowIndex) {
    const control = <FormArray>this.form.controls[this.field.shortName];
    control.removeAt(rowIndex);
    this.tableData = control.value;
    if (control.value.length == 0) {
      this.addRow();
    }
  }

}
