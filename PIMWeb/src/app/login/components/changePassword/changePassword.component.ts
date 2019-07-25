
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup , FormControl, Validators } from '@angular/forms';

import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from 'ng6-toastr'; 

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html'
})

export class ChangePasswordComponent {
    changePasswordForm;


constructor(private router:Router,private toastr:ToastsManager,private _pimService:LoginService,private activatedRoute: ActivatedRoute,private translate:TranslateService){
  this.changePasswordForm = new FormGroup({
    newpassword:new FormControl("",[Validators.minLength(8),Validators.maxLength(20),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{8,20}$")])
  });
}

login(){
 this.router.navigate(["login"]);
}

submit(userDetails){
    this.activatedRoute.queryParams.subscribe(p => {
      let params =  { changePasswordToken: p['token'], newPassword: userDetails.value.newpassword };
      this._pimService.changePassword(params)
          .subscribe((res)=>{
            this.toastr.success(res);
            this.login();
          }),
          err=>{
            this.toastr.warning(err.message);
        };
    });
  }
}