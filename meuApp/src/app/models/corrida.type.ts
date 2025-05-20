export interface ParametrosCalculoCorrida {
  valorBase: number;
  custoPorKm: number;
  custoPorMinuto: number;
  valorMinimo: number;
}

export const PARAMETROS_CALCULO_CORRIDA: ParametrosCalculoCorrida = {
  valorBase: 2.50,
  custoPorKm: 1.20,
  custoPorMinuto: 0.20,
  valorMinimo: 6.00
};

export type Corrida = {
  id?: number;
  clienteId: number;
  motoristaId: number;
  veiculoId: number;
  origem: string;
  destino: string;
  distanciaKm: number;
  duracaoMinutos: number;
  valor: number;
  status: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';
  dataHora: Date;
}; 