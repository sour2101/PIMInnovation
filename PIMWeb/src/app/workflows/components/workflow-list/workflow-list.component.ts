import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { WorkflowService } from '../../services/workflow.service';
import { workflow } from '../../models/workflow';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html' ,
  providers:[ConfirmationService]
})
export class WorkflowListComponent implements OnInit {

  workflowList:workflow[]
  filterForm;
  userList:[];
  dialogheader:string;
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  totalRecords:number;
  constructor(
    private _workflowService:WorkflowService,
    public router:Router,
    private toastr:ToastsManager,
    private translate:TranslateService,
    private _formBuilder:FormBuilder,
    private _confirmationService:ConfirmationService
  ) { }

  initialize(){
    
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy='id';
    this.sortOrder='false'; 
    this.filterForm = this._formBuilder.group({
      firstname:new FormControl(""),
      lastname:new FormControl(""),
      username:new FormControl("")
    });
    this.loadworkflowList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  ngOnInit() {
    this.initialize();
  }

  pageChange(event){
    this.pageSize= event.rows!==undefined?event.rows:this.pageSize ;
    this.pageNumber=event.page!==undefined?event.page+1:this.pageNumber;
    this.loadworkflowList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  sorting(event){
    this.sortBy=event.sortField!==undefined?event.sortField:this.sortBy;
    this.sortOrder=event.sortOrder===1?'true':'false'; 
    this.loadworkflowList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  filtering(){
    this.loadworkflowList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }

  loadworkflowList(pageSize,pageNumber,sortBy,sortOrder,filterBy){

  }

  addWorkflow(){
    this.router.navigate(["/createWorkflow"]);
  }

  editWorkflow(){}

  deleteWorkflow(selectedWorkflow){
    this._confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._workflowService.deleteWorkflow(selectedWorkflow.id)
        .subscribe((res)=>{
          this.toastr.success(res);
          this.loadworkflowList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
        });
      },
      reject: () => {
          return false;
      }
  });
  }




}
