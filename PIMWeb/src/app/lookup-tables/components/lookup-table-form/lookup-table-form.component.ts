import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LookupColumn } from '../../models/LookUpColumns';
import { ToastsManager } from 'ng6-toastr';
import { DynamicColumn } from '../../models/dynamicColumn'; 
import { LookupColumnService } from '../../services/lookup-column.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-lookup-table-form',
  templateUrl: './lookup-table-form.component.html'
})
export class LookupTableFormComponent implements OnInit {

  tableForm:FormGroup; 
  tableId:number; 
  tableData:any[];
  columnList:any;   

  constructor(
    private toastr:ToastsManager,
    public _lookupColumnService:LookupColumnService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
    )
  {
      this.initialize();
  }

  ngOnInit() {
  }

  initialize(){
    this.columnList=this.config.data.columnList;
    this.tableId=this.config.data.tableId;
    if(this.config.data.columnData!==null && this.config.data.columnData!==undefined){
      this.getFields(this.config.data.columnData);
    }
    else{
      this.getFields(null);
    }
  }

  getFields(rowData:{ [s: string]: LookupColumn; } = {}){
    let fieldsCtrls = {};
    for(let c of this.columnList){
      let colName=this.camalCase(c.columnName);
       if(!c.nullable)
        fieldsCtrls[c.columnName] = new FormControl(rowData!==null?rowData[colName]:'',Validators.required);
       else
        fieldsCtrls[c.columnName]  = new FormControl(rowData!==null?rowData[colName]:'');
     }
 
     fieldsCtrls["tableId"]=new FormControl();
     fieldsCtrls["id"]=new FormControl(rowData!==null?rowData['id']:0);
     this.tableForm = new FormGroup(fieldsCtrls);
  }

  isValid(controlName) { 
    return this.tableForm.controls[controlName].valid; 
  }

  camalCase(text){
    return text[0].toLocaleLowerCase()+ text.substring(1,text.length);
  }
   

  back(result){
    this.ref.close(result);
    return false;
  }

  //save record
  submit(tableDetails){
    let unique;
    let submitRecord;
    let columnValues:DynamicColumn[]=[];
    for(let c of  this.columnList){
      if(c.unique)
        unique = tableDetails.value[c.columnName];
      columnValues.push({key:c.columnName,value:tableDetails.value[c.columnName],tableId:this.tableId})
    }
      if(tableDetails.value.id!==0)
        submitRecord =this._lookupColumnService.updateColumnRecord(columnValues);
      else
        submitRecord =this._lookupColumnService.saveColumnRecord(columnValues);
      
        submitRecord.subscribe(res=>{
          this.toastr.success(res);
          this.back(res);
        });
    
      }
    }
