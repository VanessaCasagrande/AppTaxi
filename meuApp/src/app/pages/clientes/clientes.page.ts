import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from './service/clientes.service';
import { FormularioClienteComponent } from './formulario-cliente/formulario-cliente.component';
import { Cliente } from '../../models/cliente.type';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule, FormularioClienteComponent]
})
export class ClientesPage implements OnInit, ViewWillEnter {
  clientes: Cliente[] = [];
  cliente: Cliente = {
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    status: 'ativo'
  };
  editando = false;
  mostrarForm = false;

  constructor(private clientesService: ClientesService) {
    this.carregarClientes();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientesService.getList().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Erro ao carregar clientes', error);
      }
    );
  }

  mostrarFormulario() {
    this.mostrarForm = true;
    this.editando = false;
    this.cliente = {
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      status: 'ativo'
    };
  }

  editar(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.editando = true;
    this.mostrarForm = true;
  }

  salvar(cliente: Cliente) {
    this.clientesService.save(cliente).subscribe(
      (data) => {
        if (this.editando) {
          const index = this.clientes.findIndex(c => c.id === data.id);
          if (index !== -1) {
            this.clientes[index] = data;
          }
        } else {
          this.clientes.push(data);
        }
        this.mostrarForm = false;
      },
      (error) => {
        console.error('Erro ao salvar cliente', error);
      }
    );
  }

  excluir(id: number) {
    this.clientesService.remove({ id } as Cliente).subscribe(
      () => {
        this.clientes = this.clientes.filter(c => c.id !== id);
      },
      (error) => {
        console.error('Erro ao excluir cliente', error);
      }
    );
  }

  cancelar() {
    this.mostrarForm = false;
  }
}