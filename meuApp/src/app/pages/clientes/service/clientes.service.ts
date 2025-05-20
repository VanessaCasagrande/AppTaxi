import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../../models/cliente.type';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private readonly API_URL = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) { }

  getById(clienteId: string | number) {
    return this.http.get<Cliente>(`${this.API_URL}/${clienteId}`);
  }

  getList() {
    return this.http.get<Cliente[]>(this.API_URL);
  }

  private add(cliente: Cliente) {
    return this.http.post<Cliente>(this.API_URL, cliente);
  }

  private update(cliente: Cliente) {
    return this.http.put<Cliente>(`${this.API_URL}/${cliente.id}`, cliente);
  }

  save(cliente: Cliente) {
    return cliente.id ? this.update(cliente) : this.add(cliente);
  }

  remove(cliente: Cliente) {
    return this.http.delete<Cliente>(`${this.API_URL}/${cliente.id}`);
  }
}