import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services-login/auth.service';
import { Router } from '@angular/router';
import { NotificacaoService } from '../services/notificacao.service';

let isRefreshing = false;

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificacaoService = inject(NotificacaoService);

  const token = authService.getToken();
  
  if (token) {
    request = addTokenToRequest(request, token);
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(request, next, authService, router, notificacaoService);
      }
      
      handleError(error, notificacaoService);
      return throwError(() => error);
    })
  );
};

function addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router,
  notificacaoService: NotificacaoService
) {
  if (!isRefreshing) {
    isRefreshing = true;

    return authService.refreshToken().pipe(
      switchMap(response => {
        isRefreshing = false;
        return next(addTokenToRequest(request, response.token));
      }),
      catchError(error => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => error);
      })
    );
  }

  return next(request);
}

function handleError(error: HttpErrorResponse, notificacaoService: NotificacaoService) {
  let mensagem = 'Ocorreu um erro. Tente novamente.';

  if (error.error instanceof ErrorEvent) {
    // Erro do cliente
    mensagem = error.error.message;
  } else {
    // Erro do servidor
    switch (error.status) {
      case 400:
        mensagem = 'Requisição inválida.';
        break;
      case 403:
        mensagem = 'Você não tem permissão para realizar esta ação.';
        break;
      case 404:
        mensagem = 'Recurso não encontrado.';
        break;
      case 500:
        mensagem = 'Erro interno do servidor.';
        break;
    }
  }

  notificacaoService.mostrarMensagem(mensagem, 'erro');
} 