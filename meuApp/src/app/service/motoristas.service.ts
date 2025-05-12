import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoristasService {
  private motoristas: any[] = [];
  private nextId = 1;
  private motoristasSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.carregarDados();
  }

  private carregarDados() {
    this.http.get<any>('assets/db.json').subscribe({
      next: (data) => {
        this.motoristas = data.motoristas;
        this.nextId = Math.max(...this.motoristas.map((m: any) => m.id || 0)) + 1;
        this.motoristasSubject.next(this.motoristas);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados:', erro);
        this.motoristas = [];
        this.motoristasSubject.next(this.motoristas);
      }
    });
  }

  listar(): Observable<any[]> {
    return this.motoristasSubject.asObservable();
  }

  buscarPorId(id: number): Observable<any> {
    const motorista = this.motoristas.find((m: any) => m.id === id);
    return new BehaviorSubject(motorista).asObservable();
  }

  criar(motorista: any): Observable<any> {
    const novoMotorista = {
      ...motorista,
      id: this.nextId++
    };
    this.motoristas.push(novoMotorista);
    this.motoristasSubject.next(this.motoristas);
    return new BehaviorSubject(novoMotorista).asObservable();
  }

  atualizar(id: number, motorista: any): Observable<any> {
    const index = this.motoristas.findIndex((m: any) => m.id === id);
    if (index !== -1) {
      this.motoristas[index] = { ...motorista, id };
      this.motoristasSubject.next(this.motoristas);
      return new BehaviorSubject(this.motoristas[index]).asObservable();
    }
    return new BehaviorSubject(motorista).asObservable();
  }

  excluir(id: number): Observable<void> {
    const index = this.motoristas.findIndex((m: any) => m.id === id);
    if (index !== -1) {
      this.motoristas.splice(index, 1);
      this.motoristasSubject.next(this.motoristas);
    }
    return new BehaviorSubject<void>(undefined).asObservable();
  }
}