import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { attributeBRs } from '../models/attributeBRs';

@Injectable({
  providedIn: 'root'
})
export class AttrBRServiceService {

  private readonly baseUrl = `${environment.api.endPoint}/attributeBr`;

  constructor(private _httpClient: HttpClient) { }

  getAttributeBRList(atributeId:number): Observable<attributeBRs[]> {
    let url = `${this.baseUrl}?atributeId=` + atributeId;
    return this._httpClient.get<attributeBRs[]>(url)
      .pipe(map(data => data));
  }

  getAttributeBR(id: number): Observable<attributeBRs> {
    let url = `${this.baseUrl}?id=` + id;
    return this._httpClient.get<attributeBRs>(url)
      .pipe(map(data => data));
  }

  saveAttributeBR(model: attributeBRs): Observable<any> {
    return this._httpClient.post<attributeBRs>(this.baseUrl, model)
      .pipe(map(data => data));
  }

  updateAttributeBR(model: attributeBRs): Observable<any> {
    return this._httpClient.put<attributeBRs>(this.baseUrl, model)
      .pipe(map(data => data));
  }

  deleteAttributeBr(id:number): Observable<any>{
    let url = `${this.baseUrl}?id=` + id;
return this._httpClient.delete(url)
.pipe(map(data => data));
  }
}
