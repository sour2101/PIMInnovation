import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ToastsManager } from 'ng6-toastr';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AttrService } from '../../services/attr.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LookupTableService } from 'src/app/lookup-tables/services/lookup-table.service';
import { attributeDropDowns } from '../../models/attributeDropDown';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.css']
})
export class AttributeFormComponent implements OnInit {

  attributeForm: FormGroup;
  dataTypeList: any;
  displayTypeList: any;
  attrGroupList: any;
  lookupTableList: any;
  lookupColumnList: any;
  dropdownList: any = [];
  uomTypeList:any;
  uomList:any;

  constructor(public _pimService: AppService,
    private _attrService: AttrService,
    public toastr: ToastsManager,
    private _formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    this.initialize();
  }

  ngOnInit() {
  }

  initialize() {
    this.attributeForm = this._formBuilder.group({
      shortName: new FormControl("", Validators.required),
      longName: new FormControl("", Validators.required),
      attributeGroupId: new FormControl(this.config.data.groupId, Validators.required),
      dataTypeId: new FormControl("", Validators.required),
      displayTypeId: new FormControl("", Validators.required),
      required: new FormControl(false),
      isActive: new FormControl(true),
      isLocalizable: new FormControl(false),
      isCollection: new FormControl(false),
      showAtCreation: new FormControl(false),
      lookupTableId: new FormControl(),
      uomTypeId: new FormControl(),
      attributeLookups: new FormControl([]),
      attributeDropdowns: new FormControl([]),
      dropdownName: new FormControl(),
      attributeUOMs:new FormControl([])
    });

    this.getAttributeGroup();
    this.getDataType();
    this.getLookupTable();
    this.getUOMType();
    if (this.config.data.attrId !== null && this.config.data.attrId !== undefined)
      this.getAttribute(this.config.data.attrId);

  }


  //get all masters
  getAttributeGroup() {
    this._pimService.get(environment.attributeGroup_url)
      .subscribe(res => {
        this.attrGroupList = res;
      });
  }

  getDataType() {
    this._pimService.get(environment.dataType_url)
      .subscribe(res => {
        this.dataTypeList = res;
      });
  }

  getDisplayType() {
    this._pimService.getById(environment.displayType_url, this.attributeForm.value.dataTypeId)
      .subscribe(res => {
        this.displayTypeList = res;
        
      });
  }

  getLookupTable() {
    this._pimService.get("lookupTableList")
      .subscribe(data => {
        this.lookupTableList = data;
      });
  }

  getUOMType(){
    this._pimService.get(environment.attribute_UomType)
    .subscribe(data => {
      this.uomTypeList = data;
    });
  }

  getUom(id){
    this._pimService.getById(environment.attribute_Uom, id)
    .subscribe(res => {
      this.uomList = res;
    });
  }

  uomTypeChange(event){
    this.attributeForm.controls["attributeUOMs"].patchValue([]);
    this.getUom(event);
  }

  lookupColumnClick() {
    this.attributeForm.value.attributeLookups = this.attributeForm.value.attributeLookups;
  }

  addDropDown() {
    let dropdownName = this.attributeForm.value.dropdownName;
    if (dropdownName !== "" && dropdownName !== null) {
      this.dropdownList = [...this.dropdownList, { id: 0, name: dropdownName }];
      this.attributeForm.patchValue({
        attributeDropdowns: this.dropdownList,
        dropdownName: ""
      });
    }
  }

  loadLookup(event) {
    this.attributeForm.controls["attributeLookups"].patchValue([]);
    this.getLookupColumnList(event);
  }

  getLookupColumnList(id){
    this._pimService.getById("lookupTableList", id)
    .subscribe(res => {
      this.lookupColumnList = res[0].columns;
    });
  }


  //back button click
  back(result = null) {
    this.ref.close(result);
    return false;
  }

  getAttribute(id) {
    this._attrService.getAttribute(id)
      .subscribe(res => {
        this.attributeForm = this._formBuilder.group({
          id: new FormControl(res.id),
          shortName: new FormControl(res.shortName, Validators.required),
          longName: new FormControl(res.longName, Validators.required),
          attributeGroupId: new FormControl(res.attributeGroupId, Validators.required),
          dataTypeId: new FormControl(res.dataTypeId, Validators.required),
          displayTypeId: new FormControl(res.displayTypeId, Validators.required),
          required: new FormControl(res.required),
          isActive: new FormControl(res.isActive),
          isLocalizable: new FormControl(res.isLocalizable),
          isCollection: new FormControl(res.isCollection),
          showAtCreation: new FormControl(res.showAtCreation),
          createdBy: new FormControl(res.createdBy),
          createdDate: new FormControl(res.createdDate),
          lookupTableId: new FormControl(res.lookupTableId),
          uomTypeId:new FormControl(res.uomTypeId),
          attributeLookups: new FormControl(res.attributeLookups),
          attributeDropdowns: new FormControl(res.attributeDropDowns),
          dropdownName: new FormControl(),
          attributeUOMs:new FormControl(res.attributeUoms)
        });

        this.getDisplayType();
        this.getUOMType();
        this.getLookupColumnList(res.lookupTableId);
        this.getUom(res.uomTypeId);
        this.dropdownList = res.attributeDropDowns;
      });
  }

  //save attribute
  submit(attributeDetails) {
    let submitAttr: any;
    if (this.config.data.attrId !== null && this.config.data.attrId !== undefined)
      submitAttr = this._attrService.updateAttribute(attributeDetails.value);
    else
      submitAttr = this._attrService.saveAttribute(attributeDetails.value);

    submitAttr.subscribe(res => {
      this.toastr.success(res);
      this.back(res);
    });

  }


}
