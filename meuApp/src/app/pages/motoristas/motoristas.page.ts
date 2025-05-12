import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
export class MotoristasPage implements OnInit {
  motoristas: any[] = [];
  motorista: any = {
    nome: '',
    cnh: '',
    telefone: '',
    email: '',
    status: 'ativo'
  };
  editando = false;

  constructor(private motoristasService: MotoristasService) {}

  ngOnInit() {
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

  salvar() {
    if (this.editando) {
      this.motoristasService.atualizar(this.motorista.id!, this.motorista).subscribe({
        next: () => {
          this.carregarMotoristas();
          this.limparFormulario();
        },
        error: (erro) => {
          console.error('Erro ao atualizar motorista:', erro);
        }
      });
    } else {
      this.motoristasService.criar(this.motorista).subscribe({
        next: () => {
          this.carregarMotoristas();
          this.limparFormulario();
        },
        error: (erro) => {
          console.error('Erro ao criar motorista:', erro);
        }
      });
    }
  }

  editar(motorista: any) {
    this.motorista = { ...motorista };
    this.editando = true;
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este motorista?')) {
      this.motoristasService.excluir(id).subscribe({
        next: () => {
          this.carregarMotoristas();
        },
        error: (erro) => {
          console.error('Erro ao excluir motorista:', erro);
        }
      });
    }
  }

  limparFormulario() {
    this.motorista = {
      nome: '',
      cnh: '',
      telefone: '',
      email: '',
      status: 'ativo'
    };
    this.editando = false;
  }
}