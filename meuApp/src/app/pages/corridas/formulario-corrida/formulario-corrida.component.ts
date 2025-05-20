import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Corrida } from '../../../models/corrida.type';
import { CalculadoraCorridaService } from '../service/calculadora-corrida.service';

@Component({
  selector: 'app-formulario-corrida',
  templateUrl: './formulario-corrida.component.html',
  styleUrls: ['./formulario-corrida.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormularioCorridaComponent {
  @Input() corrida!: Corrida;
  @Input() editando = false;
  @Output() salvar = new EventEmitter<Corrida>();
  @Output() cancelar = new EventEmitter<void>();

  constructor(private calculadoraCorrida: CalculadoraCorridaService) {}

  calcularValor() {
    if (this.corrida.distanciaKm && this.corrida.duracaoMinutos) {
      this.corrida.valor = this.calculadoraCorrida.calcularValorCorrida(
        this.corrida.distanciaKm,
        this.corrida.duracaoMinutos
      );
    }
  }

  onSubmit() {
    this.salvar.emit(this.corrida);
  }

  onCancel() {
    this.cancelar.emit();
  }
} 