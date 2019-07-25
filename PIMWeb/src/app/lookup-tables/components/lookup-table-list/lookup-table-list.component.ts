import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 
import { Router } from '@angular/router';
import { LookupTableService } from '../../services/lookup-table.service';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';  

import { LookupColumnService } from '../../services/lookup-column.service';
import { ToastsManager } from 'ng6-toastr';
import { ConfirmationService, DialogService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { LookupTableFormComponent } from '../lookup-table-form/lookup-table-form.component';
import { FileService } from 'src/app/core/services/file.service';
import { LookupImportComponent } from '../lookup-import/lookup-import.component';

@Component({
  selector: 'app-lookup-table-list',
  templateUrl: './lookup-table-list.component.html',
  providers:[ConfirmationService,DialogService]
})
export class LookupTableListComponent implements OnInit {

  tableForm:FormGroup;
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  tableNameList;
  tableId:number;
  dataLocalId:number;
  tableData:any[];
  columnList:any;
  columnFields=[];
  displayDialog:boolean=false;
  dialogHeader:string;
  dataLocalList:any[];
  _exportForm;
  selectedSheets:any;
  totalRecords;
  pageSizeOptions:any[];

  constructor(
    private router:Router,
    private translate:TranslateService,
    public dialogService: DialogService,
    private _pimService:AppService,
    private toastr:ToastsManager,
    private _confirmationService:ConfirmationService,
    private _lookupTableService:LookupTableService,
    private _lookupColumnService:LookupColumnService,
    private _fileService:FileService,
    private _formBuilder:FormBuilder
  ) 
  {
    this.initialize();
  }

  ngOnInit() {
  }

  initialize(){
    this.pageSizeOptions=[
      {name: '10', code: '10'},
      {name: '20', code: '20'},
      {name: '50', code: '50'},
      {name: '100', code: '100'},
    ];
    this.getLocal();
    this.getLookUpTables();
    this.initiallizeExport();
  }

  getLocal(){
    this._pimService.get(environment.language_url)
        .subscribe((res) => { 
            this.dataLocalList = res;
            this.dataLocalId=res[0].id;
           });
  }

  changelocal(event){
    this.dataLocalId =event;
  }

  pageChange(event){
    this.pageSize=event.value.name;
  }


  getLookUpTables(){
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy="id";
    this.sortOrder="false";
    this._pimService.get("lookupTableList")
    .subscribe(res=>
      {
        this.tableNameList=res;
        this.columnList=res[0].columns;
        this.tableId=res[0].id;
        this.getLookUpTableData(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,{tableId:this.tableId,local:this.dataLocalId});
      });
  }

  loadLookup(event){
    this.tableId=event;
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy="id";
    this.sortOrder="false";
    this._pimService.getById("lookupTableList",this.tableId)
    .subscribe(res=>
      {
        this.columnList=res[0].columns;
        this.getLookUpTableData(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,{tableId:this.tableId,local:this.dataLocalId});
      });
  }

  getLookUpTableData(pageSize,pageNumber,sortBy,sortOrder,filterBy){
    this._lookupTableService.getLookUpTableList(pageSize,pageNumber,sortBy,sortOrder,filterBy)
    .subscribe(res=>{
      this.tableData =res;
      this.totalRecords=res.length;
    });
  }

  sorting(event){
    this.sortBy=event.sortField!==undefined?event.sortField:this.sortBy;
    this.sortOrder=event.sortOrder===1?'true':'false'; 
    this.getLookUpTableData(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,{tableId:this.tableId,local:this.dataLocalId});
  }

  addLookUpTable(){
    this.router.navigate(["createLookuptable"]);
  }

  editLookUpTable(){
    this.router.navigate(["createLookuptable/"+this.tableId]);
  }

  
  addLookupData(){
    this.translate.get('data.lblAddRecord').subscribe((res)=> 
    {
      this.dialogHeader=res;
    });
    this.openDialog(null);
  }

  editRecord(rowData){
    this.translate.get('data.lblEditRecord').subscribe((res)=> 
    {
      this.dialogHeader=res;
    });
    this.openDialog(rowData);
  }

  deleteRecord(rowData){
    let header;
    let msg;
    this.translate.get('data.headerDelete').subscribe((res)=> 
    {
      header=res;
    });

    this.translate.get('data.msgDelete').subscribe((res)=> 
    {
      msg=res;
    });

    this._confirmationService.confirm({
      message: msg,
      header: header,
      icon: 'pi pi-info-circle',
      accept: () => {
        this._lookupColumnService.deleteColumnRecord(this.tableId,rowData.id)
        .subscribe(res=>{
          this.toastr.success(res);
          this.getLookUpTableData(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,{tableId:this.tableId});
          });
        },
        reject: () => {
            return false;
        }
    });
  }


  openDialog(columnData): void {
    const ref = this.dialogService.open(LookupTableFormComponent, {
      data: { columnList: this.columnList,columnData:columnData,tableId:this.tableId},
      header: this.dialogHeader,
      width:'50%'
      });   
      
      ref.onClose.subscribe((result) => {
        if(result!==null)
          this.loadLookup(this.tableId);
      });
  }

  camalCase(text){
    return text[0].toLocaleLowerCase()+ text.substring(1,text.length);
  }

  //export Lookup Table
  initiallizeExport(){
    this._exportForm = this._formBuilder.group({
      selectedTables:new FormControl("", [Validators.required]),
      selectedLocals:new FormControl("")
    });
  }


  //Lookup Export
  dialogLookupExport(){
    this.displayDialog=true;
  }

  //Lookup Import
  dialogLookupImport(){
    let header;
    this.translate.get('data.btnImport').subscribe((res)=> 
    {
      header=res;
    });
    const ref = this.dialogService.open(LookupImportComponent, {
      data: { },
      header: header,
      width:'70%'
      });   
      
      ref.onClose.subscribe(() => {
      });
  }

  exportLookup(formDetails){
    let sheets=[];
    let locals=[];
    for(let i=0;i<formDetails.value.selectedTables.length;i++)
    {
      sheets[i]=formDetails.value.selectedTables[i].id;
    }

    for(let i=0;i<formDetails.value.selectedLocals.length;i++)
    {
      locals[i]=formDetails.value.selectedLocals[i].name;
    }

    this._fileService.fileDownload("exportLookupTable",{sheets:sheets,locals:locals})
    .subscribe(()=> {
      
     });
     this.displayDialog=false;
  }
}
