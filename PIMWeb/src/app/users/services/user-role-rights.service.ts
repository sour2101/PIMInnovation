import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRoleRightsService {

  private readonly baseUrl = `${environment.api.endPoint}/userRole`; 
  isLoading=false;
  constructor(private _httpClient:HttpClient) { }

 
}
