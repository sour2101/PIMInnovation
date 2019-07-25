import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    
    constructor(private _authService:AuthService){}

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: new HttpHeaders({
             'Content-Type': 'application/json',
             'Authorization':'Bearer '+ this._authService.getToken(),
             'Access-Control-Expose-Headers':"*"
            })
        });
        return next.handle(authReq);
    }
}  