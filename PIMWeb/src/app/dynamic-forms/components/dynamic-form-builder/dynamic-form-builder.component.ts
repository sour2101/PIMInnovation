import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { entity } from 'src/app/entities/models/entity';

@Component({
  selector: 'dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html' 
})
export class DynamicFormBuilderComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @Input() fields: entity[] = [];
  form: FormGroup;
  

  constructor(private translate:TranslateService) { }

  ngOnInit() {
    let fieldsCtrls = {};
    for (let f of this.fields) {
      
      if (f.displayType != 'checkbox') {
        fieldsCtrls[f.shortName] = new FormControl(f.attributeValue || '', Validators.required)
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.id] = new FormControl(opt.name);
        }
        fieldsCtrls[f.shortName] = new FormGroup(opts)
      }
    }
    this.form = new FormGroup(fieldsCtrls);
  }

}
