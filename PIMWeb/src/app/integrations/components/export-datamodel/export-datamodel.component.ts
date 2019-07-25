import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { SelectItem } from 'primeng/api';

import { FileService } from "../../../core/services/file.service";
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormControl,  Validators } from '@angular/forms'; 
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-export-datamodel',
  templateUrl: './export-datamodel.component.html'
})
export class ExportDatamodelComponent implements OnInit {
  public _exportForm;
  sheetList:SelectItem[];
  selectedSheets:any;
  dataLocalList:any[];
  dataLocalId:number;
  constructor(private _fileService:FileService,private _pimService:AppService,private _formBuilder:FormBuilder) { 
    this.initialize();
  }

  initialize(){
    this._exportForm = this._formBuilder.group({
      selectedSheets:new FormControl("", [Validators.required]),
      selectedLocals:new FormControl("", [Validators.required]),
    });

    this.getSheet();
    this.getLocal();
  }


  submit(formDetails){
    let sheets=[];
    let locals=[];
    for(let i=0;i<formDetails.value.selectedSheets.length;i++)
    {
      sheets[i]=formDetails.value.selectedSheets[i].name;
    }

    for(let i=0;i<formDetails.value.selectedLocals.length;i++)
    {
      locals[i]=formDetails.value.selectedLocals[i].name;
    }

    this._fileService.fileDownload("dataModel",{sheets:sheets,locals:locals})
    .subscribe(res=> {
     
     });
  }
 

  ngOnInit() {
  }

  getSheet(){
    this._pimService.get(environment.getSheet_url)
    .subscribe(res=>{
      this.sheetList=res;
    });

  }

  getLocal(){
    this._pimService.get(environment.language_url)
        .subscribe((res) => { 
            this.dataLocalList = res;
            this.dataLocalId=res[0].id;
           });
  }

}
