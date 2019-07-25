import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { AuthService } from './core/auth/auth.service';
import { environment } from 'src/environments/environment';



@Injectable()
export class AppService {

    private readonly baseUrl = `${environment.api.endPoint}`;
  
  constructor(private _httpClient: HttpClient,public _authService:AuthService) { }
   
  getList(apiEndpoint, pageSize:any=null,pageNumber:any=null,sortBy:any=null,sortOrder:any='false',filterBy:any[]=null):Observable<any>{
      let url=`${this.baseUrl}`+apiEndpoint;
    let param=new HttpParams().set('pageSize',pageSize)
    .set('pageNumber',pageNumber)
    .set('sortBy',sortBy)
    .set('sortOrder',sortOrder);

    if (filterBy != undefined) {
      Object.keys(filterBy).forEach(function (key, value) {
        if (filterBy[key] != null && filterBy[key] !== "")
          param[key] = filterBy[key];
      });
  }

    return this._httpClient.get(url,{params:param})
          .pipe(map(data => data));
  }

  getById(apiEndpoint,id): Observable<any>{
     
    let url=`${this.baseUrl}/`+apiEndpoint+`?id=`+id;
    return this._httpClient.get<any>(url)
    .pipe(map(data => data));
  }

  get(apiEndpoint){
    let url=`${this.baseUrl}/`+apiEndpoint;
    return this._httpClient.get<any>(url)
    .pipe(map(data => data));
  }
 

}
