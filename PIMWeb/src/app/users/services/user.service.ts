import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${environment.api.endPoint}/users`; 
  
  constructor(private _httpClient:HttpClient) { }

  getAllUser():Observable<any>{
    return this._httpClient.get(this.baseUrl)
          .pipe(map(data => data));
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
          .pipe(map(data => data));
  }

  getUser(id:number):Observable<User>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<User>(url)
    .pipe(map(data => data));
  }

  saveUser(model:User):Observable<any>{
    return this._httpClient.post<User>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  updateUser(model:User):Observable<any>{
    return this._httpClient.put<User>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  deleteUsers(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(map(data => data));
  }

}
