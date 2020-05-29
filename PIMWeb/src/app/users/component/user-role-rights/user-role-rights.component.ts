import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { userRoleRights } from '../../model/userRoleRights';
import { UserRoleRightsService } from '../../services/user-role-rights.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-user-role-rights',
  templateUrl: './user-role-rights.component.html',
  styleUrls: ['./user-role-rights.component.css']
})
export class UserRoleRightsComponent implements OnInit {

  organization;
  roles;
  orgId;
  userId;
  userRoleRights:userRoleRights;
  userRoleRightsForm:FormGroup;
  constructor(
    private _userRoleRightsService:UserRoleRightsService,
    private _formBuilder:FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { 

    this.getOrganaization();
    this.userRoleRights =  new userRoleRights();
    this.userRoleRightsForm=this.getUserRoleRightsForm(this.userRoleRights);
    if (this.config.data.userId !== null && this.config.data.userId !== undefined) {
      this.userId=this.config.data.userId ;
    }
  }

  ngOnInit() {
  }

  getUserRoleRightsForm(data:userRoleRights):FormGroup{
    return this._formBuilder.group({
      userId:new FormControl(data.userId),
      roleId:new FormControl(data.roleId),
      orgId:new FormControl(data.orgId)
    });
  }

  back(result){
    this.ref.close(result);
    return false;
  }

  getOrganaization(){
    this.organization =[{id:1,name:'Abrasive'},{id:2,name:'CP'}];
  }

  getRoles(event){
    this.roles=[{id:1,name:'Admin'},{id:2,name:'Vendor'},{id:3,name:'Marketing'},{id:4,name:'MIS'}];
  }

  submit(rightDetails){

  }

}
