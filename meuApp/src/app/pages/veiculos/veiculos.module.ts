import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculosPage } from './veiculos.page';

const routes: Routes = [
  {
    path: '',
    component: VeiculosPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    VeiculosPage
  ]
})
export class VeiculosPageModule {}
