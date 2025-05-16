import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotoristasService } from '../../service/motoristas.service';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.page.html',
  styleUrls: ['./motoristas.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MotoristasPage implements OnInit, ViewWillEnter {
  motoristas: any[] = [];
  motorista: any = {
    nome: '',
    cnh: '',
    telefone: '',
    email: '',
    status: 'ativo'
  };
  editando = false;
  mostrarForm = false;

  constructor(private motoristasService: MotoristasService) {
    this.carregarMotoristas();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.carregarMotoristas();
  }

  carregarMotoristas() {
    this.motoristasService.listar().subscribe({
      next: (dados) => {
        this.motoristas = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar motoristas:', erro);
      }
    });
  }

  mostrarFormulario() {
    this.mostrarForm = true;
    this.editando = false;
    this.limparFormulario();
  }

  editar(motorista: any) {
    // Garante que o ID seja string
    this.motorista = { 
      ...motorista,
      id: motorista.id.toString()
    };
    this.editando = true;
    this.mostrarForm = true;
  }

  salvar() {
    if (this.editando) {
      // Garante que o ID seja string
      const motoristaAtualizado = {
        ...this.motorista,
        id: this.motorista.id.toString()
      };
      
      this.motoristasService.atualizar(motoristaAtualizado.id, motoristaAtualizado).subscribe({
        next: () => {
          this.carregarMotoristas();
          this.cancelar();
        },
        error: (erro) => {
          console.error('Erro ao atualizar motorista:', erro);
        }
      });
    } else {
      this.motoristasService.criar(this.motorista).subscribe({
        next: () => {
          this.carregarMotoristas();
          this.cancelar();
        },
        error: (erro) => {
          console.error('Erro ao criar motorista:', erro);
        }
      });
    }
  }

  excluir(id: string) {
    if (confirm('Tem certeza que deseja excluir este motorista?')) {
      this.motoristasService.excluir(id.toString()).subscribe({
        next: () => {
          this.carregarMotoristas();
        },
        error: (erro) => {
          console.error('Erro ao excluir motorista:', erro);
        }
      });
    }
  }

  cancelar() {
    this.mostrarForm = false;
    this.editando = false;
    this.limparFormulario();
  }

  limparFormulario() {
    this.motorista = {
      nome: '',
      cnh: '',
      telefone: '',
      email: '',
      status: 'ativo'
    };
  }
}