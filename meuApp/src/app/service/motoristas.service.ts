import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoristasService {
  private motoristas: any[] = [];
  private nextId = 1;

  constructor(private http: HttpClient) {
    this.carregarDados();
  }

  private carregarDados() {
    this.http.get<any>('assets/db.json').subscribe({
      next: (data) => {
        this.motoristas = data.motoristas;
        this.nextId = Math.max(...this.motoristas.map((m: any) => m.id || 0)) + 1;
      },
      error: (erro) => {
        console.error('Erro ao carregar dados:', erro);
        this.motoristas = [];
      }
    });
  }

  listar(): Observable<any[]> {
    return of(this.motoristas);
  }

  buscarPorId(id: number): Observable<any> {
    const motorista = this.motoristas.find((m: any) => m.id === id);
    return of(motorista);
  }

  criar(motorista: any): Observable<any> {
    const novoMotorista = {
      ...motorista,
      id: this.nextId++
    };
    this.motoristas.push(novoMotorista);
    return of(novoMotorista);
  }

  atualizar(id: number, motorista: any): Observable<any> {
    const index = this.motoristas.findIndex((m: any) => m.id === id);
    if (index !== -1) {
      this.motoristas[index] = { ...motorista, id };
      return of(this.motoristas[index]);
    }
    return of(motorista);
  }

  excluir(id: number): Observable<void> {
    const index = this.motoristas.findIndex((m: any) => m.id === id);
    if (index !== -1) {
      this.motoristas.splice(index, 1);
    }
    return of(void 0);
  }
}