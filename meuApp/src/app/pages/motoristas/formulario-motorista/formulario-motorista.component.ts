import { Component, EventEmitter, Input, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoristasService } from '../service/motoristas.service'; // ajuste o caminho se necessário
import { 
  cpfMask, 
  telefoneMask, 
  maskitoElement
} from '../../../shared/masks';

@Component({
  selector: 'app-formulario-motorista',
  templateUrl: './formulario-motorista.component.html',
  styleUrls: ['./formulario-motorista.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FormularioMotoristaComponent {
  @Input() motorista: any = {
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    status: 'ativo'
  };
  @Input() editando = false;
  @Output() salvar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  // Configurações das máscaras
  cpfMask = cpfMask;
  telefoneMask = telefoneMask;
  maskitoElement = maskitoElement;

  constructor(
    private route: ActivatedRoute,
    private motoristasService: MotoristasService,
    private router: Router // adicione aqui
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.motoristasService.getById(id).subscribe(motorista => {
        this.motorista = motorista;
      });
    }
  }

  modificarCpf(event: any) {
    const cpf = event.target.value;
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    if (cpfLimpo.length > 11) {
      const cpfLimitado = cpfLimpo.slice(0, 11);
      this.motorista.cpf = this.formatarCPF(cpfLimitado);
      event.target.value = this.motorista.cpf;
    } else {
      this.motorista.cpf = this.formatarCPF(cpfLimpo);
    }
  }

  modificarTelefone(event: any) {
    const telefone = event.target.value;
    const telefoneLimpo = telefone.replace(/\D/g, '');
    
    if (telefoneLimpo.length > 11) {
      const telefoneLimitado = telefoneLimpo.slice(0, 11);
      this.motorista.telefone = this.formatarTelefone(telefoneLimitado);
      event.target.value = this.motorista.telefone;
    } else {
      this.motorista.telefone = this.formatarTelefone(telefoneLimpo);
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
    if (this.editando && this.motorista.id) {
      this.motoristasService.update(this.motorista.id, this.motorista).subscribe({
        next: () => this.router.navigate(['/motoristas']),
        error: (error) => console.error('Erro ao atualizar motorista', error)
      });
    } else {
      this.motoristasService.create(this.motorista).subscribe({
        next: () => this.router.navigate(['/motoristas']),
        error: (error) => console.error('Erro ao criar motorista', error)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/motoristas']);
  }
}