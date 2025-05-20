import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CorridasService } from './service/corridas.service';
import { FormularioCorridaComponent } from './formulario-corrida/formulario-corrida.component';
import { Corrida } from '../../models/corrida.type';

@Component({
  selector: 'app-corridas',
  templateUrl: './corridas.page.html',
  styleUrls: ['./corridas.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule, FormularioCorridaComponent]
})
export class CorridasPage implements OnInit, ViewWillEnter {
  corridas: Corrida[] = [];
  corrida: Corrida = {
    clienteId: 0,
    motoristaId: 0,
    veiculoId: 0,
    origem: '',
    destino: '',
    valor: 0,
    status: 'pendente',
    dataHora: new Date()
  };
  editando = false;
  mostrarForm = false;

  constructor(private corridasService: CorridasService) {
    this.carregarCorridas();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.carregarCorridas();
  }

  carregarCorridas() {
    this.corridasService.getList().subscribe(
      (data) => {
        this.corridas = data;
      },
      (error) => {
        console.error('Erro ao carregar corridas', error);
      }
    );
  }

  mostrarFormulario() {
    this.mostrarForm = true;
    this.editando = false;
    this.corrida = {
      clienteId: 0,
      motoristaId: 0,
      veiculoId: 0,
      origem: '',
      destino: '',
      valor: 0,
      status: 'pendente',
      dataHora: new Date()
    };
  }

  editar(corrida: Corrida) {
    this.corrida = { ...corrida };
    this.editando = true;
    this.mostrarForm = true;
  }

  salvar(corrida: Corrida) {
    this.corridasService.save(corrida).subscribe(
      (data) => {
        if (this.editando) {
          const index = this.corridas.findIndex(c => c.id === data.id);
          if (index !== -1) {
            this.corridas[index] = data;
          }
        } else {
          this.corridas.push(data);
        }
        this.mostrarForm = false;
      },
      (error) => {
        console.error('Erro ao salvar corrida', error);
      }
    );
  }

  excluir(id: number) {
    this.corridasService.remove({ id } as Corrida).subscribe(
      () => {
        this.corridas = this.corridas.filter(c => c.id !== id);
      },
      (error) => {
        console.error('Erro ao excluir corrida', error);
      }
    );
  }

  cancelar() {
    this.mostrarForm = false;
  }
}
