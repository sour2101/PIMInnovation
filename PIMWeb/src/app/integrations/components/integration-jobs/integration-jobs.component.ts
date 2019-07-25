import { Component, OnInit } from '@angular/core'; 
import { ToastsManager } from 'ng6-toastr';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { interval } from 'rxjs'; 
import { ConfirmationService } from 'primeng/api'; 
import { IntegrationJob } from '../../models/integrationJob';
import { IntegrationJobService } from '../../services/integration-job.service'; 
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-integration-jobs',
  templateUrl: './integration-jobs.component.html' ,
  providers:[ConfirmationService]
})
export class IntegrationJobsComponent implements OnInit {
   
  integrationJobList:IntegrationJob[];
  dialogHeader:string;
  profileForm:FormGroup;
  filterForm:FormGroup;
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  totalRecords: any;
  refresh:boolean=false;
  timer;
  jobTypeList:any[];
  statusList:any[];
  constructor(
    private _pimService:AppService,
    private _jobService:IntegrationJobService, 
    private _router:Router,
    private _formBuilder:FormBuilder,
    private toastr:ToastsManager, 
    private _confirmationService:ConfirmationService
    ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize(){
    this.getJobTypes();
    this.getStatus();
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy='id';
    this.sortOrder='true'; 
    this.filterForm = this._formBuilder.group({
      name:new FormControl(""),
      profileName:new FormControl(""),
      statusName:new FormControl(""),
      createdBy:new FormControl("")
    });

    this.loadProfileList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }

  getJobTypes(){
    this._pimService.get("jobType")
    .subscribe(res=>{
      this.jobTypeList=res;
    });
  }

  getStatus(){
    this._pimService.get("integrationStatus")
    .subscribe(res=>{
      this.statusList=res;
    });
  }

  changeProfile(event){
    this.filterForm.value.profileName=event.value==null?null:event.value.name;
    this.loadProfileList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }

  changeStatus(event){
    this.filterForm.value.statusName=event.value==null?null: event.value.name;
    this.loadProfileList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
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
    this._jobService.getIntegrationJobList(pageSize,pageNumber,sortBy,sortOrder,filterBy)
    .subscribe((res) => { 
      this.totalRecords=res.totalCount;
      this.integrationJobList = res.entries;
     });
  }

  autoRefresh(event){
    if(event.checked){
   this.timer = interval(5000)
    .subscribe(() => {
      this.loadProfileList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
    });
  }
    else {
    this.timer.unsubscribe();
    }
  }

  viewJob(selectedJob){
    debugger;
    this._router.navigate(["jobDetails/"+selectedJob.id]);
  }

  deleteJob(selectedJob){
    this._confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._jobService.deleteJob(selectedJob.id)
        .subscribe((res)=>{
          this.toastr.success(res);
          this.loadProfileList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
        });
      },
      reject: () => {
          return false;
      }
  });
}


}
