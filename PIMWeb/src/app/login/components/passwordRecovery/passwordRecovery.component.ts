import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup , FormControl, Validators } from '@angular/forms';

import { ToastsManager } from 'ng6-toastr'; 

import { LoginService } from '../../services/login.service';



@Component({
  selector: 'app-passwordRecovery',
  templateUrl: './passwordRecovery.component.html' 
})

export class PasswordRecoveryComponent {
  recoveryForm;
 

  constructor(private router:Router,private toastr:ToastsManager,private _pimService:LoginService){
    this.recoveryForm = new FormGroup({
      username:new FormControl("",[Validators.required])
    });

  }

  login(){
  this.router.navigate(["login"]);
  }

  submit(userDetails){
    this._pimService.passwordRecovery(userDetails.value.username)
    .subscribe((res)=>{
      this.toastr.success(res);
      this.login();
    },
    error=>{
      if (error.status === 400 && JSON.parse(error._body).modelState["username"] !== undefined) {
        this.toastr.error(JSON.parse(error._body).modelState["username"][0]);
    }
  });
  }
}

