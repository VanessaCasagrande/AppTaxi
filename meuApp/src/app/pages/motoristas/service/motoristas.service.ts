import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Motorista } from '../../../models/motorista.type';

@Injectable({
  providedIn: 'root'
})
export class MotoristasService {

  private readonly API_URL = 'http://localhost:3000/motoristas';

  constructor(private http: HttpClient) { }

  getById(motoristaId: string) {
    return this.http.get<Motorista>(`${this.API_URL}/${motoristaId}`);
  }

  getList() {
    return this.http.get<Motorista[]>(this.API_URL);
  }

  private add(motorista: Motorista) {
    return this.http.post<Motorista>(this.API_URL, motorista);
  }

  private update(motorista: Motorista) {
    return this.http.put<Motorista>(`${this.API_URL}/${motorista.id}`, motorista);
  }

  save(motorista: Motorista) {
    return motorista.id ? this.update(motorista) : this.add(motorista);
  }

  remove(motorista: Motorista) {
    return this.http.delete<Motorista>(`${this.API_URL}/${motorista.id}`);
  }
} 