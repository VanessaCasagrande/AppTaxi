export type Motorista = {
  id?: string;
  nome: string;
  cpf: string;
  cnh: string;
  telefone: string;
  email: string;
  status: 'ativo' | 'inativo' | 'bloqueado';
}; 