import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment'; 
import { MenuModel } from 'src/app/menu/Model/menu';
import { menuRights } from '../models/menuRights';

@Injectable({
  providedIn: 'root'
})
export class MenuRightsService {
  isLoading:boolean=false;
  private readonly baseUrl = `${environment.api.endPoint}/menuRights`; 
  
  constructor(private _httpClient:HttpClient) { }
  
  getAllMenu(roleId:number,localeId):Observable<MenuModel[]>{

    let url = `${this.baseUrl}?localeId=`+localeId+`&id=`+roleId;
    return this._httpClient.get<MenuModel[]>(url)
          .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  
  saveMenuRight(model:menuRights[]):Observable<any>{
    return this._httpClient.post<menuRights[]>(this.baseUrl,model)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  updateMenuRight(model:menuRights):Observable<any>{
    return this._httpClient.put<menuRights>(this.baseUrl,model)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  deleteMenuRight(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

}
