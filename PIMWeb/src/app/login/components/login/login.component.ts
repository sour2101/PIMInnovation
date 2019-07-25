import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  FormGroup , FormControl, Validators } from '@angular/forms'; 
import { ToastsManager } from 'ng6-toastr'; 
import { TranslateService } from "@ngx-translate/core";
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
loginForm;
loc:any;
msg:any;
  constructor(private _loginService:LoginService,
     private router:Router,
    private toastr:ToastsManager,private translate:TranslateService) {
    this.loginForm = new FormGroup({
      username:new FormControl("",[Validators.required]),
      password:new FormControl("", [Validators.required])
    });
    localStorage.removeItem('apiToken');
     
  }

  changeState(url){
    this.router.navigate([url]);
  }

 

  submit(loginDetails){
    
   this._loginService.getLogin(loginDetails.value)
   .subscribe((res)=>{
    this.toastr.success("User Logged in successfully");
    localStorage.setItem('apiToken', res.token.value);
      this.router.navigate(['/home']); 
   },
   error => {
      if (error.status === 401) { // Check if error is 401
        this.translate.get('data.alertInvalidUserName').subscribe((res)=>
          this.toastr.error(res));
        }
      });
     
}


  
} 

 
