import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Corrida } from '../../../models/corrida.type';

@Injectable({
  providedIn: 'root'
})
export class CorridasService {
  private readonly API_URL = 'http://localhost:3000/corridas';

  constructor(private http: HttpClient) { }

  getById(corridaId: string) {
    return this.http.get<Corrida>(`${this.API_URL}/${corridaId}`);
  }

  getList() {
    return this.http.get<Corrida[]>(this.API_URL);
  }

  private add(corrida: Corrida) {
    return this.http.post<Corrida>(this.API_URL, corrida);
  }

  private update(corrida: Corrida) {
    return this.http.put<Corrida>(`${this.API_URL}/${corrida.id}`, corrida);
  }

  save(corrida: Corrida) {
    return corrida.id ? this.update(corrida) : this.add(corrida);
  }

  remove(corrida: Corrida) {
    return this.http.delete<Corrida>(`${this.API_URL}/${corrida.id}`);
  }
} 