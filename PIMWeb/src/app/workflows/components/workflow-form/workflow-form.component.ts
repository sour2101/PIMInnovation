import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { workflowsteps } from '../../models/workflowSteps';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-workflow-form',
  templateUrl: './workflow-form.component.html' 
})
export class WorkflowFormComponent implements OnInit {

  workflowGroup:FormGroup;
  workflowStep:FormGroup;
  workflowSteps:FormGroup;
  workflowStepList:workflowsteps[];
  actionsList:any[];
  roleNames=[]
  displayDialog:boolean=false;
  edit:boolean=false;
  rowIndex:number;
  constructor(
    private _workflowService:WorkflowService,
    public router:Router,
    private toastr:ToastsManager,
    private _activateRoute:ActivatedRoute,
    private _formBuilder:FormBuilder
  ) 
  { 
    this.initialize();
  }

  ngOnInit() {
  }

  initialize(){
    this.actionsList=[{id:1,name:"Approve"},{id:2,name:"Reject"},{id:3,name:"Done"}];

    this.workflowStep= this._formBuilder.group({
      id:new FormControl(0),
      stepName:new FormControl("",Validators.required),
      actions:new FormControl(3,Validators.required),
      businessRule:new FormControl("",Validators.required),
      roles:new FormControl("",Validators.required)
    });

    this.workflowGroup=this._formBuilder.group({
      id:new FormControl(0),
      name:new FormControl("",Validators.required),
      active:new FormControl(true),
      workflowSteps : this.workflowStep
    });

    this.workflowStepList=[];

    this._activateRoute.paramMap.subscribe(params => {
      if(params.get('id')!==null)
      this.getWorkflow(+params.get('id'));
   });
  }

  getWorkflow(id){
    this._workflowService.getWorkflow(id)
    .subscribe(res=>{

    });
  }

  //add edit steps
  addRow(){
    this.displayDialog=true;
    this.workflowStep= this._formBuilder.group({
      id:new FormControl(0),
      stepName:new FormControl("",Validators.required),
      actions:new FormControl("",Validators.required),
      businessRule:new FormControl("",Validators.required),
      roles:new FormControl(this.roleNames,Validators.required)
    });
  }

  editRow(col: workflowsteps,ri){
    this.displayDialog=true;
    this.edit=true;
    this.rowIndex=ri;
    this.workflowStep= this._formBuilder.group({
      id:new FormControl(col.id),
      stepName:new FormControl(col.stepName,Validators.required),
      actions:new FormControl(col.actions,Validators.required),
      businessRule:new FormControl(col.businessRule,Validators.required),
      roles:new FormControl(col.roles,Validators.required)
    })
  }

  cancelEditRow(){
    this.displayDialog=false;
  }

  saveRow(stepDetails){
    this.displayDialog=false;
    if(this.edit)
    {
      this.workflowStepList[this.rowIndex].id=stepDetails.value.id;
      this.workflowStepList[this.rowIndex].stepName=stepDetails.value.stepName;
      this.workflowStepList[this.rowIndex].actions=stepDetails.value.actions;
      this.workflowStepList[this.rowIndex].businessRule=stepDetails.value.businessRule;
      this.workflowStepList[this.rowIndex].roles=stepDetails.value.roles;
      this.workflowStepList[this.rowIndex].workflowId=stepDetails.value.workflowId;
      this.rowIndex=0;
      this.edit=false;
    }
    else{
      this.workflowStepList.push(stepDetails.value);
    }
  }

  deletetRow(col: workflowsteps,ri){
     
  }


  submit(wfDetails){
    let submitTable:any;
    wfDetails.value.columns = this.workflowStepList;
    if(this.workflowGroup.value.id!==0)
      submitTable = this._workflowService.updateWorkflow(wfDetails.value);
    else  
      submitTable=this._workflowService.saveWorkflow(wfDetails.value);
    
    submitTable.subscribe(res=>{
      this.toastr.success(res);
      this.back();
    }) ; 
  }

  back(){
    this.router.navigate(["/workflowList"]);
  }

}
