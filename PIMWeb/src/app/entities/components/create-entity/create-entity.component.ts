import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EntityService } from '../../services/entity.service';
import { entity } from '../../models/entity';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html'
})
export class CreateEntityComponent implements OnInit {

  public form: FormGroup;
  fields: entity[];

  constructor(
    private _fb: FormBuilder,
    private _entityService: EntityService) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.getFields();
  }

  onSubmit(form) {
    debugger;
    alert(form.value);
  }

  getFields() {
    let fieldsCtrls = {};
    this._entityService.getShowAtCreation()
      .subscribe(res => {
        this.fields = res;
        for (let f of this.fields) {
          if (f.dataType == 'checkbox') {
            let opts = {};
            for (let opt of f.options) {
              opts[opt.id] = new FormControl(opt.name);
            }
            fieldsCtrls[f.shortName] = new FormGroup(opts)

          } else if (f.isCollection) {
            if (f.required) {
              fieldsCtrls[f.shortName] = this._fb.array([this._fb.group({
                id: new FormControl(),
                name: new FormControl(null, Validators.required)
              })]);
            } else {
              fieldsCtrls[f.shortName] = this._fb.array([this._fb.group({
                id: new FormControl(),
                name: new FormControl()
              })]);
            }
          }
          else {

            if (f.required)
              fieldsCtrls[f.shortName] = new FormControl(f.attributeValue || '', Validators.required)
            else
              fieldsCtrls[f.shortName] = new FormControl(f.attributeValue || '')

            // if (f.displayType == 'LookupTable') {
            //   fieldsCtrls[f.lookupTableId] = new FormControl(f.lookupTableId)
            // }
          }
        }
        this.form = new FormGroup(fieldsCtrls);
      });
  }

  onUpload() {
    debugger;
  }





}
