import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotoristasPage } from './motoristas.page';

const routes: Routes = [
  {
    path: '',
    component: MotoristasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotoristasPageRoutingModule {}
