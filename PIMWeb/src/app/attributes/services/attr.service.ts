import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Attribute } from "../models/attribute";

@Injectable({
  providedIn: 'root'
})
export class AttrService {

  private readonly baseUrl = `${environment.api.endPoint}/attribute`; 

  constructor(private _httpClient:HttpClient) { }

  getAttributeList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<any>{
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

    return this._httpClient.get(this.baseUrl+"List",{params:param})
          .pipe(map(data => data));
  }

  getAttribute(id:number):Observable<Attribute>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<Attribute>(url)
    .pipe(map(data => data));
  }

  saveAttribute(model:Attribute):Observable<any>{
    debugger;
    return this._httpClient.post<Attribute>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  updateAttribute(model:Attribute):Observable<any>{
    debugger;
    return this._httpClient.put<Attribute>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  deleteAttribute(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(map(data => data));
  }
}
