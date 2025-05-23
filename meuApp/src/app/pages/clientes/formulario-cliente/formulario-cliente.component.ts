import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Cliente } from '../../../models/cliente.type';
import { cpfMask, telefoneMask, maskitoElement } from '../../../shared/masks';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../service/clientes.service';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormularioClienteComponent implements OnInit {
  cliente: Cliente = {
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    status: 'ativo'
  };
  editando = false;

  readonly cpfMask = cpfMask;
  readonly telefoneMask = telefoneMask;
  readonly maskitoElement = maskitoElement;

  constructor(
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.clientesService.getById(+id).subscribe(cliente => {
        this.cliente = cliente;
      });
    }
  }

  modificarCpf(event: any) {
    const cpf = event.target.value;
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length > 11) {
      const cpfLimitado = cpfLimpo.slice(0, 11);
      this.cliente.cpf = this.formatarCPF(cpfLimitado);
      event.target.value = this.cliente.cpf;
    } else {
      this.cliente.cpf = this.formatarCPF(cpfLimpo);
    }
  }

  modificarTelefone(event: any) {
    const telefone = event.target.value;
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo.length > 11) {
      const telefoneLimitado = telefoneLimpo.slice(0, 11);
      this.cliente.telefone = this.formatarTelefone(telefoneLimitado);
      event.target.value = this.cliente.telefone;
    } else {
      this.cliente.telefone = this.formatarTelefone(telefoneLimpo);
    }
  }

  formatarCPF(cpf: string): string {
    if (!cpf) return '';
    const cpfLimpo = cpf.replace(/\D/g, '');
    const cpfLimitado = cpfLimpo.slice(0, 11);
    if (cpfLimitado.length < 11) {
      return cpfLimitado;
    }
    return cpfLimitado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    if (!telefone) return '';
    const telefoneLimpo = telefone.replace(/\D/g, '');
    const telefoneLimitado = telefoneLimpo.slice(0, 11);
    if (telefoneLimitado.length < 11) {
      return telefoneLimitado;
    }
    return telefoneLimitado.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  onSubmit() {
    this.clientesService.save(this.cliente).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: (error: any) => console.error('Erro ao salvar cliente', error)
    });
  }

  onCancel() {
    this.router.navigate(['/clientes']);
  }
}