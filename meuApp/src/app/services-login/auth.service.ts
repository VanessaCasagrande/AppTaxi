import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

export interface LoginResponse {
  token: string;
  expiresIn: number;
  user: {
    id: number;
    email: string;
    nome: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private tokenExpirationTimer: any;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly TOKEN_EXPIRATION_KEY = 'token_expiration';
  private readonly USER_KEY = 'user_data';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(!!token);
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    // Temporariamente usando mock para desenvolvimento
    if (email === 'admin@admin.com' && senha === 'admin') {
      const mockResponse: LoginResponse = {
        token: 'mock-jwt-token',
        expiresIn: 3600,
        user: {
          id: 1,
          email: 'admin@admin.com',
          nome: 'Administrador'
        }
      };
      this.handleAuthentication(mockResponse);
      return of(mockResponse);
    }
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        tap(response => {
          this.handleAuthentication(response);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRATION_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticatedSubject.next(false);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  checkAuth(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
      }

  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  private handleAuthentication(response: LoginResponse) {
    const expirationDate = new Date(new Date().getTime() + response.expiresIn * 1000);
    
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.TOKEN_EXPIRATION_KEY, expirationDate.toISOString());
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    
    this.isAuthenticatedSubject.next(true);
    this.setAutoLogout(response.expiresIn * 1000);
  }

  private setAutoLogout(expirationDuration: number) {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private getTokenExpiration(): string | null {
    return localStorage.getItem(this.TOKEN_EXPIRATION_KEY);
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh`, {
      token: this.getToken()
    }).pipe(
      tap(response => {
        this.handleAuthentication(response);
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
