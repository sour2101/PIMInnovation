import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html' 
})
export class DropdownComponent  {
  @Input() field:any = {};
  @Input() form:FormGroup;
  
}
