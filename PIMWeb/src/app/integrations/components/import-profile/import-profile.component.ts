import { Component, OnInit } from '@angular/core';
import { ImportProfile } from '../../models/ImportProfile';
import { ImportProfileService } from '../../services/import-profile.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DialogService } from 'primeng/api';
import { ImportProfileFormComponent } from '../import-profile-form/import-profile-form.component';

@Component({
  selector: 'app-import-profile',
  templateUrl: './import-profile.component.html' 
})
export class ImportProfileComponent implements OnInit {

  profileList:ImportProfile[];
  dialogHeader:string;
  profileForm:FormGroup;
  filterForm:FormGroup;
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  totalRecords: any;
  
  constructor(
    private _profileService:ImportProfileService,
    private translate:TranslateService,
    private _formBuilder:FormBuilder,
    private dialogService:DialogService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize(){
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy='id';
    this.sortOrder='false'; 
    this.filterForm = this._formBuilder.group({
      name:new FormControl("")
    });
  }

  
  pageChange(event){
    this.pageSize= event.rows!==undefined?event.rows:this.pageSize ;
    this.pageNumber=event.page!==undefined?event.page+1:this.pageNumber;
    this.loadProfileList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  sorting(event){
    this.sortBy=event.sortField!==undefined?event.sortField:this.sortBy;
    this.sortOrder=event.sortOrder===1?'true':'false'; 
    this.loadProfileList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  filtering(){
    this.loadProfileList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }

  loadProfileList(pageSize,pageNumber,sortBy,sortOrder,filterBy){
    this._profileService.getImportProfileList(pageSize,pageNumber,sortBy,sortOrder,filterBy)
    .subscribe((res) => { 
      this.totalRecords=res.totalCount;
      this.profileList = res.entries;
     });
  }

  
  addImportProfile(){
    this.translate.get('data.btnAddNewProfile').subscribe((res)=> 
    {
      this.dialogHeader=res;
    });
    this.openDialog();
  }

  openDialog(): void {
    const ref = this.dialogService.open(ImportProfileFormComponent, {
      header:this.dialogHeader,
      width:'60%' 
      });   
      
      ref.onClose.subscribe((res) => {
        if(res!==null)
        this.loadProfileList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
      });
  }

}
