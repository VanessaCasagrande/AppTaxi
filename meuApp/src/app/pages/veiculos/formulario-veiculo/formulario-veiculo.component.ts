import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Veiculo } from '../../../models/veiculo.type';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.veiculoForm = this.fb.group({
      placa: [this.veiculo.placa, Validators.required],
      modelo: [this.veiculo.modelo, Validators.required],
      marca: [this.veiculo.marca, Validators.required],
      ano: [this.veiculo.ano, Validators.required],
      cor: [this.veiculo.cor, Validators.required],
      status: [this.veiculo.status, Validators.required]
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.veiculoForm.get(controlName)?.hasError(errorName) ?? false;
  }

  onSubmit() {
    if (this.veiculoForm.valid) {
      this.salvar.emit({ ...this.veiculo, ...this.veiculoForm.value });
    }
  }

  onCancel() {
    this.cancelar.emit();
  }
} 