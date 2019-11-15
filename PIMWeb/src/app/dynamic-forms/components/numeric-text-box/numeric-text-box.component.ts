import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-numeric-text-box',
  templateUrl: './numeric-text-box.component.html',
  styleUrls:['../field-builder/field-builder.component.css']
})
export class NumericTextBoxComponent implements OnInit {

  functionName:string;
  formArray;
  tableData;
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.shortName].valid; }
  get isDirty() { return this.form.controls[this.field.shortName].dirty; }
  
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.functionName="addRow";
    this.formArray = <FormArray>this.form.controls[this.field.shortName];
    if (this.field.isCollection)
      this.tableData = <FormArray>this.form.controls[this.field.shortName].value;
  }

  
  addRow() {
    let catalogId;
    let attributeId;
    const control = <FormArray>this.form.controls[this.field.shortName];
    for (let i = 0; i < control.value.length; i++) {
      if (control.value[i].attributeValue === null || control.value[i].attributeValue === "")
        return false;
    }

    if (this.field.required) {
      control.push(this._fb.group({
        attributeId: new FormControl(control.value[0].attributeId),
        catalogId: new FormControl(control.value[0].catalogId),
        name:new FormControl(""),
        attributeValue: new FormControl("", Validators.required)
      }));
    } else {
      control.push(this._fb.group({
        attributeId: new FormControl(control.value[0].attributeId),
        catalogId: new FormControl(control.value[0].catalogId),
        name:new FormControl(""),
        attributeValue: new FormControl("")
      }));
    }

    this.tableData = control.value;
  }


  deleteRow(rowIndex) {
    const control = <FormArray>this.form.controls[this.field.shortName];

    if (control.value.length == 1) {
      const formGroup = this.formArray.controls[0] as FormGroup;
      formGroup.controls['attributeValue'].patchValue("");
    }
    else {
      control.removeAt(rowIndex);
    }

    this.tableData = control.value;
  }

}
