import { Component, OnInit } from '@angular/core'; 
import { JobDetailsService } from '../../services/job-details.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobDetailsList:any[];
  filterForm:FormGroup;
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  totalRecords: any;
  constructor(
    private _formBuilder:FormBuilder,
    private _router:Router,
    private _activateRoute:ActivatedRoute,
    private _jobService:JobDetailsService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize(){
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy='id';
    this.sortOrder='true'; 
    this.filterForm = this._formBuilder.group({
      integrationId:new FormControl(0),
      sheetName:new FormControl(""),
      entityName:new FormControl(""),
      code:new FormControl(""),
      errorMessage:new FormControl("")
    });

    this._activateRoute.paramMap.subscribe(params => {
      debugger;
      if(params.get('id')!==null){
        this.filterForm.value.integrationId =+params.get('id');
      this.loadJobDetails(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
      }
   });  
  }

  back(){
    this._router.navigate(["integrationjobs"]);
  }

  loadJobDetails(pageSize,pageNumber,sortBy,sortOrder,filterBy){
    this._jobService.getJobDetailsList(pageSize,pageNumber,sortBy,sortOrder,filterBy)
    .subscribe((res) => { 
      this.totalRecords=res.totalCount;
      this.jobDetailsList = res.entries;
     });
  }


}
