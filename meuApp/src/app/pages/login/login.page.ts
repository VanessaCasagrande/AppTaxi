import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async fazerLogin() {
    try {
      const sucesso = await this.authService.login(this.email, this.senha);
      
      if (sucesso) {
        this.router.navigate(['/dashboard']);
      } else {
        this.mostrarMensagem('Email ou senha inválidos');
      }
    } catch (erro) {
      this.mostrarMensagem('Erro ao fazer login');
    }
  }

  private async mostrarMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
}
