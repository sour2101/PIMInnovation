import { Component,OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../../app.service';
import { ToastsManager } from 'ng6-toastr'; 
import { UserService } from '../../services/user.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  loading:boolean=false;
  userForm:FormGroup;
  userGroup:FormGroup;
  userPrefGroup:FormGroup;
  
  user:User;
  msg:any;
  
  roleList:any;
  languageList:any;
  managerList:any;
  selectedRoleList:any ;
  
    userId:number;
  constructor(
    private route: ActivatedRoute,
    public router:Router,
    public _pimService:AppService,
    public _userService:UserService,
    public toastr: ToastsManager,
    private _formBuilder:FormBuilder
    ){
        this.initialize();
    }

  ngOnInit() {
  }

  initialize(){
      this.loading=true;
      this.route.params.subscribe(params => {
        this.selectedRoleList=[];
        this.getRole();
        this.getManagerList();
        this.getLanguageList();
        this.user = new User();
        this.userForm = this.getUserForm(this.user);
        if(params.id!==null && params.id!==undefined){
          this.userId = params.id;
          this.getUser(this.userId);
        }
      });
    
  }

  getUserForm(data:User):FormGroup{
    return  this._formBuilder.group({ 
      id:new FormControl(data.id),
      username:new FormControl(data.username,Validators.required),
      sso:new FormControl(data.sso),
      email:new FormControl(data.email, [Validators.required, Validators.email]),
      firstName: new FormControl(data.firstname, [Validators.required]),
      lastName : new FormControl(data.lastname, [Validators.required]),
      languageId : new FormControl(data.languageId, [Validators.required]),
      managerId : new FormControl(data.managerId),
      disabled: new FormControl(data.disabled),
      active : new FormControl(data.active),
      password:new FormControl(data.password),
      userRights:new FormControl(data.userRights)
    });
  }

  getRole(){
    this._pimService.get(environment.role_url)
    .subscribe(res=>{
      this.roleList=res;
    });
  }

  getManagerList(){
    this._pimService.get(environment.manager_url)
    .subscribe(res=>{
      this.managerList=res;
    });
  }

  getLanguageList(){
    this._pimService.get(environment.language_url)
    .subscribe(res=>{
      this.languageList=res;
    });
  }

  //to load the user data
  getUser(id){
      this.loading=true;
      let userData = this._userService.getUser(id);
      userData.subscribe(result=>{
          this.userForm=this.getUserForm(result);
          this.loading=false;
           
      }),
      error => this.msg = <any>error;
  }

 


  LdapSearch() {
      
    //   if (this.userForm.value.username !== undefined && this.userForm.value.username !== "") {
    //       this._pimService.post(GlobalVariable.ldap_url,  { sgid: this.userForm.value.username })
    //           .subscribe((userDetails) =>{
    //               this.userForm.patchValue({
    //                   username:userDetails.sgid,
    //                   email:userDetails.mail,
    //                   firstName:userDetails.firstname,
    //                   lastName:userDetails.lastname
    //               });
    //           },
    //           error => {
    //                   if (error.status === 400 && JSON.parse(error._body).modelState["user.ldap"] !== undefined) {
    //                       this.toastr.error(JSON.parse(error._body).modelState["user.ldap"][0]);
    //                   }
    //                   this.user = {};
    //                   this.userForm.value.active = this.userForm.value.active ? "1" : "0";
    //               });
    //   } 
  };


  back(){
     this.router.navigate(["userList"]);
    }

    submit(userDetails){
       let submitUser:any; 
     
      debugger;
      this.selectedRoleList = userDetails.value.userRights;
      userDetails.value.userRights=[];
      this.selectedRoleList.forEach(ur => {      
        userDetails.value.userRights.push({roleId : ur.id});
      });

      userDetails.value.sso = this.userForm.get('sso').value=="0"?false:true;

      
      if(this.userId  ===null || this.userId===undefined){
      submitUser =   this._userService.saveUser(userDetails.value);
      }
      else{
      submitUser =   this._userService.updateUser(userDetails.value);
      }

      submitUser.subscribe((res) =>{
          
                  this.toastr.success(res);
          this.back();
            });
    }
}
