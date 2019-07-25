import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
declare var $: any;


@Injectable()
export class LoadingService extends Http {
  public pendingRequests: any  = 0;
  public showLoading: boolean = false;
 
  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }
 
 request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
      return this.intercept(super.request(url, options));
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    // console.log("In the intercept routine..");
    this.pendingRequests++;
    this.turnOnModal();
    return observable
      // .catch((err, source) => {
      //   console.log("Caught error: " + err);
      // })
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        // console.log("Caught error: " + err);
      })
      .finally(() => {
        // var timer = Observable.timer(3000);
        // timer.subscribe(t => {
        //   this.turnOffModal();
        // });
        this.turnOffModal();
      });
    }

    public turnOnModal() {
      if (!this.showLoading) {
          this.showLoading = true;
          if($('.overlay')[0]!==undefined)
          $('.overlay')[0].style.display='block';

      }
      this.showLoading = true;
    }
     
    public turnOffModal() {
      this.pendingRequests--;
      if (this.pendingRequests <= 0) {
        if (this.showLoading) {
          if($('.overlay')[0]!==undefined)
          $('.overlay')[0].style.display='none';
        }
        this.showLoading = false;
      }
      // console.log("Turned off modal");
    }
}


