import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule,HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { TranslateModule,TranslateLoader } from '@ngx-translate/core'; 
import { ToastModule } from 'ng6-toastr';
import { ContextMenuModule } from 'ngx-contextmenu'; 
import { KnobModule  } from 'angular4-knob';
import { AdminLteModule } from './externalmodule/adminlte.module';
import { PrimengModule } from './externalmodule/primeng.module';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SharedModule } from "./shared/shared.module";

import { CookieService } from 'ngx-cookie-service'; 
import { AppService } from './app.service'; 
import { FileService } from './core/services/file.service';
import { AuthGuard } from './core/guards/auth.guard'; 
import { AuthService } from './core/auth/auth.service'; 

import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { HttpErrorInterceptor } from "./core/interceptors/error-interceptor";
import { ApiInterceptor } from './core/interceptors/api.interceptor'; 
import { LoaderInterceptorService } from './core/interceptors/loader.interceptor';

import { AppComponent } from './app.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule.forRoot(),
    ContextMenuModule.forRoot(),
    KnobModule,
    AdminLteModule,
    PrimengModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports:[RouterModule,PrimengModule],
  providers: [
    {
       provide: APP_BASE_HREF,
       useValue: '/pim/' 
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    // { 
    //   provide: APP_INITIALIZER,
    //   useFactory:  (_resourceService:ResourceService)=>function(){
    //     return _resourceService.loadResource(localStorage.getItem('apiToken')===null ||localStorage.getItem('apiToken')==='' || localStorage.getItem('apiToken')===undefined? '0':localStorage.getItem('apiToken'))
    //   },
    //   deps: [ResourceService],
    //   multi:true
    // },
    AuthGuard,
    AuthService,
    AppService,
    FileService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
