import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RoleService } from '../../services/role.service';
import { ToastsManager } from 'ng6-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/users/services/user.service';
import { role } from '../../models/role';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html'
})
export class RoleFormComponent implements OnInit {

  users:any;
  selectedUserList:any=[];
  role:role;
  roleForm:FormGroup;
  roles:any;
  roleId:number;
  constructor(
    private _roleService:RoleService,
    private _userService:UserService,
    private toastr: ToastsManager,
    private _formBuilder:FormBuilder,
    public router:Router,
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize(){
    this.loadUsers();
    this.role =new role();
    this.roleForm = this.getRoleForm(this.role);
    this.route.params.subscribe(params => {
      if(params.id!==null && params.id!==undefined){
      this.roleId = params.id;
      this.getRole(this.roleId);  
      }
    });
  }


  getRoleForm(data:role):FormGroup{
    return this._formBuilder.group({
      id:new FormControl(data.id,Validators.required),
      name:new FormControl(data.name,Validators.required),
      userRights:new FormControl(data.userRights),
      createdBy:new FormControl(data.createdBy),
      createdDate:new FormControl(data.createdDate)
    });


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
    this.router.navigate(["roleList"]);
  }

  submit(roleDetails){
    let submitRole;
    debugger;
    if(roleDetails.value.id===0)
    submitRole=this._roleService.saveRole(roleDetails.value);
    else
      submitRole=this._roleService.updateRole(roleDetails.value);
    
    submitRole.subscribe(res=>{
      this.toastr.success(res);
      this.back();
    });  
  }

}
