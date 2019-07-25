import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Attributegroup } from "../models/attributeGroup";

@Injectable({
  providedIn: 'root'
})
export class AttrgroupService {

  private readonly baseUrl = `${environment.api.endPoint}/attributeGroup`;

  constructor(private _httpClient:HttpClient) { }

  getAttributeGroupList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<any>{
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

  getAttributeGroup(id:number):Observable<Attributegroup>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<Attributegroup>(url)
    .pipe(map(data => data));
  }

  saveAttributeGroup(model:Attributegroup):Observable<any>{
    return this._httpClient.post<Attributegroup>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  updateAttributeGroup(model:Attributegroup):Observable<any>{
    return this._httpClient.put<Attributegroup>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  deleteAttributeGroup(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(map(data => data));
  }
}
