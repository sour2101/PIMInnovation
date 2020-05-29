import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';  
import {  OrganizationMapping } from '../models/OrgMapping';

@Injectable({
  providedIn: 'root'
})
export class OrgMappingService {

  isLoading:boolean=false;
  private readonly baseUrl = `${environment.api.endPoint}/organizationMapping`;
  
  constructor(private _httpClient:HttpClient) { }

  getAttributeList(){
    let url = `${environment.api.endPoint}/attributeList`;
    return this._httpClient.get(url)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }

  getOrgMapping(orgId:number,mapping:string):Observable<OrganizationMapping[]>{
    let url = `${this.baseUrl}?id=`+orgId+`&mapping=`+mapping;
    return this._httpClient.get<OrganizationMapping[]>(url)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }

  saveOrgMapping(model:OrganizationMapping[]){
    let url = `${this.baseUrl}`;
    return this._httpClient.post<OrganizationMapping[]>(url,model)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }

  updateOrgMapping(model:OrganizationMapping[]){
    let url = `${this.baseUrl}`;

    return this._httpClient.put<OrganizationMapping[]>(url,model)
    .pipe(
      finalize(() => {
        this.isLoading = true;
      })
    );
  }


}
