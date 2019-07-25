import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../../shared/services/loader.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  public pendingRequests: any  = 0;
  public showLoading:boolean=false;
  constructor(private loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.pendingRequests++;
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => { 
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    },
      (err: any) => {
        this.onEnd();
    }));
  }
  
  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    if (!this.showLoading) {
      this.showLoading = true;
    if($('.overlay')[0]!==undefined)
      $('.overlay')[0].style.display='block';
    }

    this.showLoading = true;
  }

  private hideLoader(): void {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        if($('.overlay')[0]!==undefined)
          $('.overlay')[0].style.display='none';
      }

      this.showLoading = false;
    }
  }

}