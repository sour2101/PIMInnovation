import { NgModule } from '@angular/core';
import { LayoutModule } from 'angular-admin-lte';   
import { BoxModule } from 'angular-admin-lte';
import { adminLteConf } from './adminlte.conf';

@NgModule({
    declarations: [],
    imports: [
        BoxModule,
        LayoutModule
    ],
    exports:[
        BoxModule,
        LayoutModule
    ]
  })

export class AdminLteModule {}