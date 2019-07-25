import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { ToastsManager } from 'ng6-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html'
})
export class RoleFormComponent implements OnInit {

  users:any;
  selectedUserList:any=[];
  roleForm:FormGroup;
  roles:any;
  constructor(
    private _roleService:RoleService,
    private _userService:UserService,
    private toastr: ToastsManager,
    private _formBuilder:FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize(){
    this.loadUsers();
    this.roleForm = this._formBuilder.group({
      id:new FormControl(0),
      name:new FormControl("",Validators.required),
      userRights:new FormControl(this.selectedUserList)
    });

    if(this.config.data.roleId!==null && this.config.data.roleId!==undefined){
      this.getRole(this.config.data.roleId);  
    }
  }

  loadUsers(){
    this._userService.getAllUser()
    .subscribe(res=>{
      this.users=res;
    });
  }

  getRole(id){
    this._roleService.getRole(id)
    .subscribe(res=>{
      this.roles=res;
      this.roleForm=this._formBuilder.group({
        id:new FormControl(res.id,Validators.required),
        name:new FormControl(res.name,Validators.required),
        userRights:new FormControl(res.userRights),
        createdBy:new FormControl(res.createdBy),
        createdDate:new FormControl(res.createdDate)
      });

      this.roles.userRights.forEach(ur => {
        let index = this.users.filter(item=> item.id === ur.userId)[0];
        this.users.filter(it=>{               
            if(it.id === ur.userId){
                this.selectedUserList.push({id:it.id,username:it.username});
                this.users.splice(this.roles.indexOf(index),1);
            }
        },true)           
      });
    });
  }

  back(){
    this.ref.close();
    return false;
  }

  submit(roleDetails){
    let submitRole;
    if(roleDetails.id===0)
    submitRole=this._roleService.saveRole(roleDetails);
    else
      submitRole=this._roleService.updateRole(roleDetails);
    
    submitRole.subscribe(res=>{
      this.toastr.success(res);
      this.back();
    });  
  }

}
