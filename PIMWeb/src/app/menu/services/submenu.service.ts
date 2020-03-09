import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'; 
import { MenuModel } from '../Model/menu';

@Injectable({
  providedIn: 'root'
})
export class SubMenuService {

  private readonly baseUrl = `${environment.api.endPoint}/submenu`; 
  isLoading=false;
  constructor(private _httpClient:HttpClient) { }

  getAllMenu():Observable<MenuModel[]>{
    return this._httpClient.get<MenuModel[]>(this.baseUrl)
          .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  getSubMenuList(pageSize,pageNumber,sortBy,sortOrder,filterBy):Observable<any>{
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
          .pipe(
            finalize(() => {
              this.isLoading = true;
            })
          );
  }

  getSubMenu(id:number):Observable<MenuModel>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.get<MenuModel>(url)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  saveSubMenu(model:MenuModel):Observable<any>{
    return this._httpClient.post<MenuModel>(this.baseUrl,model)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  updateSubMenu(model:MenuModel):Observable<any>{
    return this._httpClient.put<MenuModel>(this.baseUrl,model)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

  deleteSubMenus(id):Observable<any>{
    let url = `${this.baseUrl}?id=`+id;
    return this._httpClient.delete(url)
    .pipe(finalize(() => {
              this.isLoading = true;
            }));
  }

}
