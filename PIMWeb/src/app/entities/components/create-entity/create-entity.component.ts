import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntityService } from '../../services/entity.service'; 
import { entity } from '../../models/entity';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html' 
})
export class CreateEntityComponent implements OnInit {

  public form: FormGroup; 
  fields:entity[];
   
  constructor(
    private _entityService:EntityService) { 
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(){
    this.getFields();
  }

  onSubmit(form){
    alert(form.value);
  }

  getFields() {
    let fieldsCtrls = {};
    this._entityService.getShowAtCreation()
    .subscribe(res=>{
      this.fields=res;
      for (let f of this.fields) {
        if (f.dataType != 'checkbox') {
          if(f.required)
          fieldsCtrls[f.shortName] = new FormControl(f.attributeValue || '', Validators.required )
          else
          fieldsCtrls[f.shortName] = new FormControl(f.attributeValue || '')
        } else {
          let opts = {};
          for (let opt of f.options) {
            opts[opt.id] = new FormControl(opt.name);
          }
          fieldsCtrls[f.shortName] = new FormGroup(opts)
        }
      }
  
      this.form = new FormGroup(fieldsCtrls);
    });
  }

  onUpload(){
    debugger;
  }

   

  

}
