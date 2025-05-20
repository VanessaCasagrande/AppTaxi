export type Veiculo = {
  id?: number;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  cor: string;
  status: 'ativo' | 'inativo' | 'manutencao';
}; 