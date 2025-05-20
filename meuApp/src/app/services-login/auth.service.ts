import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    // Verifica se já existe um token salvo
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.next(true);
    }
  }

  login(email: string, senha: string): Promise<boolean> {
    // Aqui você deve implementar a chamada real para sua API
    // Por enquanto, vamos simular um login
    return new Promise((resolve) => {
      if (email === 'admin@admin.com' && senha === 'admin') {
        localStorage.setItem('token', 'token-simulado');
        this.isAuthenticated.next(true);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
