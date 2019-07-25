import { Component,OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../../app.service';
import { ToastsManager } from 'ng6-toastr'; 
import { forkJoin } from "rxjs/observable/forkJoin"; 
import { DynamicDialogRef,DynamicDialogConfig } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { environment } from 'src/environments/environment';
import { UserPreferenceService } from 'src/app/home/services/user-preference.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

    loading:boolean=false;
  userForm:FormGroup;
  userGroup:FormGroup;
  userPrefGroup:FormGroup;
  roles:any;
  user:any;
  msg:any;
  languageList:any;
  roleList:any;
  selectedRoleList:any ;
  managerList:any;
  taxonomyList:any;
    organizationList:any;
    catalogList:any;
    timeZoneList:any;
  constructor(public _pimService:AppService,
    private _userService:UserService,
    private _userPrefService:UserPreferenceService,
    public toastr: ToastsManager,
    private _formBuilder:FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig){
        this.initialize();
    }

  ngOnInit() {
  }

  initialize(){
      this.loading=true;
    this.userForm = this._formBuilder.group(
        {
        userGroup : this._formBuilder.group(
            { 
                username:new FormControl("",Validators.required),
                sso:new FormControl("0"),
                password:new FormControl("",[Validators.minLength(8),Validators.maxLength(20),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{8,20}$")]),
                email:new FormControl("", [Validators.required, Validators.email]),
                firstName: new FormControl("", [Validators.required]),
                lastName : new FormControl("", [Validators.required]),
                languageId : new FormControl("", [Validators.required]),
                managerId : new FormControl(""),
                disabled: new FormControl(false),
                userRights:new FormControl({})
            }),
        userPrefGroup:this._formBuilder.group(
            {
                organizationId:new FormControl("",Validators.required),
                catalogId:new FormControl(""),
                dataLocal:new FormControl("",Validators.required),
                timeZone:new FormControl("",Validators.required),
                taxonomy:new FormControl(""),
                roleId:new FormControl("")
            })    
        });
    
    let l = this._pimService.get(environment.language_url);
    let r =  this._pimService.get(environment.role_url);
    let m =  this._pimService.get(environment.manager_url);
    let t =  this._pimService.get(environment.Taxonomy_url);
    let o =  this._pimService.get(environment.Org_url);
    let c = this._pimService.get(environment.Catalog_url);
    let tz = this._pimService.get(environment.TimeZone_url);
    this.selectedRoleList=[];
    forkJoin([l, r,m,t,o,tz,c]).subscribe(results=>{
        
        this.languageList = results[0];
        this.roleList = results[1];
        this.roles=results[1];
        this.managerList = results[2];
        this.taxonomyList=results[3];
        this.organizationList = results[4];
        this.timeZoneList=results[5];
        this.catalogList = results[6];
       this.loading=false;
        if(this.config.data.userId!==null && this.config.data.userId!==undefined){
            this.getUser(this.config.data.userId);  
        }
    });
  }

  //to load the user data
  getUser(id){
      this.loading=true;
      let userData = this._userService.getUser(id);
      let userPrefData=this._userPrefService.getUserPreference(id);
      forkJoin([userData,userPrefData]).subscribe(result=>{
          this.user = result[0];
          let  userPref=result[1];
          this.userForm=this._formBuilder.group(
              {
                  userGroup : this._formBuilder.group(
                      {
                        id:new FormControl(this.user.id),
                        sso:new FormControl(this.user.sso),
                        active:new FormControl(this.user.active),
                        password:new FormControl(this.user.password),
                        username:new FormControl(this.user.username,Validators.required),
                        email:new FormControl(this.user.email, [Validators.required, Validators.email]),
                        firstName: new FormControl(this.user.firstname, [Validators.required]),
                        lastName : new FormControl(this.user.lastname, [Validators.required]),
                        languageId : new FormControl(this.user.languageId, [Validators.required]),
                        managerId:new FormControl(this.user.managerId),
                        disabled: new FormControl(this.user.disabled),
                        userRights:new FormControl(this.user.userRights)
                        }),
                  userPrefGroup:this._formBuilder.group(
                      {
                        userId:new FormControl(userPref.userId),
                        organizationId:new FormControl(userPref.organizationId,Validators.required),
                        catalogId:new FormControl(userPref.catalogId),
                        dataLocal:new FormControl(userPref.dataLocal,Validators.required),
                        timeZone:new FormControl(userPref.timeZone,Validators.required),
                        taxonomy:new FormControl(userPref.taxonomy),
                        roleId:new FormControl(userPref.roleId,Validators.required),
                        createdBy:new FormControl(userPref.createdBy),
                        createdDate:new FormControl(userPref.createdDate)
                  })    
          });
          
         
          this.user.userRights.forEach(ur => {
              let index = this.roles.filter(item=> item.id === ur.roleId)[0];
              this.roles.filter(it=>{               
                  if(it.id === ur.roleId){
                      this.selectedRoleList.push({id:it.id,name:it.name});
                      this.roles.splice(this.roles.indexOf(index),1);
                  }
              },true)           
          });

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


  back(result){
      this.ref.close(result);
      return false;
    }

    submit(userDetails){
       let submitUser:any;
       let submitUserPref:any;
      let user =userDetails.get('userGroup');
      let userPref =userDetails.get('userPrefGroup');
      debugger;
      user.value.userRights=[];
      this.selectedRoleList.forEach(ur => {          
        user.value.userRights.push({roleId : ur.id});
      });

      user.value.sso = this.userForm.get('userGroup.sso').value=="0"?false:true;


      if(this.config.data.userId  ===null || this.config.data.userId === undefined){
      submitUser =   this._userService.saveUser(user.value);
      }
      else{
      submitUser =   this._userService.updateUser(user.value);
      }

      submitUser.subscribe((res) =>{
          debugger;
        if(this.config.data.userId  ===null || this.config.data.userId === undefined){
            userPref.value.userId = res;
            submitUserPref = this._userPrefService.saveUserPreference(userPref.value);
            }
            else{
            submitUserPref=this._userPrefService.updateUserPreference(userPref.value);
            }

            submitUserPref.subscribe((up) =>{
          this.toastr.success(up);
          this.back(res);
            });
        });
    }
}
