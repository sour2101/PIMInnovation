import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import {  Organization } from '../models/orgList';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private readonly baseUrl = `${environment.api.endPoint}`;
 isLoading:boolean=false;
  constructor(private _httpClient:HttpClient) { }

  getOrganizations():Observable<Organization>{
    let url = `${this.baseUrl}/organization`;
    return this._httpClient.get<Organization>(url)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }

  getOrganizationsById(id):Observable<Organization>{
    let url = `${this.baseUrl}/organization?id=`+id;
    return this._httpClient.get<Organization>(url)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }

  saveOrganization(model:Organization){
    let url = `${this.baseUrl}/organization`;
    
    return this._httpClient.post<Organization>(url,model)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }

  updateOrganization(model:Organization){
    let url = `${this.baseUrl}/organization`;
    debugger;
    return this._httpClient.put<Organization>(url,model)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }

  deleteOrganization(id):Observable<any>{
    let url = `${this.baseUrl}/organization?id=`+id;
    
    return this._httpClient.delete(url)
    .pipe(
      finalize(() => {
      this.isLoading = true;
    }));
  }
}
