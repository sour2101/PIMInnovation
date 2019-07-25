import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'; 
import { GlobalVariable } from 'src/app/shared/pimConstant';


@Injectable()
export class AuthService {
  private readonly baseUrl = `${environment.api.endPoint}/authenticate`; 
public redirectUrl:string; 
  constructor (private _httpClient: HttpClient) { }

  public isLoggedIn(): Observable<boolean> {  

    return this._httpClient.post(this.baseUrl,JSON.stringify(this.getToken()))
          .pipe(map(data => {
            if(data!==null){
             GlobalVariable.currentUser = data;
              return true;
            }
          }));
    }
    
    public getToken():string {
      return localStorage.getItem('apiToken');
    }
     

}
