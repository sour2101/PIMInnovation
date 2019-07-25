import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PrimengModule } from "../externalmodule/primeng.module";

import { LoginComponent } from './components/login/login.component';
import { SsoComponent } from './components/login/sso.component';
import { AccessRightComponent } from './components/accessRightError/accessRightError.component';
import { ChangePasswordComponent } from './components/changePassword/changePassword.component';
import { PasswordRecoveryComponent } from './components/passwordRecovery/passwordRecovery.component';

import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    SsoComponent,
    ChangePasswordComponent,
    PasswordRecoveryComponent,
    AccessRightComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    PrimengModule
  ],
  exports:[
    LoginComponent,
    SsoComponent,
    ChangePasswordComponent,
    PasswordRecoveryComponent,
    AccessRightComponent,
    PasswordRecoveryComponent
  ]
})
export class LoginModule { }
