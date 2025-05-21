import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Motorista } from '../../../models/motorista.type';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotoristasService {
  private apiUrl = `${environment.apiUrl}/motoristas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(this.apiUrl);
  }

  getById(id: string): Observable<Motorista> {
    if (!id) {
      throw new Error('ID inválido para busca de motorista');
    }
    return this.http.get<Motorista>(`${this.apiUrl}/${id}`);
  }

  create(motorista: Motorista): Observable<Motorista> {
    return this.http.post<Motorista>(this.apiUrl, motorista);
  }

  update(id: number, motorista: Motorista): Observable<Motorista> {
    return this.http.put<Motorista>(`${this.apiUrl}/${id}`, motorista);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}