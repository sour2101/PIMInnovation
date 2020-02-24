import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${environment.api.endPoint}/users`; 
  isLoading=false;
  constructor(private _httpClient:HttpClient) { }

  getAllUser():Observable<any>{
    return this._httpClient.get(this.baseUrl)
          .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  getUserList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<any>{
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

  getUser(id:number):Observable<User>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<User>(url)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  saveUser(model:User):Observable<any>{
    return this._httpClient.post<User>(this.baseUrl,model)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  updateUser(model:User):Observable<any>{
    return this._httpClient.put<User>(this.baseUrl,model)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  deleteUsers(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

}
