import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { PrimengModule } from "../externalmodule/primeng.module";
import { TranslateModule } from "@ngx-translate/core";

import { HomeRoutingModule } from './home-routing.module'; 
import { EntityComponent } from "./components/entity/entity.component";
import { UserPreferencesComponent } from "./components/userPrefrence/userPref.component";
@NgModule({
  declarations: [EntityComponent,UserPreferencesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule
  ],
  exports:[EntityComponent] 
})
export class HomeModule { }
