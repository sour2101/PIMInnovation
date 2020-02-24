import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LookupColumn } from '../../models/LookUpColumns';
import { Router,ActivatedRoute  } from '@angular/router';
import { LookupTableService } from '../../services/lookup-table.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-lookup-column-form',
  templateUrl: './lookup-column-form.component.html'
})
export class LookupColumnFormComponent implements OnInit {

  lookupTableForm:FormGroup;
  lookupTableColumnForm:FormGroup;
  displayDialog: boolean=false;
  edit:boolean=false;
  rowIndex:number;
  dataTypeList:any[];
  lookupColumnList:LookupColumn[];
  clonedColumns: { [s: number]: LookupColumn; } = {};

  constructor(
    private _formBuilder:FormBuilder,
    public toastr: ToastsManager,
    private _router:Router,
    private _activateRoute:ActivatedRoute,
    public _lookupTableService:LookupTableService) {

    this.dataTypeList=[
      {name:'varchar'},
      {name:'int'},
      {name:'bit'}
    ];

     this.lookupTableColumnForm=this._formBuilder.group(
      {
        id:0,
        columnName:new FormControl("Id",Validators.required),
        dataType:new FormControl("int",Validators.required),
        length:new FormControl(10,Validators.required),
        nullable:new FormControl(false),
        unique:new FormControl(false),
        tableId:new FormControl(0)
      });

      this.lookupTableForm=_formBuilder.group(
        {
          id:0,
          tableName:new FormControl("",Validators.required),
          columns:this.lookupTableColumnForm
       });
      
      this.lookupColumnList= [this.lookupTableColumnForm.value];
      this._activateRoute.paramMap.subscribe(params => {
           if(params.get('id')!==null)
           this.getLookUptable(+params.get('id'));
        });
  }

  ngOnInit() {
  }


  //get look up table
  getLookUptable(id){
    this._lookupTableService.getLookUpTable(id)
    .subscribe(res=>{
      this.lookupTableForm =this._formBuilder.group(
        {
          id:new FormControl(res.id),
          tableName:new FormControl(res.tableName,Validators.required),
          columns:res.columns
       });

       this.lookupColumnList =res.columns;
    });
  }

  //lookup column functions
  addRow(){
    this.displayDialog=true;
    this.lookupTableColumnForm=this._formBuilder.group(
      {
        id:0,
        columnName:new FormControl("",Validators.required),
        dataType:new FormControl("varchar",Validators.required),
        length:new FormControl(255,Validators.required),
        nullable:new FormControl(true),
        unique:new FormControl(false),
        tableId:new FormControl(0)
      }); 
  }

  editRow(col: LookupColumn,ri) {
    this.displayDialog=true;
    this.edit=true;
    this.rowIndex=ri;
    this.lookupTableColumnForm =this._formBuilder.group(
          {
            id:col.id,
            columnName:new FormControl(col.columnName,Validators.required),
            dataType:new FormControl(col.dataType,Validators.required),
            length:new FormControl(col.length,Validators.required),
            nullable:new FormControl(col.nullable),
            unique:new FormControl(col.unique),
            tableId:new FormControl(col.tableId),
            createdby:new FormControl(col.createdBy),
            createdDate:new FormControl(col.createdDate)
          });
  }

  cancelEditRow(){
    this.displayDialog=false;
  }

  saveRow(lookupTableColumnDetails){
    this.displayDialog=false;
    if(this.edit)
    {
      this.lookupColumnList[this.rowIndex].id=lookupTableColumnDetails.value.id;
      this.lookupColumnList[this.rowIndex].columnName=lookupTableColumnDetails.value.columnName;
      this.lookupColumnList[this.rowIndex].dataType=lookupTableColumnDetails.value.dataType;
      this.lookupColumnList[this.rowIndex].length=lookupTableColumnDetails.value.length;
      this.lookupColumnList[this.rowIndex].nullable=lookupTableColumnDetails.value.nullable;
      this.lookupColumnList[this.rowIndex].unique=lookupTableColumnDetails.value.unique;
      this.lookupColumnList[this.rowIndex].tableId=lookupTableColumnDetails.value.tableId;
      this.lookupColumnList[this.rowIndex].createdBy=lookupTableColumnDetails.value.createdBy;
      this.lookupColumnList[this.rowIndex].createdDate=lookupTableColumnDetails.value.createdDate;
      this.rowIndex=0;
      this.edit=false;
    }
    else{
      this.lookupColumnList.push(lookupTableColumnDetails.value);
    }
  }

  deletetRow(){
     
  }

  //table functions
  back(){
    this._router.navigate(["lookuptableList"]);
  }

  //save record
  submit(tableForm){
    let submitTable:any;
    tableForm.value.columns = this.lookupColumnList;
    if(this.lookupTableForm.value.id!==0)
      submitTable = this._lookupTableService.updateLookUpTable(tableForm.value);
    else  
      submitTable=this._lookupTableService.saveLookUpTable(tableForm.value);
    
    submitTable.subscribe(res=>{
      this.toastr.success(res);
      this.back();
    }) ; 
    
  }





}
