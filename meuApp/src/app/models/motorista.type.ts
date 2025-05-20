export type Motorista = {
  id?: number;
  nome: string;
  cpf: string;
  cnh: string;
  telefone: string;
  email: string;
  status: 'ativo' | 'inativo' | 'bloqueado';
}; 