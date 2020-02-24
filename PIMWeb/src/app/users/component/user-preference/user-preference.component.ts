import { Component,OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../../app.service';
import { ToastsManager } from 'ng6-toastr'; 
import { forkJoin } from "rxjs/observable/forkJoin"; 
import { environment } from 'src/environments/environment';
import { UserPreferenceService } from 'src/app/home/services/user-preference.service';
import { ActivatedRoute } from '@angular/router';
import { userpreference } from '../../model/userpreference';

@Component({
  selector: 'app-user-preference',
  templateUrl: './user-preference.component.html',
  styleUrls: ['./user-preference.component.css']
})
export class UserPreferenceComponent implements OnInit {

  userPreferenceForm:FormGroup;
  languageList:any;
  managerList:any;
  taxonomyList:any;
    organizationList:any;
    catalogList:any;
    timeZoneList:any;
    roleList:any;
    userId:number;
    
  constructor(
    private route: ActivatedRoute,
    public _pimService:AppService,
    private _userPrefService:UserPreferenceService,
    public toastr: ToastsManager,
    private _formBuilder:FormBuilder
  ) { 
    this.initialize();
  }

  ngOnInit() {
  }

  initialize(){
    this.route.params.subscribe(params => {
      debugger;
      let l = this._pimService.get(environment.language_url);
        let r =  this._pimService.get(environment.role_url);       
        let t =  this._pimService.get(environment.Taxonomy_url);
        let o =  this._pimService.get(environment.Org_url);
        let c = this._pimService.get(environment.Catalog_url);
        let tz = this._pimService.get(environment.TimeZone_url);
         forkJoin([l, r,t,o,tz,c]).subscribe(results=>{
            this.languageList = results[0];
            this.roleList = results[1];
            this.taxonomyList=results[2];
            this.organizationList = results[3];
            this.timeZoneList=results[4];
            this.catalogList = results[5];
        });

      if(params.id!==null && params.id!==undefined)
      {
      }
    });
  }

  getForm(data:userpreference):FormGroup{
    return this._formBuilder.group(
          {
              organizationId:new FormControl(data.organizationId,Validators.required),
              catalogId:new FormControl(data.catalogId),
              dataLocal:new FormControl(data.dataLocal,Validators.required),
              timeZone:new FormControl(data.timeZone,Validators.required),
              taxonomy:new FormControl(data.taxonomy),
              roleId:new FormControl(data.roleId)
          })  
  }

  getUserPreference(){
    this._userPrefService.getUserPreference(this.userId)
    .subscribe(res=>{
      this.getForm(res);
    })
  }

}
