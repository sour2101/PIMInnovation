import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import { workflow } from '../models/workflow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  private readonly baseUrl = `${environment.api.endPoint}/workflow`; 
  
  constructor(private _httpClient:HttpClient) { }

  getAllWorkflow():Observable<any>{
    return this._httpClient.get(this.baseUrl)
          .pipe(map(data => data));
  }

  getWorkflowList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<any>{
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

  getWorkflow(id:number):Observable<workflow>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<workflow>(url)
    .pipe(map(data => data));
  }

  saveWorkflow(model:workflow):Observable<any>{
    return this._httpClient.post<workflow>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  updateWorkflow(model:workflow):Observable<any>{
    return this._httpClient.put<workflow>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  deleteWorkflow(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(map(data => data));
  }
}
