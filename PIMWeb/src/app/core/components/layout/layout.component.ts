import { Component,OnInit, ViewContainerRef } from '@angular/core';
 import{ AppService } from '../../../app.service';  
import { ToastsManager } from 'ng6-toastr'; 
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { UserPreferencesComponent } from '../../../home/components/userPrefrence/userPref.component';
import { DialogService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from '../../../shared/pimConstant';
import { MenuRightsService } from 'src/app/roles/services/menu-rights.service';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    providers:[DialogService]
  })
  export class LayoutComponent implements OnInit {
  
    public principal:any;
    public uiLocalList:any;
    public dataLocalList:any;
    public categoryList:any;
    navItems;
      msg:string;
      loc:any;
      dataLocalId:string;
      childComponent:any;
      public  headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      public options = new RequestOptions({ headers: this.headers });
      constructor(
        private _appService: AppService,
        private toastr: ToastsManager,
        vRef: ViewContainerRef,
        private _http:Http,
        public dialogService: DialogService,
        private translate:TranslateService,
        public _menuService:MenuRightsService 
        )
      {
        this.principal =GlobalVariable.currentUser;
        this.toastr.setRootViewContainerRef(vRef);
        this.getUserPref();
       
      }
    
      ngOnInit(){
        
        this._appService.get(environment.language_url)
        .subscribe((res) => { 
            this.dataLocalList = res;
            this.dataLocalId = GlobalVariable.dataLocal;
            this.getMenu();
            
           },
        error => this.msg = <any>error);
    
       
      }

      
  getMenu(){
    this._menuService.getAllMenu(GlobalVariable.currentUser.roleId,this.dataLocalId)
    .subscribe(res=>{
      this.navItems=res;
    });

  }

    
      changeDataLocal(value){
        GlobalVariable.dataLocal = value;
        this.getMenu();
        let lang = value==1?"en": value==2? "fr":"pt";
        this.translate.use(lang);
        this.childComponent.initialize();
      }
    
      changeUserPref(){
        this.openDialog(this.principal.token.userId);
      }
    
      onActivate(componentRef){
        this.childComponent= componentRef;
      }
    
      openDialog(userId): void {
        let header;
    this.translate.get('data.lblEditUserPref').subscribe((res)=> 
    {header = res});
        const ref = this.dialogService.open(UserPreferencesComponent, {
          data: {
            userId:userId
          },
          header:header,
          width: 'auto'
      });
    
      ref.onClose.subscribe((result) => {
        if (result!==null && result!==undefined) {
          location.reload();
        }
    });
      }
    
      logout(){
       this.logoutService()
       .subscribe(()=>{
         localStorage.removeItem('apiToken');
         location.href = environment.loginUrl;
       },
      ()=>{
    
      })
      }
    
      logoutService(){
        return this._http.post(environment.api.endPoint+"/logout",JSON.stringify(GlobalVariable.currentUser.token.userId),this.options)
        .map((res:Response)=>{
         return res;
        })
        .catch((error:any)=> {return Observable.throw(error)})
      }
    
      getUserPref(){  
        this._appService.getById(environment.userPref_url,GlobalVariable.currentUser.token.userId)
        .subscribe((res) => { 
          GlobalVariable.dataLocal =res.dataLocal;
           GlobalVariable.uiLocal=res.uiLocal;
           },
        error => this.msg = <any>error);
      }
    
     
    }