import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators, FormBuilder } from '@angular/forms';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import { ToastsManager } from 'ng6-toastr'; 
import { OrganizationService } from '../../services/organization.service';
import { FileService } from '../../../core/services/file.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html' ,
  providers:[DatePipe]
})
export class OrganizationFormComponent  {

  public orgForm:FormGroup;
  loc:any;
  msg;
   constructor( 
     public _pimService:OrganizationService,
     public toastr: ToastsManager, 
     public ref: DynamicDialogRef, 
     public config: DynamicDialogConfig,
     private _formBuilder: FormBuilder,
     public _fileservice:FileService,
     private datePipe: DatePipe
     ){
    
    this.orgForm = this._formBuilder.group({
        id:new FormControl(config.data.orgId),
        shortName:new FormControl("",Validators.required),
        longName:new FormControl("",Validators.required),
        parentId:new FormControl(config.data.parentId,Validators.required),
        logo:new FormControl(),
        isCatalog:new FormControl(false),
        isEnvironment:new FormControl(false),
        isContainor:new FormControl(false)
    });

    if(config.data.orgId!==null && config.data.orgId!==undefined && config.data.orgId!==0)
      this.loadOrg(config.data.orgId);   
   }

   loadOrg(id){
    this._pimService.getOrganizationsById(id)
    .subscribe((res) => { 
    
      this.orgForm = this._formBuilder.group({
        id:new FormControl(res.id),
        shortName:new FormControl(res.shortName,Validators.required),
        longName:new FormControl(res.longName,Validators.required),
        parentId:new FormControl(res.parentId,Validators.required),
        isCatalog:new FormControl(res.isCatalog),
        logo:new FormControl(res.logo),
        isEnvironment:new FormControl(res.isEnvironment),
        isContainor:new FormControl(res.isContainor),
        createdBy:new FormControl(res.createdBy),
        createdDate:new FormControl(this.datePipe.transform(res.createdDate,'yyyy-MM-dd'))
      });
    }),
    error => this.msg = <any>error;
  }


   back(result){
    this.ref.close(result);
    return false;
  }

  submit(orgDetails){
    let submitOrg:any;
  debugger;
    if(this.config.data.orgId===null || this.config.data.orgId===undefined ||  this.config.data.orgId===0)
      submitOrg =   this._pimService.saveOrganization(orgDetails.value)
    else
      submitOrg =   this._pimService.updateOrganization(orgDetails.value)

    submitOrg.subscribe((res) =>{
       
      this.toastr.success(res);
            this.back(this.orgForm.value);
          },
          error => {
                  if (error.status === 400 && JSON.parse(error._body).modelState["org.name"] !== undefined) {
                      this.toastr.warning(JSON.parse(error._body).modelState["org.name"][0]);
                  }
              });
  }

  change(){
    debugger;
  }

  onBasicUploadAuto(event):void {
      debugger;
    var fileToUpload:File = event.files[0];
    this._fileservice.fileupload("imageUpload",fileToUpload)
    .subscribe((res) => { 
      this.orgForm.value.logo=res;
        // this.toastr.success("File uploaded successfully");
        // this.router.navigate(["/integrationjobs"]);
    },
    error => this.msg = <any>error);
}
}