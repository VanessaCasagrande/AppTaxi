import { MaskitoElementPredicate } from "@maskito/core";  
import {
  maskitoNumberOptionsGenerator,
  maskitoParseNumber,
  maskitoStringifyNumber,
} from "@maskito/kit";

// Máscara para CPF
const cpfMask = maskitoNumberOptionsGenerator({
  decimalSeparator: '',
  min: 0,
  max: 99999999999, // Limita a 11 dígitos
  precision: 0,
  thousandSeparator: '.',
  decimalPseudoSeparators: ['.', '-'],
  prefix: '',
  postfix: ''
});

// Máscara para telefone
const telefoneMask = maskitoNumberOptionsGenerator({
  decimalSeparator: '',
  min: 0,
  max: 99999999999, // Limita a 11 dígitos
  precision: 0,
  thousandSeparator: ' ',
  decimalPseudoSeparators: ['(', ')', ' ', '-'],
  prefix: '(',
  postfix: ''
});

const maskitoElement: MaskitoElementPredicate = async (el: HTMLElement) =>
  (el as HTMLIonInputElement).getInputElement();

const parseCpfMask = (cpf: string) => {
  return maskitoParseNumber(cpf, '');
}

const parseTelefoneMask = (telefone: string) => {
  return maskitoParseNumber(telefone, '');
}

const formatCpfMask = (cpf: number) => {
  return maskitoStringifyNumber(cpf, { 
    decimalSeparator: '', 
    precision: 0,
    thousandSeparator: '.',
    decimalPseudoSeparators: ['.', '-'],
    prefix: '',
    postfix: ''
  });
}

const formatTelefoneMask = (telefone: number) => {
  return maskitoStringifyNumber(telefone, { 
    decimalSeparator: '', 
    precision: 0,
    thousandSeparator: ' ',
    decimalPseudoSeparators: ['(', ')', ' ', '-'],
    prefix: '(',
    postfix: ''
  });
}

export {
  cpfMask,
  telefoneMask,
  maskitoElement,
  parseCpfMask,
  parseTelefoneMask,
  formatCpfMask,
  formatTelefoneMask,
}; 