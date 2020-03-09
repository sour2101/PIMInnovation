import { Component, OnInit } from '@angular/core'; 
import { TranslateService } from '@ngx-translate/core';
import { RoleService } from '../../services/role.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { role } from '../../models/role';
import { DialogService, ConfirmationService } from 'primeng/api';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { MenurightsComponent } from '../menurights/menurights.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  providers:[ConfirmationService]
})
export class RoleListComponent implements OnInit {

  dialogHeader:string;
  roleForm:FormGroup;
  filterForm:FormGroup;
  roleList:role[];
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  totalRecords: any;

  constructor(
    private translate:TranslateService,
    private _confirmationService:ConfirmationService,
    private toastr:ToastsManager,
    private _formBuilder:FormBuilder,
    private _roleService:RoleService,
    private dialogService:DialogService,
    public router:Router
    ){ }

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
    this.loadRoleList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  sorting(event){
    this.sortBy=event.sortField!==undefined?event.sortField:this.sortBy;
    this.sortOrder=event.sortOrder===1?'true':'false'; 
    this.loadRoleList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  filtering(){
    this.loadRoleList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }

  loadRoleList(pageSize,pageNumber,sortBy,sortOrder,filterBy){
    this._roleService.getRoleList(pageSize,pageNumber,sortBy,sortOrder,filterBy)
    .subscribe((res) => { 
      this.totalRecords=res.totalCount;
      this.roleList = res.entries;
     });
  }

  editRole(selectedrole){
    this.router.navigate(["role/"+selectedrole.id]);
  }

  addRole(){
    this.router.navigate(["role"]);
  }

  deleteRole(selectedRole){
    this._confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._roleService.deleteRoles(selectedRole.id)
        .subscribe((res)=>{
          this.toastr.success(res);
          this.loadRoleList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
        });
      },
      reject: () => {
          return false;
      }
  });
  }

  openDialog(roleId): void {
    const ref = this.dialogService.open(MenurightsComponent, {
      data: { roleId: roleId},
      header:this.dialogHeader,
      width:'60%'
      });   
      
      ref.onClose.subscribe(() => {
      
      });
  }

  menuRights(roleId){
    this.translate.get('data.lblMenuRights').subscribe((res)=> 
    {
      this.dialogHeader=res;
    });
    
    this.openDialog(roleId);
  }

}
