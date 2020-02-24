import { Component, OnInit ,HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EntityService } from '../../services/entity.service';
import { entity } from '../../models/entity';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html'
  })
export class CreateEntityComponent implements OnInit {

  public form: FormGroup=new FormGroup({});
  fields: entity[];
  catalogId: number;

  constructor(
    private _fb: FormBuilder,
    public _entityService: EntityService) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    //this.getFields(0);
  }

  onSubmit(form) {
    debugger;
    this._entityService.saveEntityData(form.value)
      .subscribe((res) => {
        console.log(res);
      });
  }

  changeCatalog(e) {
    this.catalogId = e.target.value;
    this.getFields(e.target.value);
  }

  getFields(catalogId) {
    let fieldsCtrls = {};
    this._entityService.getShowAtCreation(this.catalogId)
      .subscribe(res => {
        this.fields = res;
        for (let f of this.fields) {
          fieldsCtrls[f.shortName] = this._fb.array([this.createFormGroup(f)]);
        }

        this.form = new FormGroup(fieldsCtrls);
      });
  }


  createFormGroup(data): FormGroup {

    if (data.required)
      if (data.displayType == "LookupTable")
        return this._fb.group({
          attributeId: new FormControl(data.id),
          catalogId: new FormControl(this.catalogId),
          name: new FormControl(data.attributeValue || '', Validators.required),
          attributeValue: new FormControl(data.attributeValue || '', Validators.required)
        });
      else
        return this._fb.group({
          attributeId: new FormControl(data.id),
          catalogId: new FormControl(this.catalogId),
          name: new FormControl(data.attributeValue || ''),
          attributeValue: new FormControl(data.attributeValue || '', Validators.required)
        });
    else
      return this._fb.group({
        attributeId: new FormControl(data.id),
        catalogId: new FormControl(this.catalogId),
        name: new FormControl(data.attributeValue || ''),
        attributeValue: new FormControl(data.attributeValue || '')
      });

  }

  onUpload() {
    debugger;
  }





}
