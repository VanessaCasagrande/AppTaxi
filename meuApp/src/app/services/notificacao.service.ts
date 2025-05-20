import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private loading?: HTMLIonLoadingElement;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async mostrarMensagem(mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'info') {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom',
      color: this.getCorPorTipo(tipo),
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  async mostrarCarregando(mensagem: string = 'Carregando...') {
    this.loading = await this.loadingController.create({
      message: mensagem,
      spinner: 'circular'
    });
    await this.loading.present();
  }

  async esconderCarregando() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = undefined;
    }
  }

  async confirmarExclusao(nome: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir ${nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive'
        }
      ]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'destructive';
  }

  private getCorPorTipo(tipo: 'sucesso' | 'erro' | 'info'): string {
    switch (tipo) {
      case 'sucesso':
        return 'success';
      case 'erro':
        return 'danger';
      default:
        return 'primary';
    }
  }
} 