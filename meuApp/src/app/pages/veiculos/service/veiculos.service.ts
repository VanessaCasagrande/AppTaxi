import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../../../models/veiculo.type';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  private apiUrl = `${environment.apiUrl}/veiculos`;

  constructor(private http: HttpClient) {}

  getList(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }
   getById(id: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.apiUrl}/${id}`);
  }
  save(veiculo: Veiculo): Observable<Veiculo> {
    if (veiculo.id) {
      return this.http.put<Veiculo>(`${this.apiUrl}/${veiculo.id}`, veiculo);
    }
    return this.http.post<Veiculo>(this.apiUrl, veiculo);
  }

  remove(veiculo: Veiculo): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${veiculo.id}`);
  }
} 