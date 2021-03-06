import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { attributeBRs } from 'src/app/attributes/models/attributeBRs';

@Component({
  selector: 'textbox',
  templateUrl: './textbox.component.html',
  styleUrls:['../field-builder/field-builder.component.css']
})
export class TextboxComponent implements OnInit {

  functionName:string;
  formArray;
  show:boolean=false;
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

    // if(this.field.attributeBRs.length>0)
    //   this.businessRule(this.field.attributeBRs);
  }

  businessRule(attrBrList:attributeBRs[]){
    let brValue =null;
    for(let i=0;i<attrBrList.length;i++)
    {
      this.formArray = <FormArray>this.form.controls[attrBrList[i].name];
      const formGroup = this.formArray.controls[0] as FormGroup;
      brValue = brValue===null? formGroup.controls['attributeValue'].value:brValue+" "+formGroup.controls['attributeValue'].value;
    }

    this.formArray = <FormArray>this.form.controls[this.field.shortName];
    const formGroup = this.formArray.controls[0] as FormGroup;
    formGroup.controls['attributeValue'].patchValue(brValue);
  }


  toggle(){
    this.show=true;
  }

  close(e){

  }



  addRow() {
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
