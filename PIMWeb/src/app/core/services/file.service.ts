import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,ResponseContentType } from '@angular/http'; 
import * as FileSaver from 'file-saver';

import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from 'src/app/shared/pimConstant';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FileService {
   
    private readonly baseUrl = `${environment.api.endPoint}`;

    constructor(
        private _http: Http,
        private router:Router,public toastr: ToastsManager,
        public _authService:AuthService) { }

    fileupload(apiEndpoint,fileToUpload:File): Observable<any> {
        let  url=`${this.baseUrl}/`+apiEndpoint;
        const  formData:FormData = new FormData(); 
       formData.append("File",fileToUpload,fileToUpload.name);
       
       formData.append("user",GlobalVariable.currentUser.username);
       formData.append("admin",GlobalVariable.currentUser.admin);
        return this._http.post(url, formData)
        .pipe(map(data => data));
    }
        
    fileDownload(apiEndpoint,filterBy){
        let  url=`${this.baseUrl}/`+apiEndpoint;
        var params = {};
        if (filterBy != undefined) {
            Object.keys(filterBy).forEach(function (key, value) {
                if (filterBy[key] != null && filterBy[key] !== "")
                    params[key] = filterBy[key];
            });
        }
        let headers =  new Headers({'Authorization':'bearer '+ this._authService.getToken(),'Access-Control-Expose-Headers':"*" });
        let options = new RequestOptions({
            headers: headers, 
            params:params,
            responseType: ResponseContentType.Blob
          });
        return this._http.get(url, options)
        .map(res=>{
             FileSaver.saveAs(res.blob(),this.getFileNameFromHttpResponse(res));
        })
        .catch(this.handleError)
         
    }

    getFileNameFromHttpResponse(httpResponse) {
        var contentDispositionHeader = httpResponse.headers.get("Content-Disposition");
        var result = contentDispositionHeader.split(";")[1].trim().split("=")[1];
        return result.replace(/"/g, "");
    };


    

    private handleError(error: HttpErrorResponse) {
        return Observable.throw(error);
    }
  

}