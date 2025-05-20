import { Injectable } from '@angular/core';
import { PARAMETROS_CALCULO_CORRIDA } from '../../../models/corrida.type';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraCorridaService {
  calcularValorCorrida(distanciaKm: number, duracaoMinutos: number): number {
    const { valorBase, custoPorKm, custoPorMinuto, valorMinimo } = PARAMETROS_CALCULO_CORRIDA;
    
    // Calcula o valor baseado na distância e duração
    const valorCalculado = valorBase + 
      (distanciaKm * custoPorKm) + 
      (duracaoMinutos * custoPorMinuto);
    
    // Retorna o maior valor entre o calculado e o mínimo
    return Math.max(valorCalculado, valorMinimo);
  }
} 