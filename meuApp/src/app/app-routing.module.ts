import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'motoristas',
    loadChildren: () => import('./pages/motoristas/motoristas.module').then(m => m.MotoristasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'veiculos',
    loadChildren: () => import('./pages/veiculos/veiculos.module').then(m => m.VeiculosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'corridas',
    loadChildren: () => import('./pages/corridas/corridas.module').then(m => m.CorridasPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }