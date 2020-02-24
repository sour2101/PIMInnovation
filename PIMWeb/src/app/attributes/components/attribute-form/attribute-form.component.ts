import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ToastsManager } from 'ng6-toastr'; 
import { environment } from 'src/environments/environment';
import { AttrService } from '../../services/attr.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from '../../models/attribute'; 
import { AttributeService } from '../../services/attributeService';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.css'],
  providers:[AttributeService]
})
export class AttributeFormComponent implements OnInit {

  attributeForm: FormGroup;
  dataTypeList: any;
  attributeId:number;
  
  displayTypeList: any;
  attrGroupList: any;
  lookupTableList: any;
  lookupColumnList: any;
  dropdownList: any = [];
  uomTypeList:any;
  uomList:any;
  attrBRList:[];

  constructor(
    private route: ActivatedRoute,
    public router:Router,
    public _pimService: AppService,
    private _attrService: AttrService,
    private _attributeService :AttributeService,
    public toastr: ToastsManager,
    private _formBuilder: FormBuilder) {
    this.initialize();
  }

  ngOnInit() {
  }

  initialize() {
    this.getAttributeGroup();
    this.getDataType();
    this.getLookupTable();
    this.getUOMType();
    debugger;
   this._attributeService;
    this.route.params.subscribe(params => {
    this.attributeForm = this.getAttributeForm(new Attribute());

      if(params.id!==null && params.id!==undefined){
        this.attributeId = params.id;
        this.getAttribute(this.attributeId);
      }
    });
  }

  getAttributeForm(data:Attribute):FormGroup{
    return this._formBuilder.group({
      id:new FormControl(data.id),
      shortName: new FormControl(data.shortName, Validators.required),
      longName: new FormControl(data.longName, Validators.required),
      attributeGroupId: new FormControl(data.attributeGroupId, Validators.required),
      dataTypeId: new FormControl(data.dataTypeId, Validators.required),
      displayTypeId: new FormControl(data.displayTypeId, Validators.required),
      required: new FormControl(data.required),
      isActive: new FormControl(data.isActive),
      isLocalizable: new FormControl(data.isLocalizable),
      isCollection: new FormControl(data.isCollection),
      showAtCreation: new FormControl(data.showAtCreation),
      lookupTableId: new FormControl(data.lookupTableId),
      uomTypeId: new FormControl(data.uomTypeId),
      attributeLookups: new FormControl(data.attributeLookups),
      attributeDropdowns: new FormControl(data.attributeDropDowns),
      dropdownName: new FormControl(),
      // attributeUOMs:new FormControl([]) 
    });
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
    debugger;
    if (dropdownName !== "" && dropdownName !== null) {
      if(this.dropdownList.length===0 ){
      this.dropdownList = [...this.dropdownList, { id: 0, name: dropdownName }];
      this.attributeForm.patchValue({
        attributeDropdowns: this.dropdownList,
        dropdownName: ""
      });
    }else if(this.dropdownList.find(ddl=>ddl['dropdownName']!==dropdownName).name!==dropdownName){
      this.dropdownList = [...this.dropdownList, { id: 0, name: dropdownName }];
      this.attributeForm.patchValue({
        attributeDropdowns: this.dropdownList,
        dropdownName: ""
      });
    }
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
    this.router.navigate(["attributeList"]);
  }

  getAttribute(id) {
    this._attrService.getAttribute(id)
      .subscribe(res => {
        this.attributeForm = this.getAttributeForm(res);
        this.dropdownList = res.attributeDropDowns;

        this.getDisplayType();
        this.getUOMType();
        this.getLookupColumnList(res.lookupTableId);
        //this.getUom(res.uomTypeId);
      });
  }

  //save attribute
  submit(attributeDetails) {
    let submitAttr: any;
    if (this.attributeId === undefined)
      submitAttr = this._attrService.saveAttribute(attributeDetails.value);
    else
      submitAttr = this._attrService.updateAttribute(attributeDetails.value);

    submitAttr.subscribe(res => {
      this.toastr.success(res);
      this.back(res);
    });

  }


}
