import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router,CanActivateChild  } from '@angular/router';
import { Http } from "@angular/http";
import { AuthService } from '../auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild  { 

  public isLoggedin: boolean =false;

  public redirectUrl:string;
     
  constructor (private router:Router,
    private _http:Http,
    private authService:AuthService) {}
    
   public canActivate(router:ActivatedRouteSnapshot,state:RouterStateSnapshot){
      this.redirectUrl =state.url;
      return this.checkLogin(this.redirectUrl);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }


  checkLogin(url:string):boolean{
    // return true;
    if(this.isLoggedin){
      return true;
    }
    else{
      this.authService.isLoggedIn().subscribe(
          res=>{        
            
              this.isLoggedin = true;
              this.router.navigateByUrl(url);
          },
          err=>{
          
              this.isLoggedin=false;
              this.authService.redirectUrl = url;
              this.router.navigateByUrl('/login');
          }
      )
    }
  }
}
