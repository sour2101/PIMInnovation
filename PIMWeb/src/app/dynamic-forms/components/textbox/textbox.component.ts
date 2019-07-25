import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'textbox',
  templateUrl: './textbox.component.html' 
})
export class TextboxComponent {

  @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.shortName].valid; }
    get isDirty() { return this.form.controls[this.field.shortName].dirty; }

  constructor() { }

}
