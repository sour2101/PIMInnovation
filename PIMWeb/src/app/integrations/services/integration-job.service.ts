import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment'; 
import { IntegrationJobList } from '../models/IntegrationJobList';

@Injectable({
  providedIn: 'root'
})
export class IntegrationJobService {

  private readonly baseUrl = `${environment.api.endPoint}/integrationJob`; 

  constructor(private _httpClient:HttpClient) { }

  getIntegrationJobList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<IntegrationJobList>{
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

    return this._httpClient.get<IntegrationJobList>(this.baseUrl,{params:param})
          .pipe(map(data => data));
  }

  deleteJob(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(map(data => data));
  }
}
