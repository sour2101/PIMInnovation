import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import { Attribute } from 'src/app/attributes/models/attribute';
import { entity } from '../models/entity';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private readonly baseUrl = `${environment.api.endPoint}`;

  constructor(private _httpClient:HttpClient) { }

  getShowAtCreation(catalogId):Observable<entity[]>{
    let url=`${this.baseUrl}/showAtCreation?catalogId=`+catalogId;
  
    return this._httpClient.get<entity[]>(url)
    .pipe(map(data => data));
  }

  saveEntityData(model:any):Observable<any>{
    let url=`${this.baseUrl}/entity`;
    return this._httpClient.post(url,model)
    .pipe(map(data=>data));
  }
}
