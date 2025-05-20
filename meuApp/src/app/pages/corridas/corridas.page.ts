import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorridasService } from './service/corridas.service';
import { Corrida } from '../../models/corrida.type';
import { RouterModule } from '@angular/router';
import { FormularioCorridaComponent } from './formulario-corrida/formulario-corrida.component';

@Component({
  selector: 'app-corridas',
  templateUrl: './corridas.page.html',
  styleUrls: ['./corridas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FormularioCorridaComponent]
})
export class CorridasPage implements OnInit {
  corridas: Corrida[] = [];
  corrida: Corrida = {
    clienteId: 0,
    motoristaId: 0,
    veiculoId: 0,
    origem: '',
    destino: '',
    valor: 0,
    status: 'pendente',
    dataHora: new Date(),
    distanciaKm: 0,
    duracaoMinutos: 0
  };
  editando = false;
  mostrarForm = false;

  constructor(private corridasService: CorridasService) {}

  ngOnInit() {
    this.carregarCorridas();
    this.mostrarFormulario();
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

  mostrarFormulario() {
    this.editando = false;
    this.corrida = {
      clienteId: 0,
      motoristaId: 0,
      veiculoId: 0,
      origem: '',
      destino: '',
      valor: 0,
      status: 'pendente',
      dataHora: new Date(),
      distanciaKm: 0,
      duracaoMinutos: 0
    };
    this.mostrarForm = false;
  }

  editar(corrida: Corrida) {
    this.corrida = { ...corrida };
    this.editando = true;
    this.mostrarForm = true;
  }

  salvar(corrida: Corrida) {
    if (this.editando && corrida.id) {
      this.corridasService.update(corrida.id, corrida).subscribe({
        next: (data: Corrida) => {
          const index = this.corridas.findIndex(c => c.id === data.id);
          if (index !== -1) {
            this.corridas[index] = data;
          }
          this.editando = false;
          this.mostrarForm = false;
        },
        error: (error: Error) => {
          console.error('Erro ao atualizar corrida', error);
        }
      });
    } else {
      this.corridasService.create(corrida).subscribe({
        next: (data: Corrida) => {
          this.corridas.push(data);
          this.editando = false;
          this.mostrarForm = false;
        },
        error: (error: Error) => {
          console.error('Erro ao criar corrida', error);
        }
      });
    }
  }

  excluir(id: number) {
    this.corridasService.delete(id).subscribe({
      next: () => {
        this.corridas = this.corridas.filter(c => c.id !== id);
      },
      error: (error: Error) => {
        console.error('Erro ao excluir corrida', error);
      }
    });
  }

  cancelar() {
    this.editando = false;
    this.mostrarForm = false;
  }
}
