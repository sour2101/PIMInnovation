import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../core/services/file.service';
import { ToastsManager } from 'ng6-toastr'; 
import { Router } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lookup-import',
  templateUrl: './lookup-import.component.html' 
})
export class LookupImportComponent implements OnInit {

  msg;
  
  constructor(
    private _fileservice:FileService,
    private _formBuilder:FormBuilder,
    private toastr:ToastsManager,
    private router:Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
    ){
      this.initialize();
    }

  ngOnInit () {  }

  initialize(){
    
  }

  myUploader(event):void {
    const file :File = event.files[0];
    this._fileservice.fileupload("lookupUpload",file)
  .subscribe((res) => { 
      this.back(null);
      this.toastr.success("File uploaded successfully");
      this.router.navigate(["/integrationjobs"]);
  },
  error => {
    debugger;
    this.msg = <any>error;
    if(error.status===403){
      this.router.navigate(['/forbidden']);
    }
    else if(error.status==401){
      this.router.navigate(['/accessRightError']);
    }
    else if(error.status==400 ){
      this.toastr.warning("File already exists");
    }
    else if(error.status===500){
      this.router.navigate(['/accessRightError']);
    }

  });
}

back(result){
  this.ref.close(result);
  return false;
}

}
