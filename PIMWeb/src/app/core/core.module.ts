import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { TranslateModule } from "@ngx-translate/core";
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { KnobModule  } from 'angular4-knob';
import { CarouselModule } from 'primeng/carousel';
import {PanelModule} from 'primeng/panel';
import {ChipsModule} from 'primeng/chips';
import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from '../core/components/layout/layout.component';
import { DashboardComponent } from "../home/components/dashboard/dashboard.component";
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';

@NgModule({
  declarations: [
    LayoutComponent,DashboardComponent, ForbiddenComponent, TopNavComponent
    ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DynamicDialogModule,
    TreeModule,
    ScrollPanelModule,
    ButtonModule,
    CarouselModule,
    KnobModule,
    PanelModule,
    ChipsModule
  ],
  exports:[
    LayoutComponent,
    DashboardComponent
  ]
})
export class CoreModule { }
