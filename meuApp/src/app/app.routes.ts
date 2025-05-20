import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'motoristas',
    loadComponent: () => import('./pages/motoristas/motoristas.page').then(m => m.MotoristasPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes/clientes.page').then(m => m.ClientesPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'veiculos',
    loadComponent: () => import('./pages/veiculos/veiculos.page').then(m => m.VeiculosPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'corridas',
    loadComponent: () => import('./pages/corridas/corridas.page').then(m => m.CorridasPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'corridas/novo',
    loadComponent: () => import('./pages/corridas/formulario-corrida/formulario-corrida.component').then(m => m.FormularioCorridaComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'corridas/editar/:id',
    loadComponent: () => import('./pages/corridas/formulario-corrida/formulario-corrida.component').then(m => m.FormularioCorridaComponent),
    canActivate: [AuthGuard]
  },
  // Motoristas
  {
    path: 'motoristas/novo',
    loadComponent: () => import('./pages/motoristas/formulario-motorista/formulario-motorista.component').then(m => m.FormularioMotoristaComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'motoristas/editar/:id',
    loadComponent: () => import('./pages/motoristas/formulario-motorista/formulario-motorista.component').then(m => m.FormularioMotoristaComponent),
    canActivate: [AuthGuard]
  },
  // Clientes
  {
    path: 'clientes/novo',
    loadComponent: () => import('./pages/clientes/formulario-cliente/formulario-cliente.component').then(m => m.FormularioClienteComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes/editar/:id',
    loadComponent: () => import('./pages/clientes/formulario-cliente/formulario-cliente.component').then(m => m.FormularioClienteComponent),
    canActivate: [AuthGuard]
  },
  // Veículos
  {
    path: 'veiculos/novo',
    loadComponent: () => import('./pages/veiculos/formulario-veiculo/formulario-veiculo.component').then(m => m.FormularioVeiculoComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'veiculos/editar/:id',
    loadComponent: () => import('./pages/veiculos/formulario-veiculo/formulario-veiculo.component').then(m => m.FormularioVeiculoComponent),
    canActivate: [AuthGuard]
  },
  // Corridas
  {
    path: 'corridas/novo',
    loadComponent: () => import('./pages/corridas/formulario-corrida/formulario-corrida.component').then(m => m.FormularioCorridaComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'corridas/editar/:id',
    loadComponent: () => import('./pages/corridas/formulario-corrida/formulario-corrida.component').then(m => m.FormularioCorridaComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];