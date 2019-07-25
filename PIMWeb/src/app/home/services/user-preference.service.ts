import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import { UserPreference } from '../model/user-preference';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {

  private readonly baseUrl = `${environment.api.endPoint}/UserPrefrences`; 

  constructor(private _httpClient:HttpClient) { }

  getUserPreference(id:number):Observable<UserPreference>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<UserPreference>(url)
    .pipe(map(data => data));
  }

  saveUserPreference(model:UserPreference):Observable<any>{
    return this._httpClient.post<UserPreference>(this.baseUrl,model)
    .pipe(map(data => data));
  }

  updateUserPreference(model:UserPreference):Observable<any>{
    return this._httpClient.put<UserPreference>(this.baseUrl,model)
    .pipe(map(data => data));
  }

}
