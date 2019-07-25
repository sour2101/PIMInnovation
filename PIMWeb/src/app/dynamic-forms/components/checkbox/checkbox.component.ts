import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent  {

  @Input() field:any = {};
  @Input() form:FormGroup;
  get isValid() { return this.form.controls[this.field.shortName].valid; }
  get isDirty() { return this.form.controls[this.field.shortName].dirty; }

}
