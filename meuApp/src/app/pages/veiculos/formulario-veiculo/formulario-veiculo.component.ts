import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Veiculo } from '../../../models/veiculo.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-veiculo',
  templateUrl: './formulario-veiculo.component.html',
  styleUrls: ['./formulario-veiculo.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormularioVeiculoComponent implements OnInit {
  @Input() veiculo!: Veiculo;
  @Input() editando = false;
  @Output() salvar = new EventEmitter<Veiculo>();
  @Output() cancelar = new EventEmitter<void>();

  veiculoForm!: FormGroup;
  anoAtual = new Date().getFullYear();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.veiculoForm = this.fb.group({
      placa: [this.veiculo.placa, [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/)
      ]],
      modelo: [this.veiculo.modelo, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      marca: [this.veiculo.marca, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      ano: [this.veiculo.ano, [
        Validators.required,
        Validators.min(1900),
        Validators.max(this.anoAtual)
      ]],
      cor: [this.veiculo.cor, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      status: [this.veiculo.status, Validators.required]
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.veiculoForm.get(controlName);
    return control ? control.hasError(errorName) && (control.dirty || control.touched) : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.veiculoForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    if (control.hasError('pattern')) {
      if (controlName === 'placa') {
        return 'Placa inválida. Use o formato: ABC1D23';
      }
    }

    if (control.hasError('minlength') || control.hasError('maxlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      const maxLength = control.errors?.['maxlength']?.requiredLength;
      return `O campo deve ter entre ${minLength} e ${maxLength} caracteres`;
    }

    if (control.hasError('min') || control.hasError('max')) {
      if (controlName === 'ano') {
        return `O ano deve estar entre 1900 e ${this.anoAtual}`;
      }
    }

    return 'Campo inválido';
  }

  onSubmit() {
    if (this.veiculoForm.valid) {
      const veiculoAtualizado = {
        ...this.veiculo,
        ...this.veiculoForm.value
      };
      this.salvar.emit(veiculoAtualizado);
      this.router.navigate(['/veiculos']);
    } else {
      this.marcarCamposComoTocados();
    }
  }

  private marcarCamposComoTocados() {
    Object.keys(this.veiculoForm.controls).forEach(key => {
      const control = this.veiculoForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    this.cancelar.emit();
    this.router.navigate(['/veiculos']);
  }
} 