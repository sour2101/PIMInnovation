import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { AttrgroupService } from '../../services/attrgroup.service';
import { ToastsManager } from 'ng6-toastr';


@Component({
  selector: 'app-attributegroup-from',
  templateUrl: './attributegroup-from.component.html'
})
export class AttributegroupFromComponent implements OnInit {

  attrGroupForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastsManager,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _attrgroupService: AttrgroupService) {
    this.attrGroupForm = _formBuilder.group(
      {
        id: new FormControl(0, Validators.required),
        shortName: new FormControl("", Validators.required),
        longName: new FormControl("", Validators.required),
        attrTypeId: new FormControl(this.config.data.parentId, Validators.required)
      });

    if (this.config.data.id !== null && this.config.data.id !== undefined) {
      this.getAttributeGroup(this.config.data.userId);
    }
  }

  ngOnInit() {
  }

  getAttributeGroup(id) {
    this._attrgroupService.getAttributeGroup(id)
      .subscribe(res => {
        this.attrGroupForm = this._formBuilder.group(
          {
            id: new FormControl(res.id, Validators.required),
            shortName: new FormControl(res.shortName, Validators.required),
            longName: new FormControl(res.longName, Validators.required),
            attrTypeId: new FormControl(this.config.data.parentId, Validators.required)
          });
      })

  }

  back() {
    this.ref.close();
    return false;
  }

  submit(attrgroup) {
    let submit: any;

    if (this.config.data.id !== null && this.config.data.id !== undefined)
      submit = this._attrgroupService.updateAttributeGroup(attrgroup.value);
    else
      submit = this._attrgroupService.saveAttributeGroup(attrgroup.value);

    submit.subscribe(res => {
      this.toastr.success(res);
      this.back();
    },
      error => {
        if (error.status === 400 && JSON.parse(error._body).modelState["alreadyexists"] !== undefined) {
          this.toastr.warning(JSON.parse(error._body).modelState["alreadyexists"][0]);
        }
      });


  }

}
