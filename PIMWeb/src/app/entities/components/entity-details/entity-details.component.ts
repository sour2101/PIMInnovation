import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EntityService } from '../../services/entity.service';
import { DisplayAttribute } from '../../models/displayAttribute';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.css']
})
export class EntityDetailsComponent implements OnInit {

  public form: FormGroup=new FormGroup({});
  fields: DisplayAttribute[];
  catalogId: number;
  
  constructor(
    private _fb: FormBuilder,
    public _entityService: EntityService) {
  }

  ngOnInit() {
    this.initialize();
  }

   initialize(){
    this.getFields(1);
   }

   
  getFields(catalogId) {
    let fieldsCtrls = {};
    this._entityService.getShowAtCreation(catalogId)
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

  back(){}

onSubmit(entityDetails){

}
}
