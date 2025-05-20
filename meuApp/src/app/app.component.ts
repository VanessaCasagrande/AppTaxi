import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services-login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ionViewWillEnter() {
    if (this.authService.isAuthenticated()) {
      this.menuCtrl.enable(true, 'main-menu');
    } else {
      this.menuCtrl.enable(false, 'main-menu');
    }
  }

  fecharMenu() {
    this.menuCtrl.close();
  }

  fazerLogout() {
    this.authService.logout();
    this.fecharMenu();
  }
}