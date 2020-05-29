import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import { Attribute } from 'src/app/attributes/models/attribute';
import { DisplayAttribute } from '../models/displayAttribute';
import { Entity } from '../models/entity'; 

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  isLoading:boolean=false;
  private readonly baseUrl = `${environment.api.endPoint}`;

  constructor(private _httpClient:HttpClient) { }

  getShowAtCreation(catalogId):Observable<DisplayAttribute[]>{
    let url=`${this.baseUrl}/showAtCreation?catalogId=`+catalogId;
  
    return this._httpClient.get<DisplayAttribute[]>(url)
    .pipe(finalize(() => {
      this.isLoading = true;
    }));
  }

  getEntityList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<any[]>{

    let url=`${this.baseUrl}/entity`;
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

    return this._httpClient.get<any[]>(url,{params:param})
    .pipe(finalize(() => {
      this.isLoading = true;
    }))
  }

  saveEntityData(model:Entity[]):Observable<any>{
    let url=`${this.baseUrl}/entity`;
    return this._httpClient.post(url,model)
    .pipe(finalize(() => {
      this.isLoading = true;
    }));
  }
}
