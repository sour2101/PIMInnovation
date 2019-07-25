import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'file',
  templateUrl: './file.component.html' 
})
export class FileComponent  {

  @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() { }

  ngOnChange(){
    console.log(this.field.attributeValue);
    // this.field.value.
  }

}
