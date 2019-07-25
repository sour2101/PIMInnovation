import { Component, OnInit } from '@angular/core';  
import {Router, ActivatedRoute, Params} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sso',
  template: '<div></div>'
})
export class SsoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private router:Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params.token===null || params.token ===undefined && params.token!==''){
        this.SsoLogin();
      }
      else{
        localStorage.setItem('apiToken', params.token);
      this.router.navigate(['/dashboard/home']);
        
      }
    }); 
    
  }

  SsoLogin(): void {  
    window.location.href = environment.CasLoginUrl+"?service=" +environment.api.endPoint+"/sso";
  }
}

 
