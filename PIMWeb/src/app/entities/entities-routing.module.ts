import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../core/guards/auth.guard";

import { LayoutComponent } from '../core/components/layout/layout.component';
import { CreateEntityComponent } from './components/create-entity/create-entity.component';
import { SearchEntityComponent } from './components/search-entity/search-entity.component';
import { EntityDetailsComponent } from './components/entity-details/entity-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'createEntity',
        component: CreateEntityComponent
      },
      {
        path: 'searchEntity',
        component: SearchEntityComponent
      },
      {
        path: 'entityDetails',
        component: EntityDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
