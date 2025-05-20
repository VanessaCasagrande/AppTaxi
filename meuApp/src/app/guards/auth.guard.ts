import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services-login/auth.service';
import { map, take } from 'rxjs/operators';

export const AuthGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isLoggedIn().pipe(
    take(1),
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }

      router.navigate(['/login']);
      return false;
    })
  );
}; 