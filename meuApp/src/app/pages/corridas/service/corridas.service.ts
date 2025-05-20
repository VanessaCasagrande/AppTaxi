import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Corrida } from '../../../models/corrida.type';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorridasService {
  private apiUrl = `${environment.apiUrl}/corridas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Corrida[]> {
    return this.http.get<Corrida[]>(this.apiUrl);
  }

  getById(id: number): Observable<Corrida> {
    return this.http.get<Corrida>(`${this.apiUrl}/${id}`);
  }

  create(corrida: Corrida): Observable<Corrida> {
    return this.http.post<Corrida>(this.apiUrl, corrida);
  }

  update(id: number, corrida: Corrida): Observable<Corrida> {
    return this.http.put<Corrida>(`${this.apiUrl}/${id}`, corrida);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 