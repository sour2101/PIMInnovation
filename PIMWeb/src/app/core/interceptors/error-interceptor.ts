import { Injectable } from '@angular/core';
import {
  HttpEvent,  HttpInterceptor,  HttpHandler,  HttpRequest,  HttpResponse,  HttpErrorResponse } from '@angular/common/http';
 import { Observable, throwError } from 'rxjs';
 import { retry, catchError } from 'rxjs/operators';
 import { ToastsManager } from "ng6-toastr";
 import { Router } from '@angular/router';

 @Injectable({
  providedIn: 'root'
})
 export class HttpErrorInterceptor implements HttpInterceptor {
  constructor( private router:Router,public toastr: ToastsManager) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
         
          if(error.status===403){
            this.router.navigate(['/forbidden']);
          }
          else if(error.status==401){
            this.router.navigate(['/accessRightError']);
          }
          else if(error.status==400 && error.error.modelState["invalidUserName"]!== undefined){
            this.toastr.error(error.error.modelState.invalidUserName);
            errorMessage =error.error.modelState["invalidUserName"];
          }
          else if(error.status==400 && error.error.modelState["alreadyExists"]!== undefined){
            this.toastr.warning(error.error.modelState.alreadyExists);
            errorMessage =error.error.modelState["alreadyExists"];
          }
          else if(error.status===500){
            this.router.navigate(['/accessRightError']);
          }
          return throwError(errorMessage);
        })
      );
  }
 }
