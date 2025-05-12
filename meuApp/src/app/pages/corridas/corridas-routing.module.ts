import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorridasPage } from './corridas.page';

const routes: Routes = [
  {
    path: '',
    component: CorridasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorridasPageRoutingModule {}
