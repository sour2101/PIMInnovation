import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import { role } from '../models/role';



@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly baseUrl = `${environment.api.endPoint}/roles`; 
  isLoading:boolean=false;
  constructor(private _httpClient:HttpClient) { }

  getAllRole():Observable<any>{
    return this._httpClient.get(this.baseUrl)
          .pipe(
            finalize(() => {
              this.isLoading = true;
            })
          );
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
          .pipe(
            finalize(() => {
              this.isLoading = true;
            })
          );
  }

  getRole(id:number):Observable<role>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<role>(url)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }

  saveRole(model:role):Observable<any>{
    return this._httpClient.post<role>(this.baseUrl,model)
    .pipe(
      finalize(() => {
      this.isLoading = true;
    }));
  }

  updateRole(model:role):Observable<any>{
    return this._httpClient.put<role>(this.baseUrl,model)
    .pipe(
      finalize(() => {
      this.isLoading = true;
    }));
  }

  deleteRoles(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }

}
