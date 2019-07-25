import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment'; 
import { ImportProfile } from "../models/ImportProfile";
import { ProfileList } from '../models/ProfileList';

@Injectable({
  providedIn: 'root'
})
export class ImportProfileService {

  private readonly baseUrl = `${environment.api.endPoint}/importProfile`; 

  constructor(private _httpClient:HttpClient) { }

  getImportProfiles():Observable<ProfileList>{
    return this._httpClient.get<ProfileList>(this.baseUrl)
    .pipe(map(data => data));
  }

  getImportProfileList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<ProfileList>{
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

    return this._httpClient.get<ProfileList>(this.baseUrl,{params:param})
          .pipe(map(data => data));
  }
 

  saveImportProfile(model:ImportProfile):Observable<any>{
    return this._httpClient.post<ImportProfile>(this.baseUrl,model)
    .pipe(map(data => data));
  }

}
