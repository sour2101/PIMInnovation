import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
import { TranslateService } from "@ngx-translate/core";
import { DynamicDialogRef } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/api';
import { ToastsManager } from 'ng6-toastr'; 
import { OrganizationService } from 'src/app/organization/services/organization.service';
import { environment } from 'src/environments/environment';
 

@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html'
  })

  export class EntityComponent  {
    public orgform;
    loc:any;
    orgId:any;
    catId:any;
    user:any;
    msg:any;
    organizationList:any;
    catalogList:any;
    
    constructor(public _appService:AppService,
      private  _orgservice:OrganizationService ,public toastr: ToastsManager,   public ref: DynamicDialogRef, public config: DynamicDialogConfig){
        
       
        this.getOrg();
        if(config.data.orgId!==null && config.data.orgId!==undefined)
        this.orgId=config.data.orgId;

        if(config.data.catId!==null && config.data.catId!==undefined)
        this.catId=config.data.catId;

        this.orgform = new FormGroup({
            organizationId:new FormControl(this.orgId,Validators.required),
            catalogId:new FormControl(this.catId,Validators.required)
            });
    }

    back():void{
        this.ref.close(null);       
      }

    getOrg(){
        this._orgservice.getOrganizations()
        .subscribe((res) => { 
          this.organizationList = res;
          this.getCatalog(res[0].id);
           },
        error => this.msg = <any>error);
      }
    
      getCatalog(orgId){
        this._appService.getById(environment.Catalog_url,orgId)
        .subscribe((res) => { 
         this.catalogList = res;
           },
        error => this.msg = <any>error);
      }
    
      submit(orgDetails){
        this.ref.close(orgDetails.value);
      }


  }