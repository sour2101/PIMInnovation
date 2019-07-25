import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'field-builder',
  templateUrl: './field-builder.component.html' 
})
export class FieldBuilderComponent implements OnInit {

  @Input() field:any;
  @Input() form:any;
  
  get isValid() { return this.form.controls[this.field.shortName].valid; }
  get isDirty() { return this.form.controls[this.field.shortName].dirty; }

  constructor() { }

  ngOnInit() {
  }

}
