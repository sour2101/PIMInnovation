import { Component, OnInit } from '@angular/core'; 
import { FormArray, FormControl, Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service'; 

import { attributeBRs } from '../../models/attributeBRs';
import { AttrBRServiceService } from '../../services/attr-brservice.service';
import { ToastsManager } from 'ng6-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attributebrs',
  templateUrl: './attributebrs.component.html' 
})
export class AttributebrsComponent implements OnInit {

  attributebrForm:FormGroup;
  attributeList:any;
  filteredAttributeList:any[]=[];
  displayDialog:boolean=false;
  attrBRList:attributeBRs[]=[];
  attributeId:number;
  attributeBrId:number;
  descriptionList=[];

  constructor(
    private route: ActivatedRoute,
    public router:Router,
    public _pimService: AppService,
    private _attrBrService:AttrBRServiceService,
    private _formBuilder: FormBuilder,
    public toastr: ToastsManager
  ) { 
    this.initialize();
  }

  ngOnInit() {
  }

  initialize(){
     
    this.route.params.subscribe(params => {
      this.getAttributeList();
      this.attributebrForm = this.getAttrBrForm(new attributeBRs());
      this.descriptionList=[{id:"shortName",name:"ShortName"},{id:"longName",name:"LongName"}];
      if(params.id!==null && params.id!==undefined){
          this.attributeId =params.id;
          this.getAttributeBrList();
      }

    });
  }

  getAttrBrForm(attrBr:attributeBRs):FormGroup{
    return this._formBuilder.group({
      id:new FormControl(attrBr.id),
      name:new FormControl( this.getName(attrBr.name),Validators.required),
      description:new FormControl(attrBr.description,Validators.required),
      attributeId:new FormControl(attrBr.attributeId),
      sortOrder:new FormControl(attrBr.sortOrder)
    });
  }

  getName(val){
    return {'name':val};
  }

  
  getAttributeBrList(){
    this._attrBrService.getAttributeBRList(this.attributeId)
    .subscribe(res=>{
      this.attrBRList = res;
    })
  }

  getAttributeList(){
    this._pimService.get("attribute")
    .subscribe(res=>{
      this.attributeList =res;
      this.filteredAttributeList=this.attributeList;
    });
  }

  filterAttributes(e){
    this.filteredAttributeList = this.attributeList.filter(f => f["name"].toString().toLocaleLowerCase().includes(e.query.toLocaleLowerCase()));
  }

   //back button click
   back(result = null) {
    
  }

  addAttrBr(){
    this.displayDialog=true;
    this.attributebrForm = this.getAttrBrForm(new attributeBRs());
  }

  editRow(id){
this._attrBrService.getAttributeBR(id)
.subscribe(res=>{
  this.attributebrForm= this.getAttrBrForm(res);
  this.attributeBrId = res.id;
 this.displayDialog=true;
});
  }

  deleteRow(id){
    this._attrBrService.deleteAttributeBr(id)
    .subscribe(res=>{
      this.toastr.success(res);
    });
  }

  cancel(){
  this.displayDialog=false;
  }

    //save attribute
    submit(attributeDetails) {
      let submitAttr: any;
      attributeDetails.value.name = attributeDetails.value.name.name;
      
      if (this.attributeBrId !== null && this.attributeBrId !== undefined)
        submitAttr = this._attrBrService.updateAttributeBR(attributeDetails.value);
      else
        submitAttr = this._attrBrService.saveAttributeBR(attributeDetails.value);
  
      submitAttr.subscribe(res => {
        this.toastr.success(res);
        this.displayDialog=false;
        this.getAttributeBrList();
      });
  
    }

}
