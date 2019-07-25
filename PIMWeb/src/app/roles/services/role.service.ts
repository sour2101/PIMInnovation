import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import { role } from '../models/role';



@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly baseUrl = `${environment.api.endPoint}/roles`; 
  
  constructor(private _httpClient:HttpClient) { }

  getAllRole():Observable<any>{
    return this._httpClient.get(this.baseUrl)
          .pipe(map(data => data));
  }

  getRoleList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<any>{
    let param=new HttpParams().append('pageSize',pageSize)
    .append('pageNumber',pageNumber)
    .append('sortBy',sortBy)
    .append('sortOrder',sortOrder);

    if (filterBy != undefined) {
      Object.keys(filterBy).forEach(function (key, value) {
        if (filterBy[key] != null && filterBy[key] !== "")
        param = param.append(key,filterBy[key]);
      });
  }

    return this._httpClient.get(this.baseUrl,{params:param})
          .pipe(map(data => data));
  }

  getRole(id:number):Observable<role>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<role>(url)
    .pipe(map(data => data));
  }

  saveRole(model:role):Observable<any>{
    return this._httpClient.post<role>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  updateRole(model:role):Observable<any>{
    return this._httpClient.put<role>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  deleteRoles(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(map(data => data));
  }

}
