import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services-login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email: string = '';
  senha: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main-menu');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'main-menu');
  }

  login() {
    this.error = '';
    this.authService.login(this.email, this.senha).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = 'Credenciais inválidas';
        console.error('Erro no login:', error);
      }
    });
  }
}
