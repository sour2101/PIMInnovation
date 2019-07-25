import { Component,} from '@angular/core';
import {  FormGroup , FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../app.service'; 
import { ToastsManager } from 'ng6-toastr'; 
import { forkJoin } from "rxjs/observable/forkJoin"; 
import { DynamicDialogRef } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/api';
import { UserPreferenceService } from '../../services/user-preference.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-userPref',
    templateUrl: './userPref.component.html'
  })

  export class UserPreferencesComponent  {
    public prefform;
    
    userId:any;
    catId:any;
    user:any;
    msg:any;
    roleList:any;
    dataLocalList:any;
    // uiLocalList:any;
    taxonomyList:any;
    organizationList:any;
    catalogList:any;
    timeZoneList:any;
    constructor(public _pimService:AppService,
      private _userPrefService:UserPreferenceService,public toastr: ToastsManager,   public ref: DynamicDialogRef, public config: DynamicDialogConfig){
        
       
       
        if(config.data.userId.userId!==null && config.data.userId.userId!==undefined)
            this.userId=config.data.userId.userId;

        this.prefform = new FormGroup({
            organizationId:new FormControl("",Validators.required),
            catalogId:new FormControl(""),
            dataLocal:new FormControl("",Validators.required),
            timeZone:new FormControl(""),
            taxonomy:new FormControl(""),
            roleId:new FormControl("",Validators.required)
            });

            let l = this._pimService.get(environment.language_url);
            let r =  this._pimService.get(environment.role_url);
            let t =  this._pimService.get(environment.Taxonomy_url);
            let o =  this._pimService.get(environment.Org_url);
            let c = this._pimService.get(environment.Catalog_url);
            let tz = this._pimService.get(environment.TimeZone_url);
           
            forkJoin([l, r,t,o,tz,c]).subscribe(results=>{
                
                this.dataLocalList = results[0];
                this.roleList = results[1];
                // this.uiLocalList = results[0];
                this.taxonomyList=results[2];
               this.organizationList = results[3];
               this.timeZoneList=results[4];
                this.catalogList = results[5];

                if(config.data.userId!==null && config.data.userId!==undefined)
                    this.LoadUserPreference(config.data.userId);   
            })      
    }

  

    back(): void{
      this.ref.close(null);
      }

      LoadUserPreference(userId){
         
        this._userPrefService.getUserPreference(userId)
        .subscribe((res) => { 
            this.prefform = new FormGroup({
                userId:new FormControl(res.userId),
                organizationId:new FormControl(res.organizationId,Validators.required),
                catalogId:new FormControl(res.catalogId),
                dataLocal:new FormControl(res.dataLocal,Validators.required),
                timeZone:new FormControl(res.timeZone),
                taxonomy:new FormControl(res.taxonomy),
                roleId:new FormControl(res.roleId,Validators.required)
                });
        }),
        error => this.msg = <any>error;
      }
    
      submit(userPrefDetails){
        this._userPrefService.updateUserPreference(userPrefDetails.value)
        .subscribe((res) =>{
            this.toastr.success(res);
                  this.ref.close(this.prefform.value);
                },
                () => {
                        // if (error.status === 400 && JSON.parse(error._body).modelState["user.login"] !== undefined) {
                        //     this.toastr.warning(JSON.parse(error._body).modelState["user.login"][0]);
                        // }
                    });
      }


  }