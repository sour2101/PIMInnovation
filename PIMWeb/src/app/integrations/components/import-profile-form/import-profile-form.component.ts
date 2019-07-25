import { Component, OnInit } from '@angular/core'; 
import { ToastsManager } from 'ng6-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { ImportProfileService } from '../../services/import-profile.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-import-profile-form',
  templateUrl: './import-profile-form.component.html' 
})
export class ImportProfileFormComponent implements OnInit {

   
  profileForm:FormGroup; 
  jobTypeList:any[];
  constructor(
    private _pimService:AppService,
    private _profileService:ImportProfileService,
    private toastr: ToastsManager,
    private _formBuilder:FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize(){
    this.getJobTypes();
    this.profileForm = this._formBuilder.group({
      id:new FormControl(0),
      jobTypeId:new FormControl(0,Validators.required),
      name:new FormControl("",Validators.required),
      folderName:new FormControl("",Validators.required),
      modifiedDate:new FormControl("")
    });
  }

  getJobTypes(){
    this._pimService.get("jobType")
    .subscribe(res=>{
      this.jobTypeList=res;
    });
  }

  changeJobType(event){
    debugger;
    this.profileForm.value.jobTypeId=event.value.id;
  }

  back(result){
    this.ref.close(result);
    return false;
  }

  submit(profileDetails){
    let submitProfile;
    debugger;
    submitProfile=this._profileService.saveImportProfile(profileDetails.value);
    
    submitProfile.subscribe(res=>{
      this.toastr.success(res);
      this.back(res);
    });  
  }
}
