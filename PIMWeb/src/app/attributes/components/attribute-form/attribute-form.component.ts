import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ToastsManager } from 'ng6-toastr'; 
import { forkJoin } from "rxjs/observable/forkJoin"; 
import { DynamicDialogRef,DynamicDialogConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { UserPreferenceService } from 'src/app/home/services/user-preference.service';
import { AttrService } from '../../services/attr.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html'
})
export class AttributeFormComponent implements OnInit {

  attributeForm:FormGroup;
  dataTypeList:any;
  displayTypeList:any;
  attrGroupList:any;

  constructor(public _pimService:AppService,
    private _attrService:AttrService,
    private _userPrefService:UserPreferenceService,
    public toastr: ToastsManager,
    private _formBuilder:FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { 
      this.initialize();
    }

  ngOnInit() {
  }

  initialize(){
    this.attributeForm = this._formBuilder.group(
      {
        shortName:new FormControl("",Validators.required),
        longName:new FormControl("",Validators.required),
        attributeGroupId:new FormControl(this.config.data.groupId,Validators.required),
        dataTypeId:new FormControl("",Validators.required),
        displayTypeId:new FormControl("",Validators.required),
        required:new FormControl(false),
        isActive:new FormControl(true),
        isLocalizable:new FormControl(false),
        showAtCreation:new FormControl(false)
      });

      this.getAttributeGroup();
      this.getDataType();

      if(this.config.data.attrId!==null && this.config.data.attrId!== undefined)
      this.getAttribute(this.config.data.attrId);

  }


  //get all masters
  getAttributeGroup(){
    this._pimService.get(environment.attributeGroup_url)
    .subscribe(res=>{
      this.attrGroupList=res;
    });
  }

  getDataType(){
    this._pimService.get(environment.dataType_url)
    .subscribe(res=>{
      this.dataTypeList=res;
    });
  }

  getDisplayType(){
    this._pimService.getById(environment.displayType_url,this.attributeForm.value.dataTypeId)
    .subscribe(res=>{
      this.displayTypeList=res;
    });
  }

  back(result=null){
    this.ref.close(result);
    return false;
  }

  getAttribute(id){
    this._attrService.getAttribute(id)
    .subscribe(res=>{
      this.attributeForm = this._formBuilder.group(
        {
          id:new FormControl(res.id),
          shortName:new FormControl(res.shortName,Validators.required),
          longName:new FormControl(res.longName,Validators.required),
          attributeGroupId:new FormControl(res.attributeGroupId,Validators.required),
          dataTypeId:new FormControl(res.dataTypeId,Validators.required),
          displayTypeId:new FormControl(res.displayTypeId,Validators.required),
          required:new FormControl(res.required),
          isActive:new FormControl(res.isActive),
          isLocalizable:new FormControl(res.isLocalizable),
          showAtCreation:new FormControl(res.showAtCreation),
          createdBy:new FormControl(res.createdBy),
          createdDate:new FormControl(res.createdDate)
        });

        this.getDisplayType();
    });
  }

  //save attribute
  submit(attributeDetails){
    let submitAttr:any;

    if(this.config.data.attrId!==null && this.config.data.attrId!== undefined)
      submitAttr=this._attrService.updateAttribute(attributeDetails.value);
    else
      submitAttr = this._attrService.saveAttribute(attributeDetails.value); 
    
    submitAttr.subscribe(res=>{
      this.toastr.success(res);
      this.back(res);
    });  

  }


}
