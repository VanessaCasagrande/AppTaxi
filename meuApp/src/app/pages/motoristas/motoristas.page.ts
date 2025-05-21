import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MotoristasService } from './service/motoristas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  cpfMask, 
  telefoneMask, 
  maskitoElement,
  parseCpfMask,
  parseTelefoneMask,
  formatCpfMask,
  formatTelefoneMask
} from '../../shared/masks';
import { Motorista } from '../../models/motorista.type';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.page.html',
  styleUrls: ['./motoristas.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule /*, FormularioMotoristaComponent */]
  
})
export class MotoristasPage implements OnInit, ViewWillEnter {
  motoristas: Motorista[] = [];
  motorista: Motorista = {
    nome: '',
    cpf: '',
    cnh: '',
    telefone: '',
    email: '',
    status: 'ativo'
  };
  editando = false;
  mostrarForm = false;

  // Configurações das máscaras
  readonly cpfMask = cpfMask;
  readonly telefoneMask = telefoneMask;
  readonly maskitoElement = maskitoElement;
  constructor(
    private motoristasService: MotoristasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.carregarMotoristas();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.motoristasService.getById(id).subscribe({
        next: (data) => {
          this.motorista = data;
          this.editando = true;
          this.mostrarForm = true;
        },
        error: (error) => {
          console.error('Erro ao carregar motorista', error);
        }
      });
    }
  }

  ionViewWillEnter() {
    this.carregarMotoristas();
  }

  abrirNovoMotorista() {
    this.router.navigate(['motoristas/novo']);
  }

  carregarMotoristas() {
    this.motoristasService.getAll().subscribe({
      next: (data) => {
        this.motoristas = data;
      },
      error: (error) => {
        console.error('Erro ao carregar motoristas', error);
      }
    });
  }

  formatarCPF(cpf: string): string {
    if (!cpf) return '';
    // Remove todos os caracteres não numéricos
    const cpfLimpo = cpf.replace(/\D/g, '');
    // Limita a 11 dígitos
    const cpfLimitado = cpfLimpo.slice(0, 11);
    
    // Se tiver menos de 11 dígitos, retorna como está
    if (cpfLimitado.length < 11) {
      return cpfLimitado;
    }
    
    // Se tiver 11 dígitos, formata
    return cpfLimitado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    if (!telefone) return '';
    // Remove todos os caracteres não numéricos
    const telefoneLimpo = telefone.replace(/\D/g, '');
    // Limita a 11 dígitos
    const telefoneLimitado = telefoneLimpo.slice(0, 11);
    
    // Se tiver menos de 11 dígitos, retorna como está
    if (telefoneLimitado.length < 11) {
      return telefoneLimitado;
    }
    
    // Se tiver 11 dígitos, formata
    return telefoneLimitado.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  onCpfChange(event: any) {
    const cpf = event.target.value;
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    // Se tiver mais de 11 dígitos, limita e reformata
    if (cpfLimpo.length > 11) {
      const cpfLimitado = cpfLimpo.slice(0, 11);
      this.motorista.cpf = this.formatarCPF(cpfLimitado);
      // Força a atualização do input
      event.target.value = this.motorista.cpf;
    } else {
      // Se tiver 11 dígitos ou menos, apenas formata
      this.motorista.cpf = this.formatarCPF(cpfLimpo);
    }
  }

  onTelefoneChange(event: any) {
    const telefone = event.target.value;
    const telefoneLimpo = telefone.replace(/\D/g, '');
    
    // Se tiver mais de 11 dígitos, limita e reformata
    if (telefoneLimpo.length > 11) {
      const telefoneLimitado = telefoneLimpo.slice(0, 11);
      this.motorista.telefone = this.formatarTelefone(telefoneLimitado);
      // Força a atualização do input
      event.target.value = this.motorista.telefone;
    } else {
      // Se tiver 11 dígitos ou menos, apenas formata
      this.motorista.telefone = this.formatarTelefone(telefoneLimpo);
    }
  }

  mostrarFormulario() {
    this.mostrarForm = true;
    this.editando = false;
    this.motorista = {
      nome: '',
      cpf: '',
      cnh: '',
      telefone: '',
      email: '',
      status: 'ativo'
    };
  }

  editar(motorista: Motorista) {
    this.router.navigate(['motoristas/editar', motorista.id]);
  }

  salvar(motorista: Motorista) {
    if (this.editando && motorista.id) {
      this.motoristasService.update(Number(motorista.id), motorista).subscribe({
        next: (data) => {
          const index = this.motoristas.findIndex(m => m.id === data.id);
          if (index !== -1) {
            this.motoristas[index] = data;
          }
          this.mostrarForm = false;
        },
        error: (error) => {
          console.error('Erro ao atualizar motorista', error);
        }
      });
    } else {
      this.motoristasService.create(motorista).subscribe({
        next: (data) => {
          this.motoristas.push(data);
          this.mostrarForm = false;
        },
        error: (error) => {
          console.error('Erro ao criar motorista', error);
        }
      });
    }
  }

  excluir(id: any) {
    const idStr = String(id);
    this.motoristasService.delete(idStr).subscribe({
      next: () => {
        this.motoristas = this.motoristas.filter(m => String(m.id) !== idStr);
      },
      error: (error) => {
        console.error('Erro ao excluir motorista', error);
      }
    });
  }

  cancelar() {
    this.mostrarForm = false;
  }
}