export type Cliente = {
  id?: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  status: 'ativo' | 'inativo';
}; 