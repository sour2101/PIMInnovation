import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SsoComponent } from './components/login/sso.component';
import { AccessRightComponent } from './components/accessRightError/accessRightError.component';
import { ChangePasswordComponent } from './components/changePassword/changePassword.component';
import { PasswordRecoveryComponent } from './components/passwordRecovery/passwordRecovery.component';

const routes: Routes = [

{ path: '', component: LoginComponent },
{ path: 'sso', component:SsoComponent   },
{ path: 'sso/:token', component:SsoComponent   },
{ path: 'passwordRecovery', component:PasswordRecoveryComponent   },
{ path: 'changePassword', component:ChangePasswordComponent   },
{ path: 'accessRightError', component:AccessRightComponent   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
