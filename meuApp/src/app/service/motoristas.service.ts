import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MotoristasService {
  private motoristas: any[] = [];
  private nextId = 1;
  private motoristasSubject = new BehaviorSubject<any[]>([]);
  private apiUrl = 'http://localhost:3000'; // URL do json-server

  constructor(private http: HttpClient) {
    this.carregarDados();
  }

  private carregarDados() {
    this.http.get<any[]>(`${this.apiUrl}/motoristas`).subscribe({
      next: (data) => {
        this.motoristas = data || [];
        // Calcula o próximo ID baseado no maior ID existente, convertendo para número
        const ids = this.motoristas.map(m => Number(m.id));
        this.nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
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

  buscarPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/motoristas/${id}`);
  }

  criar(motorista: any): Observable<any> {
    // Converte o ID para string
    const novoMotorista = {
      ...motorista,
      id: this.nextId.toString()
    };
    
    return this.http.post<any>(`${this.apiUrl}/motoristas`, novoMotorista).pipe(
      tap(motoristaCriado => {
        this.nextId++;
        this.motoristas = [...this.motoristas, motoristaCriado];
        this.motoristasSubject.next(this.motoristas);
      })
    );
  }

  atualizar(id: string, motorista: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/motoristas/${id}`, motorista).pipe(
      tap(motoristaAtualizado => {
        this.motoristas = this.motoristas.map(m => 
          m.id === id ? motoristaAtualizado : m
        );
        this.motoristasSubject.next(this.motoristas);
      })
    );
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/motoristas/${id}`).pipe(
      tap(() => {
        this.motoristas = this.motoristas.filter(m => m.id !== id);
        this.motoristasSubject.next(this.motoristas);
      })
    );
  }
}