import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotoristasPage } from './motoristas.page';
import { FormularioMotoristaComponent } from './formulario-motorista/formulario-motorista.component';

const routes: Routes = [
  { path: '', component: MotoristasPage },
  { path: 'novo', component: FormularioMotoristaComponent },
  { path: 'editar/:id', component: FormularioMotoristaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotoristasPageRoutingModule {}
