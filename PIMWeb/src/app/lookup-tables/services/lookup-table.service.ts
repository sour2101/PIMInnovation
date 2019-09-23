import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment'; 
import { LookUpTable } from '../models/LookupTable';
import { ColumnDetails } from '../models/columnDetails';

@Injectable({
  providedIn: 'root'
})
export class LookupTableService {

  private readonly baseUrl = `${environment.api.endPoint}/lookuptable`; 
  
  constructor(private _httpClient:HttpClient) { }

  getLookUpTableList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<any>{
    let param=new HttpParams().append('pageSize',pageSize)
    .append('pageNumber',pageNumber)
    .append('sortBy',sortBy)
    .append('sortOrder',sortOrder);

    if (filterBy != undefined) {
      Object.keys(filterBy).forEach(function (key, value) {
        if (filterBy[key] != null && filterBy[key] !== "")
        {
          if(Array.isArray(filterBy[key]))
            param = param.append(key,filterBy[key]);
          else
            param = param.append(key,filterBy[key]);
        }
      });
  }

    return this._httpClient.get(this.baseUrl,{params:param})
          .pipe(map(data => data));
  }

  getLookUpTable(id:number):Observable<LookUpTable>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<LookUpTable>(url)
    .pipe(map(data => data));
  }

  getLookupColumnData(model:ColumnDetails[]):Observable<any>{
    let url = `${this.baseUrl}?columnDetails=`+model;
    return this._httpClient.get(url)
    .pipe(map(data => data));
  }

  saveLookUpTable(model:LookUpTable):Observable<any>{
    return this._httpClient.post<LookUpTable>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  updateLookUpTable(model:LookUpTable):Observable<any>{
    return this._httpClient.put<LookUpTable>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  deleteLookUpTables(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(map(data => data));
  }
}
