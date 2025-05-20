import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services-login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  fecharMenu() {
    this.menuCtrl.close();
  }

  fazerLogout() {
    this.authService.logout();
    this.fecharMenu();
  }
}