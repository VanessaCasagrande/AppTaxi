import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../../models/veiculo.type';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  private readonly API_URL = 'http://localhost:3000/veiculos';

  constructor(private http: HttpClient) { }

  getById(veiculoId: string) {
    return this.http.get<Veiculo>(`${this.API_URL}/${veiculoId}`);
  }

  getList() {
    return this.http.get<Veiculo[]>(this.API_URL);
  }

  private add(veiculo: Veiculo) {
    return this.http.post<Veiculo>(this.API_URL, veiculo);
  }

  private update(veiculo: Veiculo) {
    return this.http.put<Veiculo>(`${this.API_URL}/${veiculo.id}`, veiculo);
  }

  save(veiculo: Veiculo) {
    return veiculo.id ? this.update(veiculo) : this.add(veiculo);
  }

  remove(veiculo: Veiculo) {
    return this.http.delete<Veiculo>(`${this.API_URL}/${veiculo.id}`);
  }
} 