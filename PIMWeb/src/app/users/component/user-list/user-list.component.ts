import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserFormComponent } from '../user-form/user-form.component';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng6-toastr'; 
import { DialogService, ConfirmationService } from 'primeng/api';
import { TranslateService } from "@ngx-translate/core";
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers:[DialogService,ConfirmationService]
})
export class UserListComponent implements OnInit {
  loading:boolean=false;
  userForm;
  filterForm;
  userList:[];
  dialogheader:string;
  pageSize:number;
  pageNumber:number;
  sortBy:string;
  sortOrder:string; 
  totalRecords:number;
  constructor(private _pimService:UserService,
    public router:Router,
    public dialogService: DialogService,
    private toastr:ToastsManager,
    private translate:TranslateService,
    private _formBuilder:FormBuilder,
    private _confirmationService:ConfirmationService) {
      this.initialize();
    }

  ngOnInit() {}

  initialize(){
    this.loading=true;
    this.pageSize=10;
    this.pageNumber=1;
    this.sortBy='id';
    this.sortOrder='false'; 
    this.filterForm = this._formBuilder.group({
      firstname:new FormControl(""),
      lastname:new FormControl(""),
      username:new FormControl("")
    });
    this.LoadUserList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  LoadUserList(pageSize,pageNumber,sortBy,sortOrder,filterBy){
    this.loading=true;
    this._pimService.getUserList(pageSize,pageNumber,sortBy,sortOrder,filterBy)
    .subscribe((res) => { 
      this.totalRecords=res.totalCount;
      this.userList = res.entries;
      this.loading=false;
     });
  }

  pageChange(event){
    this.pageSize= event.rows!==undefined?event.rows:this.pageSize ;
    this.pageNumber=event.page!==undefined?event.page+1:this.pageNumber;
    this.LoadUserList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  sorting(event){
    this.sortBy=event.sortField!==undefined?event.sortField:this.sortBy;
    this.sortOrder=event.sortOrder===1?'true':'false'; 
    this.LoadUserList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
  }

  filtering(){
    debugger;
    this.LoadUserList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,this.filterForm.value);
  }
  
  openDialog(userId): void {
    const ref = this.dialogService.open(UserFormComponent, {
      data: { userId: userId},
      header: this.dialogheader,
      width:'80%'
      });   
      
      ref.onClose.subscribe((result) => {
        if(result!==null)
        this.LoadUserList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
      });
  }

  editUser(selectedUser){
    this.translate.get('data.lblEditUser').subscribe((res)=> 
    {
      this.dialogheader = res
    });
    this.openDialog(selectedUser.id);
  }

  addUser(){ 
    this.translate.get('data.lblAddUser').subscribe((res)=> 
    {
      this.dialogheader = res
    });
    this.openDialog(null);
  }

  deleteUser(selectedUser){
    
    this._confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._pimService.deleteUsers(selectedUser.id)
        .subscribe((res)=>{
          this.toastr.success(res);
          this.LoadUserList(this.pageSize,this.pageNumber,this.sortBy,this.sortOrder,null);
        });
      },
      reject: () => {
          return false;
      }
  });
   
  }


}
