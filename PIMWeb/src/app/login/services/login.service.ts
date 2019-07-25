import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { login } from "../model/login"; 
import { changePassword } from "../model/changePassword"; 
import { AuthService } from 'src/app/core/auth/auth.service';


const httpOptions = {
  headers : new HttpHeaders({
     'Content-Type': 'application/json; charset=utf-8'
    })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly baseUrl = `${environment.api.endPoint}`; 

  constructor(private _httpClient:HttpClient,private _authService:AuthService) { 
    httpOptions.headers.set('Authorization','bearer '+ this._authService.getToken() );
  }

  getLogin(model:login):Observable<any>{

    let url = `${this.baseUrl}/login`;
    let body = JSON.stringify(model);

   

    return this._httpClient.post(url,body,httpOptions)
          .pipe(map(data => data));
  }

  changePassword(model:changePassword):Observable<any>{
    let url = `${this.baseUrl}/changePassword`;
    let body = JSON.stringify(model);

    return this._httpClient.post(url,body,httpOptions)
          .pipe(map(data => data));
  }

  passwordRecovery(model:any):Observable<any>{
    let url = `${this.baseUrl}/passwordRecovery`;
    let body = JSON.stringify(model);
    
    return this._httpClient.post(url,body,httpOptions)
    .pipe(map(data => data));
  }
  
}
