import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';  // Caminho atualizado
import { MotoristasPage } from './pages/motoristas/motoristas.page';
import { CorridasPage } from './pages/corridas/corridas.page';
import { ClientesPage } from './pages/clientes/clientes.page';
import { VeiculosPage } from './pages/veiculos/veiculos.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'dashboard',
    component: DashboardPage
  },
  {
    path: 'motoristas',
    component: MotoristasPage
  },
  {
    path: 'corridas',
    component: CorridasPage
  },
  {
    path: 'clientes',
    component: ClientesPage
  },
  {
    path: 'veiculos',
    component: VeiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }