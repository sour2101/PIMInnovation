import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment'; 
import { DynamicColumn } from '../models/DynamicColumn';

@Injectable({
  providedIn: 'root'
})
export class LookupColumnService {
  private readonly baseUrl = `${environment.api.endPoint}/lookupColumn`; 

  constructor(private _httpClient:HttpClient) { }


  saveColumnRecord(model:DynamicColumn[]):Observable<any>{
    return this._httpClient.post<DynamicColumn[]>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  updateColumnRecord(model:DynamicColumn[]):Observable<any>{
    return this._httpClient.put<DynamicColumn[]>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  deleteColumnRecord(tableId,id):Observable<any>{
    let param=new HttpParams().append('tableId',tableId)
    .append('id',id);
    let url = `${this.baseUrl}`;
    return this._httpClient.delete(url,{params:param})
    .pipe(map(data => data));
  }
}
