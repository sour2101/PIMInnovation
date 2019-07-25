import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import { JobDetailsList } from '../models/jobDetailsList';

@Injectable({
  providedIn: 'root'
})
export class JobDetailsService {

  private readonly baseUrl = `${environment.api.endPoint}/jobDetails`; 

  constructor(private _httpClient:HttpClient) { }

  getJobDetailsList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<JobDetailsList>{
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

    return this._httpClient.get<JobDetailsList>(this.baseUrl,{params:param})
          .pipe(map(data => data));
  }
}
