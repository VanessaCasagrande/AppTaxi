import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VeiculosService } from './service/veiculos.service';
import { FormularioVeiculoComponent } from './formulario-veiculo/formulario-veiculo.component';
import { Veiculo } from '../../models/veiculo.type';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.page.html',
  styleUrls: ['./veiculos.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule, FormularioVeiculoComponent]
})
export class VeiculosPage implements OnInit, ViewWillEnter {
  veiculos: Veiculo[] = [];
  veiculo: Veiculo = {
    placa: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
    cor: '',
    status: 'ativo'
  };
  editando = false;
  mostrarForm = false;

  constructor(private veiculosService: VeiculosService) {
    this.carregarVeiculos();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculosService.getList().subscribe(
      (data) => {
        this.veiculos = data;
      },
      (error) => {
        console.error('Erro ao carregar veículos', error);
      }
    );
  }

  mostrarFormulario() {
    this.mostrarForm = true;
    this.editando = false;
    this.veiculo = {
      placa: '',
      modelo: '',
      marca: '',
      ano: new Date().getFullYear(),
      cor: '',
      status: 'ativo'
    };
  }

  editar(veiculo: Veiculo) {
    this.veiculo = { ...veiculo };
    this.editando = true;
    this.mostrarForm = true;
  }

  salvar(veiculo: Veiculo) {
    this.veiculosService.save(veiculo).subscribe(
      (data) => {
        if (this.editando) {
          const index = this.veiculos.findIndex(v => v.id === data.id);
          if (index !== -1) {
            this.veiculos[index] = data;
          }
        } else {
          this.veiculos.push(data);
        }
        this.mostrarForm = false;
      },
      (error) => {
        console.error('Erro ao salvar veículo', error);
      }
    );
  }

  excluir(id: number) {
    this.veiculosService.remove({ id } as Veiculo).subscribe(
      () => {
        this.veiculos = this.veiculos.filter(v => v.id !== id);
      },
      (error) => {
        console.error('Erro ao excluir veículo', error);
      }
    );
  }

  cancelar() {
    this.mostrarForm = false;
  }
}
