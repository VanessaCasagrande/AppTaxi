import { Component, OnInit } from '@angular/core';
import { CorridasService } from './service/corridas.service';
import { ClientesService } from '../clientes/service/clientes.service';
import { MotoristasService } from '../motoristas/service/motoristas.service';
import { Corrida } from '../../models/corrida.type';
import { Cliente } from '../../models/cliente.type';
import { Motorista } from '../../models/motorista.type';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corridas',
  templateUrl: './corridas.page.html',
  styleUrls: ['./corridas.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class CorridasPage implements OnInit {
  corridas: Corrida[] = [];
  clientes: Cliente[] = [];
  motoristas: Motorista[] = [];

  constructor(
    private corridasService: CorridasService,
    private clientesService: ClientesService,
    private motoristasService: MotoristasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarCorridas();
    this.clientesService.getList().subscribe(clientes => this.clientes = clientes);
    this.motoristasService.getAll().subscribe(motoristas => this.motoristas = motoristas);
  }

  carregarCorridas() {
    this.corridasService.getAll().subscribe({
      next: (data: Corrida[]) => {
        this.corridas = data;
      },
      error: (error: Error) => {
        console.error('Erro ao carregar corridas', error);
      }
    });
  }

  abrirNovaCorrida() {
    this.router.navigate(['corridas/novo']);
  }

  editar(corrida: Corrida) {
    this.router.navigate(['corridas/editar', corrida.id]);
  }

  excluir(id: number) {
    this.corridasService.delete(id).subscribe({
      next: () => {
        this.carregarCorridas();
      },
      error: (error: Error) => {
        console.error('Erro ao excluir corrida', error);
      }
    });
  }

  getClienteNome(clienteId: number): string {
    return this.clientes.find(c => c.id === clienteId)?.nome || 'Cliente não encontrado';
  }

  getMotoristaNome(motoristaId: number): string {
    return this.motoristas.find(m => m.id === motoristaId)?.nome || 'Motorista não encontrado';
  }
}
