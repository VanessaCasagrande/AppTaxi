import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorridasPage } from './corridas.page';

const routes: Routes = [
  {
    path: '',
    component: CorridasPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class CorridasPageModule {}
