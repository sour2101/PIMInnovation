import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Category } from '../model/category';

const httpOptions = {
  headers : new HttpHeaders({
     'Content-Type': 'application/json; charset=utf-8'
    })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly baseUrl = `${environment.api.endPoint}`; 

  constructor(private _httpClient:HttpClient,private _authService:AuthService) {
    //httpOptions.headers.set('Authorization','bearer '+ this._authService.getToken());
   }

   getCategory(id):Observable<any>{
    let url = `${this.baseUrl}/categories?id=`+id;
    return this._httpClient.get(url,httpOptions)
          .pipe(map(data => data));
  }
}
